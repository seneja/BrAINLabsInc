import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  href: string;
  sub?: string;
}

export function StatCard({ label, value, icon: Icon, href, sub }: StatCardProps) {
  return (
    <Link
      to={href}
      className="group flex flex-col gap-4 p-5 bg-white border border-zinc-100 rounded-2xl hover:border-zinc-300 hover:shadow-sm transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center group-hover:bg-zinc-900 transition-colors border border-zinc-100">
          <Icon size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
        </div>
        <ArrowRight size={14} className="text-zinc-300 group-hover:text-zinc-600 transition-colors" />
      </div>
      <div>
        <p className="text-3xl font-black text-zinc-900 tracking-tighter">{value}</p>
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1 group-hover:text-zinc-600 transition-colors">{label}</p>
        {sub && <p className="text-[10px] text-zinc-400 italic mt-0.5">{sub}</p>}
      </div>
    </Link>
  );
}
