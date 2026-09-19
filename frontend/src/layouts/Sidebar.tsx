import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  User,
  RefreshCw,
  History,
  Briefcase,
  Target,
  Map,
  Bot,
  GitGraph,
  Users,
  MessageSquare,
  BarChart3,
  Search,
  TrendingUp,
  Sparkles,
  Sliders,
  Building2
} from 'lucide-react';

interface NavLinkItem {
  to: string;
  label: string;
  icon: any;
  badge?: number | null;
  highlight?: boolean;
}

export const Sidebar: React.FC = () => {
  const { role } = useAuth();
  const { pendingSyncCount } = useApp();

  const employeeLinks: NavLinkItem[] = [
    { to: '/employee/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/employee/profile', label: 'AI Talent Profile', icon: User },
    { to: '/employee/talent-sync', label: 'TalentSync AI', icon: RefreshCw, badge: pendingSyncCount > 0 ? pendingSyncCount : null },
    { to: '/employee/history', label: 'Profile Change History', icon: History },
    { to: '/employee/opportunities', label: 'Internal Opportunities', icon: Briefcase },
    { to: '/employee/skill-gap', label: 'Skill Gap Analysis', icon: Target },
    { to: '/employee/roadmap', label: 'AI Career Roadmap', icon: Map },
    { to: '/employee/copilot', label: 'Gemini Career Copilot', icon: Bot, highlight: true },
    { to: '/employee/skill-graph', label: 'Interactive Skill Graph', icon: GitGraph },
    { to: '/employee/teams', label: 'Team Matching', icon: Users },
    { to: '/employee/feedback', label: 'Recommendation Feedback', icon: MessageSquare },
    { to: '/settings', label: 'Settings', icon: Sliders },
  ];

  const hrLinks: NavLinkItem[] = [
    { to: '/hr/dashboard', label: 'HR Dashboard', icon: BarChart3 },
    { to: '/hr/directory', label: 'Employee Directory', icon: Building2 },
    { to: '/hr/search', label: 'Talent Search', icon: Search },
    { to: '/hr/profile', label: 'Employee Profiles', icon: User },
    { to: '/hr/emerging-skills', label: 'Emerging Skills', icon: TrendingUp },
    { to: '/settings', label: 'Settings', icon: Sliders },
  ];

  const links = role === 'HR_ADMIN' ? hrLinks : employeeLinks;

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 p-4 flex flex-col justify-between shrink-0 hidden md:block transition-colors">
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 px-3">
            {role === 'HR_ADMIN' ? 'HR & Talent Ops Management' : 'Employee Intelligence Workspace'}
          </p>
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 font-semibold'
                        : link.highlight
                        ? 'text-purple-600 dark:text-purple-300 hover:bg-purple-500/10 border border-purple-500/20'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
                    }`
                  }
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-bold border border-amber-500/40">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
        <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TalentFlow AI Engine</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
          Continuously detecting transferable skills & matching talent opportunities.
        </p>
      </div>
    </aside>
  );
};
