import { useEffect, useState } from "react";
import { 
  BookOpen, 
  FlaskConical, 
  Plus, 
  User, 
  CheckCircle2, 
  ArrowUpRight,
  PlusCircle,
  TrendingUp,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import { api, type MemberCV } from "../../lib/api";
import { StatCard } from "./components/StatCard";

interface Stats {
  publications: number;
  projects: number;
  grants: number;
  completeness: number;
}

export function ResearcherDashboard({ token, memberId }: { token: string, memberId: string }) {
  const [stats, setStats] = useState<Stats>({ publications: 0, projects: 0, grants: 0, completeness: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pubs, projs, grants, cv] = await Promise.all([
          api.publications.list(token),
          api.projects.list(token),
          api.grants.list(token),
          api.me.cv.get(token),
        ]);

        // Filter for "My" items (in a real app, the API would handle this, 
        // but here we filter by member_id on the frontend for now)
        const myPubs = pubs.filter(p => p.member_id === memberId).length;
        const myProjs = projs.filter(p => p.member_id === memberId).length;
        const myGrants = grants.filter(g => g.member_id === memberId).length;

        // Calculate profile completeness
        const cvSections = [
          (cv?.research_interests?.length ?? 0) > 0,
          (cv?.academic_qualifications?.length ?? 0) > 0,
          (cv?.career_experiences?.length ?? 0) > 0,
          (cv?.honours_and_awards?.length ?? 0) > 0,
          (cv?.memberships?.length ?? 0) > 0,
          (cv?.ongoing_research?.length ?? 0) > 0,
          !!cv?.summary
        ];
        const completeness = Math.round((cvSections.filter(Boolean).length / cvSections.length) * 100);

        setStats({
          publications: myPubs,
          projects: myProjs,
          grants: myGrants,
          completeness
        });
      } catch (err) {
        console.error("Failed to fetch researcher stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token, memberId]);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-zinc-900" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Research Ecosystem</span>
          </div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Your <span className="text-zinc-300">Workspace</span></h1>
          <p className="text-zinc-500 mt-2 font-medium">Manage your publications, projects, and researcher profile.</p>
        </div>
        <div className="flex flex-col gap-2">
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
             <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
             Profile Completion
           </div>
           <div className="w-48 h-2.5 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200 p-[2px]">
              <div 
                className="h-full bg-black rounded-full transition-all duration-1000" 
                style={{ width: `${stats.completeness}%` }}
              />
           </div>
           <p className="text-[11px] font-bold text-zinc-900 text-right uppercase tracking-tighter mt-1">{stats.completeness}% Refined</p>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="My Publications" value={loading ? "..." : stats.publications} icon={BookOpen} href="/publications" sub="Peer-reviewed work" />
        <StatCard label="Active Projects" value={loading ? "..." : stats.projects} icon={FlaskConical} href="/projects" sub="Research initiatives" />
        <StatCard label="Associated Grants" value={loading ? "..." : stats.grants} icon={Briefcase} href="/grants" sub="Funding & Sponsorships" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions Card */}
        <div className="bg-zinc-900 rounded-3xl p-10 text-white shadow-xl shadow-black/10 relative overflow-hidden group">
           <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <PlusCircle size={240} />
           </div>
           <div className="relative">
              <h3 className="text-2xl font-black tracking-tighter mb-4">Quick <span className="text-zinc-500 italic">Actions</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <Link to="/publications" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all group/btn">
                    <div className="flex items-center gap-3">
                       <Plus size={16} />
                       <span className="text-xs font-bold uppercase tracking-widest">New Publication</span>
                    </div>
                    <ArrowUpRight size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                 </Link>
                 <Link to="/projects" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all group/btn">
                    <div className="flex items-center gap-3">
                       <Plus size={16} />
                       <span className="text-xs font-bold uppercase tracking-widest">New Project</span>
                    </div>
                    <ArrowUpRight size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                 </Link>
              </div>
           </div>
        </div>

        {/* Profile Helper Card */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-10 shadow-sm flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-zinc-50 rounded-xl border border-zinc-100">
                    <User className="text-zinc-600" size={18} />
                 </div>
                 <h2 className="text-xl font-black text-zinc-900 tracking-tight underline decoration-amber-200 underline-offset-8">Profile Refinement</h2>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-8">
                Enhance your professional visibility by ensuring all CV sections are meticulously detailed. A complete profile significantly improves discovery within the BrAIN Labs community.
              </p>
           </div>
           <Link to="/account" className="flex items-center justify-center gap-2 w-full py-3.5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg border border-transparent hover:bg-zinc-800 transition-all active:scale-95">
             Refine Profile Details
             <CheckCircle2 size={14} />
           </Link>
        </div>
      </div>
    </div>
  );
}
