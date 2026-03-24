import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { api, type Blog as BlogType } from "../../lib/api";

function StatusPill({ status }: { status: string }) {
  const isPublished = status === "PUBLISHED";
  const isPending = status === "PENDING_REVIEW";
  
  return (
    <span className={`status-pill ${isPublished ? "status-published" : isPending ? "bg-amber-100 text-amber-700" : "status-draft"}`}>
      {status.charAt(0) + status.slice(1).toLowerCase().replace("_", " ")}
    </span>
  );
}

const EMPTY: Partial<BlogType> = { 
  title: "", 
  slug: "", 
  content: "", 
  excerpt: "", 
  image_url: "", 
  tags: [], 
  status: "DRAFT" 
};

export default function BlogPage() {
  const { token, role, user } = useAuth();
  const isAdmin = role === "super_admin";
  const memberId = user?.id;
  const t = token ?? "";
  const [items, setItems] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BlogType> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (t) {
      api.blog.list(t).then((data) => {
        let filtered = data;
        if (isAdmin) {
          filtered = data.filter(p => p.status !== "DRAFT");
        } else if (memberId) {
          filtered = data.filter(p => p.member_id === memberId);
        }
        setItems(filtered);
        setLoading(false);
      }).catch(err => {
        console.error("Failed to fetch blogs", err);
        setLoading(false);
      });
    }
  }, [t, isAdmin, memberId]);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        const updated = await api.blog.update(t, editing.id, editing);
        setItems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const created = await api.blog.create(t, editing);
        setItems((prev) => [created, ...prev]);
      }
      setEditing(null);
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (post: BlogType) => {
    try {
      const updated = await api.blog.update(t, post.id!, { 
        status: post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" 
      });
      setItems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } catch (err) {
      console.error("Toggle publish failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setDeletingId(id);
    try {
      await api.blog.delete(t, id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Blog Posts</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{isAdmin ? "Review and moderate blog articles" : "Manage your articles and announcements"}</p>
        </div>
        {!isAdmin && (
          <button onClick={() => setEditing(EMPTY)} className="flex items-center gap-2 bg-black text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-zinc-800 transition-colors">
            <Plus size={15} /> New Post
          </button>
        )}
      </div>

      <div className="bg-white border border-zinc-100 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">{[1,2,3].map((i) => <div key={i} className="skeleton h-12 w-full" />)}</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-zinc-400 text-sm">No blog posts yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden md:table-cell">Slug</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden lg:table-cell">Author</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {items.map((post) => (
                <tr key={post.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-zinc-900 line-clamp-1">{post.title}</p>
                    {post.excerpt && <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{post.excerpt}</p>}
                  </td>
                  <td className="px-5 py-4 text-zinc-400 font-mono text-xs hidden md:table-cell">{post.slug}</td>
                  <td className="px-5 py-4 text-zinc-500 hidden lg:table-cell">{post.author_name ?? "—"}</td>
                  <td className="px-5 py-4"><StatusPill status={post.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {isAdmin ? (
                        <>
                          {post.status === "PENDING_REVIEW" && (
                            <button
                              onClick={() => handleTogglePublish(post)}
                              className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-emerald-600 transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => setEditing(post)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                          >
                            <Search size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          {post.status === "DRAFT" && (
                            <button
                              onClick={() => setEditing(post)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                            >
                              <Pencil size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(post.id!)}
                            disabled={deletingId === post.id || post.status !== "DRAFT"}
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
              <h2 className="font-semibold text-zinc-900">{editing.id ? "Edit Post" : "New Blog Post"}</h2>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <Field label="Title">
                <input className="field-input" value={editing.title ?? ""} onChange={(e) => setEditing((p: any) => ({ ...p, title: e.target.value, slug: generateSlug(e.target.value) }))} placeholder="Post title" />
              </Field>
              <Field label="Slug">
                <input className="field-input font-mono text-xs" value={editing.slug ?? ""} onChange={(e) => setEditing((p: any) => ({ ...p, slug: e.target.value }))} placeholder="post-slug" />
              </Field>
              <Field label="Author Name">
                <input className="field-input" value={editing.author_name ?? ""} onChange={(e) => setEditing((p: any) => ({ ...p, author_name: e.target.value }))} placeholder="Dr. A. Silva" />
              </Field>
              <Field label="Excerpt">
                <textarea className="field-input" value={editing.excerpt ?? ""} onChange={(e) => setEditing((p: any) => ({ ...p, excerpt: e.target.value }))} placeholder="Short summary for listings" rows={2} />
              </Field>
              <Field label="Content (Markdown)">
                <textarea className="field-input font-mono text-xs min-h-[180px] resize-y" value={editing.content ?? ""} onChange={(e) => setEditing((p: any) => ({ ...p, content: e.target.value }))} placeholder="# Heading&#10;&#10;Write your post in Markdown…" />
              </Field>
              <Field label="Image URL">
                <input className="field-input" value={editing.image_url ?? ""} onChange={(e) => setEditing((p: any) => ({ ...p, image_url: e.target.value }))} placeholder="https://…" />
              </Field>
              <Field label="Tags (comma-separated)">
                <input className="field-input" value={(editing.tags ?? []).join(", ")} onChange={(e) => setEditing((p: any) => ({ ...p, tags: e.target.value.split(",").map((t) => t.trim()) }))} placeholder="Research, AI, Events" />
              </Field>
              <Field label="Status">
                <div className="relative">
                  <select className="field-input appearance-none pr-8" value={editing.status ?? "DRAFT"} onChange={(e) => setEditing((p: any) => ({ ...p, status: e.target.value as any }))}>
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
