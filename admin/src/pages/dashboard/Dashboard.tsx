import { useAuth } from "../../hooks/useAuth";
import { SuperAdminDashboard } from "./SuperAdminDashboard";
import { ResearcherDashboard } from "./ResearcherDashboard";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { role, token, user } = useAuth();

  if (!token || !role || !user) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {role === "super_admin" ? (
        <SuperAdminDashboard token={token} />
      ) : (
        <ResearcherDashboard token={token} memberId={user.id} />
      )}
    </div>
  );
}
