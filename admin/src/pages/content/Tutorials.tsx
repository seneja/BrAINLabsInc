import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, X, BookOpen, FileText, ChevronDown } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { api, type TutorialSeries, type TutorialPage } from "../../lib/api";

function StatusPill({ status }: { status: string }) {
  const isPublished = status === "PUBLISHED";
  const isPending = status === "PENDING_REVIEW";
  return (
    <span className={`status-pill ${isPublished ? "status-published" : isPending ? "bg-amber-100 text-amber-700" : "status-draft"}`}>
      {status.charAt(0) + status.slice(1).toLowerCase().replace("_", " ")}
    </span>
  );
}

const EMPTY_SERIES: Partial<TutorialSeries> = { 
  title: "", 
  slug: "", 
  description: "", 
  status: "DRAFT" 
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="mb-4"><label className="block text-xs font-medium text-zinc-600 mb-1.5">{label}</label>{children}</div>;
}

export default function Tutorials() {
  const { token, role, user } = useAuth();
  const isAdmin = role === "super_admin";
  const memberId = user?.id;
  const t = token ?? "";
  const [series, setSeries] = useState<TutorialSeries[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingSeries, setEditingSeries] = useState<Partial<TutorialSeries> | null>(null);
  const [pages, setPages] = useState<TutorialPage[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [editingPage, setEditingPage] = useState<Partial<TutorialPage> | null>(null);

  useEffect(() => { 
    if (t) {
      api.tutorialSeries.list(t).then((data) => {
        let filtered = data;
        if (isAdmin) {
          filtered = data.filter(s => s.status !== "DRAFT");
        } else if (memberId) {
          filtered = data.filter(s => s.member_id === memberId);
        }
        setSeries(filtered);
        setLoading(false);
      }).catch(e => {
        console.error("Failed to fetch series", e); setLoading(false);
      });
    }
  }, [t, isAdmin, memberId]);

  useEffect(() => {
    if (editingSeries?.id) {
      setPagesLoading(true);
      api.tutorialPages.list(t, editingSeries.id).then(setPages).finally(() => setPagesLoading(false));
    } else {
      setPages([]);
    }
  }, [editingSeries?.id, t]);

  const handleSaveSeries = async () => {
    if (!editingSeries) return;
    setSaving(true);
    try {
      if (editingSeries.id) {
        const u = await api.tutorialSeries.update(t, editingSeries.id, editingSeries);
        setSeries((s) => s.map((i) => (i.id === u.id ? u : i)));
      } else {
        const c = await api.tutorialSeries.create(t, editingSeries);
        setSeries((s) => [c, ...s]);
        setEditingSeries(c);
      }
    } catch (err) { console.error("Save failed", err); } finally { setSaving(false); }
  };

  const handleDeleteSeries = async (id: string) => {
    if (!window.confirm("Delete this tutorial series? All pages will be lost.")) return;
    try {
      await api.tutorialSeries.delete(t, id);
      setSeries((s) => s.filter((i) => i.id !== id));
    } catch (err) { console.error("Delete failed", err); }
  };

  const handleSavePage = async () => {
    if (!editingPage || !editingSeries?.id) return;
    try {
      if (editingPage.id) {
        const u = await api.tutorialPages.update(t, editingPage.id, editingPage);
        setPages(p => p.map(i => i.id === u.id ? u : i));
      } else {
        const displayOrder = pages.length > 0 ? Math.max(...pages.map(i => i.display_order)) + 1 : 0;
        const c = await api.tutorialPages.create(t, { 
          ...editingPage, 
          series_id: editingSeries.id,
          display_order: displayOrder 
        });
        setPages([...pages, c]);
      }
      setEditingPage(null);
    } catch (err) { console.error("Page save failed", err); }
  };

  const handleDeletePage = async (id: string) => {
    if (!window.confirm("Delete this page?")) return;
    try {
      await api.tutorialPages.delete(t, id);
      setPages(p => p.filter(i => i.id !== id));
    } catch (err) { console.error("Page delete failed", err); }
  };

  const handleTogglePublish = async (s: TutorialSeries) => {
    try {
      const u = await api.tutorialSeries.update(t, s.id!, { 
        status: s.status === "PUBLISHED" ? "PENDING_REVIEW" : "PUBLISHED" 
      });
      setSeries((prev) => prev.map((i) => (i.id === u.id ? u : i)));
    } catch (err) {
      console.error("Toggle publish failed", err);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Tutorials & Docs</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{isAdmin ? "Review and moderate learning series" : "Create structured educational deep-dives."}</p>
        </div>
        {!isAdmin && (
          <button onClick={() => setEditingSeries(EMPTY_SERIES)} className="flex items-center gap-2 bg-black text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-zinc-800 transition-colors">
            <Plus size={15} /> New Series
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
        {loading ? (
           [1,2,3].map(i => <div key={i} className="skeleton h-48 w-full border border-zinc-100 rounded-2xl" />)
        ) : series.length === 0 ? (
          <div className="md:col-span-full p-12 text-center text-zinc-400 text-sm">No tutorial series yet.</div>
        ) : (
          series.map(s => (
            <div key={s.id} className="group flex flex-col bg-white border border-zinc-100 rounded-2xl p-6 hover:border-zinc-300 transition-all shadow-sm h-fit">
              <div className="flex justify-between items-start mb-4">
                 <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                    <BookOpen size={20} />
                 </div>
                 {!isAdmin && (
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingSeries(s)} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"><Pencil size={14} /></button>
                      <button onClick={() => handleDeleteSeries(s.id!)} className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50"><Trash2 size={14} /></button>
                   </div>
                 )}
              </div>
              <h3 className="font-bold text-zinc-900 mb-1">{s.title}</h3>
              <p className="text-xs text-zinc-500 mb-4 line-clamp-2 leading-relaxed">{s.description}</p>
              <div className="mt-auto pt-4 border-t border-zinc-50 flex items-center justify-between">
                 <StatusPill status={s.status} />
                 <div className="flex items-center gap-2">
                    {isAdmin ? (
                      <>
                        {s.status === "PENDING_REVIEW" && (
                          <button
                            onClick={() => handleTogglePublish(s)}
                            className="px-2 py-0.5 bg-zinc-900 text-white text-[9px] font-bold uppercase tracking-widest rounded hover:bg-emerald-600 transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        <button onClick={() => setEditingSeries(s)} className="text-zinc-400 hover:text-black transition-colors" title="View Details">
                          <Search size={14} />
                        </button>
                      </>
                    ) : (
                      <button onClick={() => setEditingSeries(s)} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">Manage Pages</button>
                    )}
                 </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editingSeries !== null && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setEditingSeries(null)} />
          <div className="relative ml-auto w-full max-w-4xl bg-white h-full shadow-xl flex flex-col md:flex-row animate-in slide-in-from-right duration-200">
            {/* Left sidebar: Series details and Page list */}
            <div className="w-full md:w-80 border-r border-zinc-100 flex flex-col bg-zinc-50/30">
               <div className="p-6 border-b border-zinc-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-zinc-900 text-sm">Series Details</h2>
                    <button onClick={() => setEditingSeries(null)} className="md:hidden p-1 text-zinc-400"><X size={16} /></button>
                  </div>
                  <Field label="Title">
                     <input className="field-input w-full bg-white text-xs py-2" readOnly={isAdmin} value={editingSeries.title} onChange={e => setEditingSeries((p: any) => ({ ...p, title: e.target.value }))} />
                  </Field>
                  <Field label="URL Slug">
                     <input className="field-input w-full bg-white text-xs py-2" readOnly={isAdmin} value={editingSeries.slug || ""} onChange={e => setEditingSeries((p: any) => ({ ...p, slug: e.target.value.toLowerCase().replace(/ /g, '-') }))} />
                  </Field>
                  <Field label="Status">
                     <div className="relative">
                        <select className="field-input w-full appearance-none pr-8 bg-white text-xs py-2" value={editingSeries.status ?? "DRAFT"} onChange={(e) => setEditingSeries((p: any) => ({ ...p, status: e.target.value as any }))}>
                           <option value="DRAFT">Draft</option>
                           <option value="PENDING_REVIEW">Pending Review</option>
                           {isAdmin && <option value="PUBLISHED">Published</option>}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                     </div>
                  </Field>
                  <div className="flex justify-end gap-2 mt-4">
                     <button onClick={handleSaveSeries} disabled={isAdmin} className="px-3 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-lg disabled:opacity-30">{saving ? '...' : 'Save'}</button>
                  </div>
               </div>

               {editingSeries.id && (
                 <div className="flex-1 overflow-y-auto p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Pages</h3>
                       {!isAdmin && (
                         <button onClick={() => setEditingPage({ title: '', slug: '', content: '' })} className="text-zinc-900 hover:bg-zinc-200 p-1 rounded transition-colors"><Plus size={14} /></button>
                       )}
                    </div>
                    {pagesLoading ? <div className="skeleton h-4 w-full mb-2" /> : (
                      <div className="space-y-1">
                        {pages.map(p => (
                          <div key={p.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${editingPage?.id === p.id ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-600'}`} onClick={() => setEditingPage(p)}>
                             <FileText size={14} className={editingPage?.id === p.id ? 'text-zinc-400' : 'text-zinc-400'} />
                             <span className="text-xs truncate flex-1">{p.title}</span>
                             {!isAdmin && (
                               <button onClick={(e) => { e.stopPropagation(); handleDeletePage(p.id!); }} className={`p-1 rounded hover:bg-zinc-400/20 ${editingPage?.id === p.id ? 'text-zinc-400' : 'text-zinc-300'}`}><Trash2 size={12} /></button>
                             )}
                          </div>
                        ))}
                      </div>
                    )}
                 </div>
               )}
            </div>

            {/* Right side: Editor */}
            <div className="flex-1 flex flex-col">
               {editingPage ? (
                 <>
                    <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-white">
                       <div>
                         <h3 className="text-sm font-bold text-zinc-900">{isAdmin ? 'View Page' : (editingPage.id ? 'Edit Page' : 'New Page')}</h3>
                         <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Page in {editingSeries.title}</p>
                       </div>
                       <div className="flex gap-2">
                         <button onClick={() => setEditingPage(null)} className="px-4 py-1.5 text-xs text-zinc-500 hover:text-zinc-900">{isAdmin ? 'Close' : 'Cancel'}</button>
                         {!isAdmin && (
                           <button onClick={handleSavePage} className="px-5 py-1.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-zinc-800 transition-colors">Save Page</button>
                         )}
                       </div>
                    </div>
                    <div className="p-8 flex-1 overflow-y-auto bg-white">
                       <div className="grid grid-cols-2 gap-6 mb-6">
                         <Field label="Page Title">
                            <input className="field-input w-full bg-zinc-50" readOnly={isAdmin} value={editingPage.title || ""} onChange={e => setEditingPage((p: any) => ({ ...p, title: e.target.value }))} placeholder="Introduction" />
                         </Field>
                         <Field label="URL Slug">
                            <input className="field-input w-full bg-zinc-50" readOnly={isAdmin} value={editingPage.slug || ""} onChange={e => setEditingPage((p: any) => ({ ...p, slug: e.target.value.toLowerCase().replace(/ /g, '-') }))} placeholder="intro" />
                         </Field>
                       </div>
                       <Field label="Content (Markdown)">
                          <textarea className="field-input w-full min-h-[400px] bg-zinc-50 font-mono text-xs leading-relaxed p-6" readOnly={isAdmin} value={editingPage.content || ""} onChange={e => setEditingPage((p: any) => ({ ...p, content: e.target.value }))} placeholder="# Document your research..." />
                       </Field>
                    </div>
                 </>
               ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-zinc-300 bg-zinc-50/10">
                    <BookOpen size={48} className="mb-4 opacity-10" />
                    <p className="text-sm font-medium">Select a page to edit or create a new one.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
