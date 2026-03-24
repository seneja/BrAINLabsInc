import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { api, type Grant } from "../../lib/api";

function StatusPill({ status }: { status: string }) {
  const isPublished = status === "PUBLISHED";
  const isPending = status === "PENDING_REVIEW";
  
  return (
    <span className={`status-pill ${isPublished ? "status-published" : isPending ? "bg-amber-100 text-amber-700" : "status-draft"}`}>
      {status.charAt(0) + status.slice(1).toLowerCase().replace("_", " ")}
    </span>
  );
}

const EMPTY: Partial<Grant> = { 
  title: "", 
  agency: "", 
  award_year: new Date().getFullYear().toString(), 
  description: "", 
  status: "DRAFT" 
};

function Field({ label, children, colSpan = false }: { label: string; children: React.ReactNode; colSpan?: boolean }) {
  return <div className={colSpan ? "md:col-span-2" : ""}><label className="block text-xs font-medium text-zinc-600 mb-1.5">{label}</label>{children}</div>;
}

export default function Grants() {
  const { token, role, user } = useAuth();
  const isAdmin = role === "super_admin";
  const memberId = user?.id;
  const t = token ?? "";
  const [items, setItems] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Grant> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => { 
    if (t) {
      api.grants.list(t).then((data) => {
        let filtered = data;
        if (isAdmin) {
          filtered = data.filter(g => g.status !== "DRAFT");
        } else if (memberId) {
          filtered = data.filter(g => g.member_id === memberId);
        }
        setItems(filtered);
        setLoading(false);
      }).catch(err => {
        console.error("Failed to fetch grants", err);
        setLoading(false);
      });
    }
  }, [t, isAdmin, memberId]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        const u = await api.grants.update(t, editing.id, editing);
        setItems((p) => p.map((i) => (i.id === u.id ? u : i)));
      } else {
        const c = await api.grants.create(t, editing);
        setItems((p) => [c, ...p]);
      }
      setEditing(null);
    } catch (err) {
      console.error("Save failed", err);
    } finally { setSaving(false); }
  };

  const handleTogglePublish = async (item: Grant) => {
    try {
      const u = await api.grants.update(t, item.id!, { 
        status: item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" 
      });
      setItems((p) => p.map((i) => (i.id === u.id ? u : i)));
    } catch (err) {
      console.error("Toggle publish failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this grant?")) return;
    setDeletingId(id);
    try {
      await api.grants.delete(t, id);
      setItems((p) => p.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Research Grants</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{isAdmin ? "Review and moderate research grants" : "Manage your funding and awarded grants"}</p>
        </div>
        {!isAdmin && (
          <button onClick={() => setEditing(EMPTY)} className="flex items-center gap-2 bg-black text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-zinc-800 transition-colors">
            <Plus size={15} /> New Grant
          </button>
        )}
      </div>

      <div className="bg-white border border-zinc-100 rounded-xl overflow-hidden flex-1 flex flex-col">
        {loading ? (
          <div className="p-8 space-y-3">{[1,2,3].map((i) => <div key={i} className="skeleton h-12 w-full" />)}</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-zinc-400 text-sm">No research grants yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50">
                  <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Title</th>
                  <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden md:table-cell">Agency</th>
                  <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Year</th>
                  <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-zinc-900">{item.title}</td>
                    <td className="px-5 py-4 hidden md:table-cell text-zinc-500">{item.agency}</td>
                    <td className="px-5 py-4 text-zinc-500">{item.award_year || "—"}</td>
                    <td className="px-5 py-4"><StatusPill status={item.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {isAdmin ? (
                          <>
                            {item.status === "PENDING_REVIEW" && (
                              <button
                                onClick={() => handleTogglePublish(item)}
                                className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-emerald-600 transition-colors"
                              >
                                Approve
                              </button>
                            )}
                            <button
                              onClick={() => setEditing(item)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                            >
                              <Search size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            {item.status === "DRAFT" && (
                              <button
                                onClick={() => setEditing(item)}
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                              >
                                <Pencil size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(item.id!)}
                              disabled={deletingId === item.id || item.status !== "DRAFT"}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
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
          </div>
        )}
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setEditing(null)} />
          <div className="relative ml-auto w-full max-w-md bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="font-semibold text-zinc-900">{editing.id ? "Edit Grant" : "New Grant"}</h2>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Title" colSpan>
                  <input className="field-input w-full" value={editing.title ?? ""} onChange={(e) => setEditing((p) => ({ ...p, title: e.target.value }))} placeholder="Grant title" />
                </Field>
                <Field label="Agency">
                  <input className="field-input w-full" value={editing.agency ?? ""} onChange={(e) => setEditing((p) => ({ ...p, agency: e.target.value }))} placeholder="NSF, NIH..." />
                </Field>
                <Field label="Award Year">
                  <input className="field-input w-full" value={editing.award_year ?? ""} onChange={(e) => setEditing((p) => ({ ...p, award_year: e.target.value }))} placeholder="YYYY" />
                </Field>
                <Field label="Description" colSpan>
                  <textarea className="field-input w-full min-h-[120px] resize-y" value={editing.description ?? ""} onChange={(e) => setEditing((p) => ({ ...p, description: e.target.value }))} placeholder="Brief summary of the grant..." />
                </Field>
                <Field label="Status" colSpan>
                  <div className="relative">
                    <select className="field-input w-full appearance-none pr-8" value={editing.status ?? "DRAFT"} onChange={(e) => setEditing((p) => ({ ...p, status: e.target.value as any }))}>
                      <option value="DRAFT">Draft</option>
                      <option value="PENDING_REVIEW">Pending Review</option>
                      {isAdmin && <option value="PUBLISHED">Published</option>}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </Field>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-zinc-100 flex gap-2 justify-end bg-zinc-50">
               <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-zinc-600 rounded-lg border border-zinc-200 hover:bg-zinc-100 bg-white transition-colors">Cancel</button>
               <button onClick={handleSave} disabled={saving || !editing.title || !editing.agency} className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors">{saving ? "Saving…" : editing.id ? "Update" : "Create"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
