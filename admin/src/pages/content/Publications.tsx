import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Sparkles, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { api, type ResearchPublication } from "../../lib/api";

function StatusPill({ status }: { status: string }) {
  const isPublished = status === "PUBLISHED";
  const isPending = status === "PENDING_REVIEW";
  
  return (
    <span className={`status-pill ${isPublished ? "status-published" : isPending ? "bg-amber-100 text-amber-700" : "status-draft"}`}>
      {status.charAt(0) + status.slice(1).toLowerCase().replace("_", " ")}
    </span>
  );
}

const EMPTY: Partial<ResearchPublication> = {
  title: "",
  authors: "",
  abstract: "",
  doi: "",
  publication_year: new Date().getFullYear(),
  link: "",
  venue: "",
  status: "DRAFT",
};

export default function Publications() {
  const { token, role, user } = useAuth();
  const isAdmin = role === "super_admin";
  const memberId = user?.id;
  const t = token ?? "";
  const [items, setItems] = useState<ResearchPublication[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<ResearchPublication> | null>(null);
  const [saving, setSaving] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (t) {
      api.publications.list(t).then((data) => { 
        // RBAC Filtering
        let filtered = data;
        if (isAdmin) {
          // Admin sees everything that is NOT a draft (Pending or Published)
          filtered = data.filter(p => p.status !== "DRAFT");
        } else if (memberId) {
          // Researcher sees only their own items
          filtered = data.filter(p => p.member_id === memberId);
        }
        setItems(filtered); 
        setLoading(false); 
      }).catch(err => {
        console.error("Failed to fetch publications", err);
        setLoading(false);
      });
    }
  }, [t, isAdmin, memberId]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        const updated = await api.publications.update(t, editing.id, editing);
        setItems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const created = await api.publications.create(t, editing);
        setItems((prev) => [created, ...prev]);
      }
      setEditing(null);
      setAiSummary("");
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (pub: ResearchPublication) => {
    try {
      const updated = await api.publications.update(t, pub.id!, {
        status: pub.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
      });
      setItems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } catch (err) {
      console.error("Toggle publish failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this publication?")) return;
    setDeletingId(id);
    try {
      await api.publications.delete(t, id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleAISummarize = async () => {
    if (!editing?.abstract) return;
    setAiLoading(true);
    try {
      const { summary } = await api.publications.summarize(t, editing.abstract);
      setAiSummary(summary);
    } catch (err) {
      console.error("AI summarization failed", err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Publications</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{isAdmin ? "Review and moderate research publications" : "Manage your research publications"}</p>
        </div>
        {!isAdmin && (
          <button
            onClick={() => { setEditing(EMPTY); setAiSummary(""); }}
            className="flex items-center gap-2 bg-black text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-zinc-800 transition-colors"
          >
            <Plus size={15} /> New Publication
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-100 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1,2,3].map((i) => <div key={i} className="skeleton h-12 w-full" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-zinc-400 text-sm">No publications yet. Create one above.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden md:table-cell">Venue</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden lg:table-cell">Year</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {items.map((pub) => (
                <tr key={pub.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-zinc-900 line-clamp-1">{pub.title}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{pub.authors}</p>
                  </td>
                  <td className="px-5 py-4 text-zinc-500 hidden md:table-cell">{pub.venue ?? "—"}</td>
                  <td className="px-5 py-4 text-zinc-500 hidden lg:table-cell">{pub.publication_year}</td>
                  <td className="px-5 py-4"><StatusPill status={pub.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {isAdmin ? (
                        <>
                          {pub.status === "PENDING_REVIEW" && (
                            <button
                              onClick={() => handleTogglePublish(pub)}
                              className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-emerald-600 transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => { setEditing(pub); setAiSummary(""); }}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                            title="View Details"
                          >
                            <Search size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          {pub.status === "DRAFT" && (
                             <button
                               onClick={() => { setEditing(pub); setAiSummary(""); }}
                               className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                               title="Edit"
                             >
                               <Pencil size={14} />
                             </button>
                          )}
                          <button
                            onClick={() => handleDelete(pub.id!)}
                            disabled={deletingId === pub.id || pub.status !== "DRAFT"}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Drawer */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setEditing(null)} />
          <div className="relative ml-auto w-full max-w-xl bg-white h-full shadow-xl flex flex-col animate-slide-in" style={{ animationName: "slideInRight" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="font-semibold text-zinc-900">{editing.id ? "Edit Publication" : "New Publication"}</h2>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <Field label="Title">
                <input
                  className="field-input"
                  value={editing.title ?? ""}
                  onChange={(e) => setEditing((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Publication title"
                />
              </Field>
              <Field label="Authors">
                <input
                  className="field-input"
                  value={editing.authors ?? ""}
                  onChange={(e) => setEditing((p) => ({ ...p, authors: e.target.value }))}
                  placeholder="Dr. A. Silva, Dr. R. Perera"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Year">
                  <input type="number" className="field-input" value={editing.publication_year ?? ""} onChange={(e) => setEditing((p) => ({ ...p, publication_year: +e.target.value }))} />
                </Field>
                <Field label="Venue">
                  <input className="field-input" value={editing.venue ?? ""} onChange={(e) => setEditing((p) => ({ ...p, venue: e.target.value }))} placeholder="NeurIPS 2025" />
                </Field>
              </div>
              <Field label="DOI">
                <input className="field-input" value={editing.doi ?? ""} onChange={(e) => setEditing((p) => ({ ...p, doi: e.target.value }))} placeholder="10.1145/…" />
              </Field>
              <Field label="Abstract">
                <textarea
                  className="field-input min-h-[100px] resize-y"
                  value={editing.abstract ?? ""}
                  onChange={(e) => setEditing((p) => ({ ...p, abstract: e.target.value }))}
                  placeholder="Paste or type the abstract…"
                />
                <button
                  onClick={handleAISummarize}
                  disabled={aiLoading || !editing.abstract}
                  className="mt-2 flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 disabled:opacity-40 transition-colors"
                >
                  <Sparkles size={12} />
                  {aiLoading ? "Generating…" : "AI Summarize"}
                </button>
                {aiSummary && (
                  <div className="mt-2 p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-600">
                    <p className="font-medium text-zinc-700 mb-1">AI Summary</p>
                    {aiSummary}
                  </div>
                )}
              </Field>
              <Field label="Link">
                <input className="field-input" value={editing.link ?? ""} onChange={(e) => setEditing((p) => ({ ...p, link: e.target.value }))} placeholder="https://…" />
              </Field>
              <Field label="Status">
                <div className="relative">
                  <select
                    className="field-input appearance-none pr-8"
                    value={editing.status ?? "DRAFT"}
                    onChange={(e) => setEditing((p) => ({ ...p, status: e.target.value as any }))}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PENDING_REVIEW">Pending Review</option>
                    {isAdmin && <option value="PUBLISHED">Published</option>}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
              </Field>
            </div>

            <div className="px-6 py-4 border-t border-zinc-100 flex gap-2 justify-end">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-zinc-600 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors">
                {saving ? "Saving…" : editing.id ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
