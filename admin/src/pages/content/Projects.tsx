import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, X, ChevronDown, List } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { api, type Project, type ProjectItem } from "../../lib/api";

function StatusPill({ status }: { status: string }) {
  const isPublished = status === "PUBLISHED";
  const isPending = status === "PENDING_REVIEW";
  return (
    <span className={`status-pill ${isPublished ? "status-published" : isPending ? "bg-amber-100 text-amber-700" : "status-draft"}`}>
      {status.charAt(0) + status.slice(1).toLowerCase().replace("_", " ")}
    </span>
  );
}

const EMPTY_PROJECT: Partial<Project> = { 
  category: "", 
  icon_name: "", 
  description: "", 
  status: "DRAFT" 
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="mb-4"><label className="block text-xs font-medium text-zinc-600 mb-1.5">{label}</label>{children}</div>;
}

export default function Projects() {
  const { token, role, user } = useAuth();
  const isAdmin = role === "super_admin";
  const memberId = user?.id;
  const t = token ?? "";
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");

  useEffect(() => { 
    if (t) {
      api.projects.list(t).then((data) => {
        let filtered = data;
        if (isAdmin) {
          filtered = data.filter(p => p.status !== "DRAFT");
        } else if (memberId) {
          filtered = data.filter(p => p.member_id === memberId);
        }
        setProjects(filtered);
        setLoading(false);
      }).catch(e => {
        console.error("Failed to fetch projects", e); setLoading(false);
      });
    }
  }, [t, isAdmin, memberId]);

  useEffect(() => {
    if (editingProject?.id) {
      setItemsLoading(true);
      api.projectItems.list(t, editingProject.id).then(setItems).finally(() => setItemsLoading(false));
    } else {
      setItems([]);
    }
  }, [editingProject?.id, t]);

  const handleSaveProject = async () => {
    if (!editingProject) return;
    setSaving(true);
    try {
      if (editingProject.id) {
        const u = await api.projects.update(t, editingProject.id, editingProject);
        setProjects((p) => p.map((i) => (i.id === u.id ? u : i)));
      } else {
        const c = await api.projects.create(t, editingProject);
        setProjects((p) => [c, ...p]);
        setEditingProject(c); // Switch to edit mode to add items
      }
    } catch (err) {
      console.error("Save failed", err);
    } finally { setSaving(false); }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Delete this project? All items will be lost.")) return;
    try {
      await api.projects.delete(t, id);
      setProjects((p) => p.filter((i) => i.id !== id));
    } catch (err) { console.error("Delete failed", err); }
  };

  const handleTogglePublish = async (proj: Project) => {
    try {
      const u = await api.projects.update(t, proj.id!, { status: proj.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" });
      setProjects((p) => p.map((i) => (i.id === u.id ? u : i)));
    } catch (err) { console.error("Toggle failed", err); }
  };

  const handleAddItem = async () => {
    if (!editingProject?.id || !newItemTitle || !newItemDesc) return;
    try {
      const displayOrder = items.length > 0 ? Math.max(...items.map(i => i.display_order)) + 1 : 0;
      const c = await api.projectItems.create(t, {
        project_id: editingProject.id,
        title: newItemTitle,
        description: newItemDesc,
        display_order: displayOrder
      });
      setItems([...items, c]);
      setNewItemTitle("");
      setNewItemDesc("");
    } catch (err) {
      console.error("Add item failed", err);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await api.projectItems.delete(t, id);
      setItems((prev) => prev.filter(i => i.id !== id));
    } catch (err) { console.error("Delete item failed", err); }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Projects</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Manage grouped research projects and their sub-items.</p>
        </div>
        <button onClick={() => setEditingProject(EMPTY_PROJECT)} className="flex items-center gap-2 bg-black text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-zinc-800 transition-colors">
          <Plus size={15} /> New Project
        </button>
      </div>

      <div className="bg-white border border-zinc-100 rounded-xl overflow-hidden flex-1">
        {loading ? (
          <div className="p-8 space-y-3">{[1,2,3].map((i) => <div key={i} className="skeleton h-12 w-full" />)}</div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-zinc-400 text-sm">No projects yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Category / Title</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-zinc-900">{p.category}</p>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{p.description}</p>
                  </td>
                  <td className="px-5 py-4"><StatusPill status={p.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {isAdmin ? (
                        <>
                          {p.status === "PENDING_REVIEW" && (
                            <button
                              onClick={() => handleTogglePublish(p)}
                              className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-emerald-600 transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => setEditingProject(p)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                          >
                            <Search size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          {p.status === "DRAFT" && (
                            <button
                              onClick={() => setEditingProject(p)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                            >
                              <Pencil size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteProject(p.id!)}
                            disabled={p.status !== "DRAFT"}
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

      {editingProject !== null && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setEditingProject(null)} />
          <div className="relative ml-auto w-full max-w-2xl bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="font-semibold text-zinc-900">{editingProject.id ? "Edit Project" : "New Project"}</h2>
              <button onClick={() => setEditingProject(null)} className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400"><X size={16} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto w-full flex flex-col">
              <div className="p-6 border-b border-zinc-100 bg-zinc-50/50">
                <Field label="Project Category or Name">
                  <input className="field-input w-full" readOnly={isAdmin} value={editingProject.category ?? ""} onChange={(e) => setEditingProject((prev) => ({ ...prev, category: e.target.value }))} placeholder="e.g. Current Research" />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Icon SVG Name">
                    <input className="field-input w-full" value={editingProject.icon_name ?? ""} onChange={(e) => setEditingProject((prev) => ({ ...prev, icon_name: e.target.value }))} placeholder="lucide-react name (optional)" />
                  </Field>
                  <Field label="Status">
                    <div className="relative">
                      <select className="field-input w-full appearance-none pr-8" value={editingProject.status ?? "DRAFT"} onChange={(e) => setEditingProject((prev) => ({ ...prev, status: e.target.value as any }))}>
                        <option value="DRAFT">Draft</option>
                        <option value="PENDING_REVIEW">Pending Review</option>
                        {isAdmin && <option value="PUBLISHED">Published</option>}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                  </Field>
                </div>
                <Field label="Description">
                  <textarea className="field-input w-full min-h-[60px]" readOnly={isAdmin} value={editingProject.description ?? ""} onChange={(e) => setEditingProject((prev) => ({ ...prev, description: e.target.value }))} placeholder="High-level description of this project bucket..." />
                </Field>

                <div className="flex justify-end mt-2">
                  <button onClick={handleSaveProject} disabled={saving || !editingProject.category} className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors">
                    {saving ? "Saving…" : editingProject.id ? "Update Project" : "Create & Add Items"}
                  </button>
                </div>
              </div>

              {editingProject.id && (
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <List size={16} className="text-zinc-400" />
                    <h3 className="text-sm font-semibold text-zinc-900">Project Items</h3>
                  </div>
                  
                  {itemsLoading ? (
                    <div className="text-xs text-zinc-400">Loading items...</div>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {items.map(item => (
                        <div key={item.id} className="flex gap-4 p-4 border border-zinc-100 rounded-lg bg-white shadow-sm group">
                          <div className="flex-1">
                            <h4 className="text-sm border-b pb-1 font-medium text-zinc-900 mb-2">{item.title}</h4>
                            <p className="text-xs text-zinc-600 whitespace-pre-wrap">{item.description}</p>
                          </div>
                          <button onClick={() => handleDeleteItem(item.id!)} className="text-zinc-400 hover:text-red-600 h-fit p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                    {isAdmin && (
                      <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg text-xs text-zinc-500 mb-6 font-medium">
                        Administrators have view-only access to tutorial pages and series details.
                      </div>
                    )}
                    
                    {!isAdmin && (
                      <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4">
                        <h4 className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-3">Add New Item</h4>
                        <Field label="Item Title">
                          <input className="field-input w-full bg-white" value={newItemTitle} onChange={e => setNewItemTitle(e.target.value)} placeholder="Model Architecture" />
                        </Field>
                        <Field label="Item Description">
                          <textarea className="field-input w-full bg-white min-h-[80px]" value={newItemDesc} onChange={e => setNewItemDesc(e.target.value)} placeholder="Supports multimodal interactions..." />
                        </Field>
                        <div className="flex justify-end">
                          <button onClick={handleAddItem} disabled={!newItemTitle || !newItemDesc} className="px-3 py-1.5 text-xs font-medium bg-white text-zinc-900 border border-zinc-200 rounded-lg hover:bg-zinc-50 disabled:opacity-50 transition-colors">
                            + Add Item
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
