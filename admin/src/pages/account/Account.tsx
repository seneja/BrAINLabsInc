import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api, type MemberCV } from "../../lib/api";
import { Loader2, User, BookOpen, Briefcase, Award, Users, Search, FlaskConical } from "lucide-react";
import { BasicInfoTab } from "./components/BasicInfoTab";
import { QualificationsTab } from "./components/QualificationsTab";
import { ExperienceTab } from "./components/ExperienceTab";
import { AwardsTab } from "./components/AwardsTab";
import { MembershipsTab } from "./components/MembershipsTab";
import { OngoingResearchTab } from "./components/OngoingResearchTab";
import { InterestsTab } from "./components/InterestsTab";

type TabId = "basic" | "qualifications" | "experience" | "awards" | "memberships" | "research" | "interests";

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const TABS: TabConfig[] = [
  { id: "basic", label: "Basic Information", icon: User },
  { id: "interests", label: "Research Interests", icon: Search },
  { id: "qualifications", label: "Qualifications", icon: BookOpen },
  { id: "experience", label: "Career Experience", icon: Briefcase },
  { id: "awards", label: "Honours & Awards", icon: Award },
  { id: "memberships", label: "Memberships", icon: Users },
  { id: "research", label: "Ongoing Research", icon: FlaskConical },
];

export default function Account() {
  const { token, role } = useAuth();
  const isAdmin = role === "super_admin";
  const t = token ?? "";
  
  const [activeTab, setActiveTab] = useState<TabId>("basic");
  const [cv, setCv] = useState<MemberCV | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Filter tabs based on role: Super Admin only gets Basic Info
  const filteredTabs = TABS.filter(tab => {
    if (isAdmin) return tab.id === "basic";
    return true;
  });

  const fetchCV = async () => {
    if (!t) return;
    try {
      const data = await api.me.cv.get(t);
      setCv(data);
    } catch (err: any) {
      setError(err.message || "Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCV();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
      </div>
    );
  }

  if (error || !cv) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
          {error || "Profile not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col md:flex-row bg-zinc-50/50">
      {/* Sidebar for Settings */}
      <div className="w-full md:w-64 lg:w-72 flex-shrink-0 border-b md:border-b-0 md:border-r border-zinc-200 bg-white">
        <div className="p-6">
          <h1 className="text-xl font-bold text-zinc-900 mb-1">Account & Profile</h1>
          <p className="text-sm text-zinc-500 mb-6">Manage your CV and platform settings</p>
          
          <nav className="space-y-1">
            {filteredTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <tab.icon size={16} className={activeTab === tab.id ? "text-white" : "text-zinc-400"} />
                {tab.label}
              </button>
            ))}
            <div className="pt-6 border-t border-zinc-100 mt-6">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  isEditing
                    ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                    : "bg-white border-zinc-200 text-zinc-900 hover:border-zinc-900 shadow-sm"
                }`}
              >
                {isEditing ? "Finish Editing" : "Edit Profile"}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-4xl mx-auto">
          {activeTab === "basic" && <BasicInfoTab cv={cv} onUpdate={fetchCV} isEditing={isEditing} />}
          {activeTab === "interests" && <InterestsTab cv={cv} onUpdate={fetchCV} isEditing={isEditing} />}
          {activeTab === "qualifications" && <QualificationsTab cv={cv} onUpdate={fetchCV} isEditing={isEditing} />}
          {activeTab === "experience" && <ExperienceTab cv={cv} onUpdate={fetchCV} isEditing={isEditing} />}
          {activeTab === "awards" && <AwardsTab cv={cv} onUpdate={fetchCV} isEditing={isEditing} />}
          {activeTab === "memberships" && <MembershipsTab cv={cv} onUpdate={fetchCV} isEditing={isEditing} />}
          {activeTab === "research" && <OngoingResearchTab cv={cv} onUpdate={fetchCV} isEditing={isEditing} />}
        </div>
      </div>
    </div>
  );
}
