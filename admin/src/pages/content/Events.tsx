import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, X, ChevronDown, Calendar } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { api, type Event } from "../../lib/api";

const EVENT_TYPES = ["Seminar", "Workshop", "Conference", "Talk", "Competition"] as const;

function StatusPill({ status }: { status: string }) {
  const isPublished = status === "PUBLISHED";
  const isPending = status === "PENDING_REVIEW";
  
  return (
    <span className={`status-pill ${isPublished ? "status-published" : isPending ? "bg-amber-100 text-amber-700" : "status-draft"}`}>
      {status.charAt(0) + status.slice(1).toLowerCase().replace("_", " ")}
    </span>
  );
}

const EMPTY: Partial<Event> = { 
  title: "", 
  description: "", 
  event_date: "", 
  event_type: "Seminar", 
  link: "", 
  status: "DRAFT" 
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-medium text-zinc-600 mb-1.5">{label}</label>{children}</div>;
}

export default function Events() {
  const { token, role, user } = useAuth();
  const isAdmin = role === "super_admin";
  const memberId = user?.id;
  const t = token ?? "";
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Event> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => { 
    if (t) {
      api.events.list(t).then((data) => {
        let filtered = data;
        if (isAdmin) {
          filtered = data.filter(e => e.status !== "DRAFT");
        } else if (memberId) {
          filtered = data.filter(e => e.member_id === memberId);
        }
        setItems(filtered);
        setLoading(false);
      }).catch(err => {
        console.error("Failed to fetch events", err);
        setLoading(false);
      });
    }
  }, [t, isAdmin, memberId]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        const u = await api.events.update(t, editing.id, editing);
        setItems((p) => p.map((i) => (i.id === u.id ? u : i)));
      } else {
        const c = await api.events.create(t, editing);
        setItems((p) => [c, ...p]);
      }
      setEditing(null);
    } catch (err) {
      console.error("Save failed", err);
    } finally { setSaving(false); }
  };

  const handleTogglePublish = async (item: Event) => {
    try {
      const u = await api.events.update(t, item.id!, { 
        status: item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" 
      });
      setItems((p) => p.map((i) => (i.id === u.id ? u : i)));
    } catch (err) {
      console.error("Toggle publish failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setDeletingId(id);
    try {
      await api.events.delete(t, id);
      setItems((p) => p.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—";

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Events</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{isAdmin ? "Review and moderate seminars and workshops" : "Manage your seminars, workshops, and exhibitions"}</p>
        </div>
        {!isAdmin && (
          <button onClick={() => setEditing(EMPTY)} className="flex items-center gap-2 bg-black text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-zinc-800 transition-colors">
            <Plus size={15} /> New Event
          </button>
        )}
      </div>

      <div className="bg-white border border-zinc-100 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">{[1,2,3].map((i) => <div key={i} className="skeleton h-12 w-full" />)}</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-zinc-400 text-sm">No events yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Event</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden lg:table-cell">Type</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-zinc-900 line-clamp-1">{item.title}</p>
                    {item.description && <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{item.description}</p>}
                  </td>
                  <td className="px-5 py-4 text-zinc-500 hidden md:table-cell whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-zinc-400" />
                      {formatDate(item.event_date)}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 capitalize">{item.event_type}</span>
                  </td>
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
        )}
      </div>

      {/* Edit Drawer */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setEditing(null)} />
          <div className="relative ml-auto w-full max-w-xl bg-white h-full shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="font-semibold text-zinc-900">{editing.id ? "Edit Event" : "New Event"}</h2>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <Field label="Event Title"><input className="field-input" value={editing.title ?? ""} onChange={(e) => setEditing((p) => ({ ...p, title: e.target.value }))} placeholder="Event name" /></Field>
              <Field label="Description"><textarea className="field-input" value={editing.description ?? ""} onChange={(e) => setEditing((p) => ({ ...p, description: e.target.value }))} rows={3} placeholder="What is this event about?" /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date & Time">
                  <input type="datetime-local" className="field-input" value={editing.event_date ? editing.event_date.slice(0, 16) : ""} onChange={(e) => setEditing((p) => ({ ...p, event_date: new Date(e.target.value).toISOString() }))} />
                </Field>
                <Field label="Type">
                  <div className="relative">
                    <select className="field-input appearance-none pr-8" value={editing.event_type ?? "Seminar"} onChange={(e) => setEditing((p) => ({ ...p, event_type: e.target.value as any }))}>
                      {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </Field>
              </div>
              <Field label="Link"><input className="field-input" value={editing.link ?? ""} onChange={(e) => setEditing((p) => ({ ...p, link: e.target.value }))} placeholder="Website or registration link" /></Field>
              <Field label="Status">
                <div className="relative">
                  <select className="field-input appearance-none pr-8" value={editing.status ?? "DRAFT"} onChange={(e) => setEditing((p) => ({ ...p, status: e.target.value as any }))}>
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
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors">{saving ? "Saving…" : editing.id ? "Update" : "Create"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
