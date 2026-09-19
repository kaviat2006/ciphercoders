import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, UserCheck, ChevronRight, Plus, Sparkles, Building2 } from 'lucide-react';
import { HRAddEmployeeModal } from '../components/HRAddEmployeeModal';

export const HREmployeeDirectory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      email: "employee@talentflow.demo",
      current_role: "Software Developer",
      department: "Software Engineering",
      experience_years: 2.0,
      avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      top_skills: ["Python", "Java", "SQL", "Machine Learning", "AWS"],
      profile_completeness: 95,
      potential_roles: ["Machine Learning Engineer (92%)", "Data Scientist (87%)"]
    },
    {
      id: 2,
      name: "Alex Rivera",
      email: "alex.rivera@talentflow.ai",
      current_role: "Data Analyst",
      department: "Analytics & BI",
      experience_years: 3.0,
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      top_skills: ["SQL", "Tableau", "Python", "Data Engineering"],
      profile_completeness: 88,
      potential_roles: ["Senior Data Scientist (88%)"]
    },
    {
      id: 3,
      name: "Marcus Chen",
      email: "marcus.chen@talentflow.ai",
      current_role: "Backend Engineer",
      department: "Core Platform",
      experience_years: 4.5,
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      top_skills: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
      profile_completeness: 90,
      potential_roles: ["Backend Lead (96%)"]
    }
  ]);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || 
                          emp.top_skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
    const matchesRole = roleFilter === 'All' || emp.current_role === roleFilter;
    return matchesSearch && matchesDept && matchesRole;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-rose-600 dark:text-rose-500" />
            <span>HR Employee Intelligence Directory</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse and inspect verified organizational talent profiles, skill completeness, and internal mobility readiness.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee by name, skills e.g. Python, SQL..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-semibold"
          >
            <option value="All">All Departments</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Analytics & BI">Analytics & BI</option>
            <option value="Core Platform">Core Platform</option>
          </select>
        </div>
      </div>

      {/* Directory Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEmployees.map(emp => (
          <div key={emp.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-md hover:border-rose-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <img src={emp.avatar_url} alt={emp.name} className="w-14 h-14 rounded-2xl object-cover border border-rose-500/40" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{emp.name}</h3>
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">{emp.current_role}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{emp.department} • {emp.experience_years} Yrs Exp</p>
                </div>
              </div>

              {/* Completeness Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <span>Profile Completeness</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{emp.profile_completeness}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${emp.profile_completeness}%` }}></div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Top Verified Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {emp.top_skills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/hr-profile"
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 mt-2"
            >
              <span>View Talent Profile</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {showAddModal && (
        <HRAddEmployeeModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};
