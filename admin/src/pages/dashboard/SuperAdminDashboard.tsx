import { useEffect, useState } from "react";
import { 
  Users, 
  BookOpen, 
  FileText, 
  CalendarDays, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { StatCard } from "./components/StatCard";

interface Stats {
  users: number;
  publications: number;
  blog: number;
  events: number;
  pending: number;
}

export function SuperAdminDashboard({ token }: { token: string }) {
  const [stats, setStats] = useState<Stats>({ users: 0, publications: 0, blog: 0, events: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, pubs, blogs, events] = await Promise.all([
          api.members.list(token),
          api.publications.list(token),
          api.blog.list(token),
          api.events.list(token),
        ]);

        const pendingPubs = pubs.filter(p => p.status === 'PENDING_REVIEW').length;
        const pendingBlogs = blogs.filter(b => b.status === 'PENDING_REVIEW').length;
        const pendingEvents = events.filter(e => e.status === 'PENDING_REVIEW').length;

        setStats({
          users: users.length,
          publications: pubs.length,
          blog: blogs.length,
          events: events.length,
          pending: pendingPubs + pendingBlogs + pendingEvents,
        });
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-zinc-900" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Administrative Overview</span>
          </div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Super Admin <span className="text-zinc-300">Console</span></h1>
          <p className="text-zinc-500 mt-2 font-medium">Global platform health and content moderation hub.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 bg-zinc-900 rounded-2xl shadow-lg shadow-black/5 flex items-center gap-3 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white tracking-widest uppercase">System Online</span>
          </div>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Members" value={loading ? "..." : stats.users} icon={Users} href="/users" sub="Registered accounts" />
        <StatCard label="Publications" value={loading ? "..." : stats.publications} icon={BookOpen} href="/publications" sub="Total research entries" />
        <StatCard label="Review Queue" value={loading ? "..." : stats.pending} icon={AlertCircle} href="/publications" sub="Awaiting approval" />
        <StatCard label="Blog Posts" value={loading ? "..." : stats.blog} icon={FileText} href="/blog" sub="Published articles" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Review Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-xl border border-amber-100">
                  <Clock className="text-amber-600" size={18} />
                </div>
                <h2 className="text-xl font-black text-zinc-900 tracking-tight">Priority Review Queue</h2>
              </div>
              <Link to="/publications" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">View All Actions</Link>
            </div>

            {stats.pending > 0 ? (
              <div className="space-y-4">
                <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-between group hover:border-zinc-400 transition-all cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl border border-zinc-200 flex items-center justify-center">
                      <BookOpen size={20} className="text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-zinc-900 uppercase tracking-tight">Pending Publications</p>
                      <p className="text-xs text-zinc-500 font-medium">Items waiting for Super Admin verification</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded-lg uppercase tracking-widest border border-amber-200">{stats.pending} Items</span>
                    <ArrowRight size={16} className="text-zinc-300 group-hover:text-black transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center bg-zinc-50/50 border-2 border-dashed border-zinc-200 rounded-3xl">
                <div className="w-16 h-16 bg-white rounded-2xl border border-zinc-100 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp size={24} className="text-emerald-500" />
                </div>
                <p className="text-sm font-bold text-zinc-900 tracking-tight uppercase">Everything is Up to Date</p>
                <p className="text-xs text-zinc-500 mt-1 font-medium italic">No content currently requires review.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Management */}
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-3xl p-8 text-white shadow-xl shadow-black/10 flex flex-col justify-between overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users size={120} />
             </div>
             <div className="relative">
                <h3 className="text-lg font-black tracking-tighter mb-2">Member Control</h3>
                <p className="text-zinc-400 text-xs font-medium leading-relaxed mb-6">Analyze and manage the researcher community profiles and permissions.</p>
                <Link to="/users" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all active:scale-95">
                  Manage Users <ArrowRight size={12} />
                </Link>
             </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-6 font-mono">Platform Health</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CalendarDays size={16} className="text-zinc-400" />
                    <span className="text-xs font-bold text-zinc-700 uppercase tracking-tight">Active Events</span>
                  </div>
                  <span className="text-xs font-black text-zinc-900">{stats.events}</span>
               </div>
               <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-zinc-400" />
                    <span className="text-xs font-bold text-zinc-700 uppercase tracking-tight">Uptime</span>
                  </div>
                  <span className="text-xs font-black text-emerald-600">99.9%</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
