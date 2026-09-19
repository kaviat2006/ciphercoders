import React, { useState } from 'react';
import { Search, Filter, UserCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HRTalentSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('Python + Machine Learning + AWS');
  const [selectedDept, setSelectedDept] = useState('All');

  const sampleResults = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Software Developer",
      dept: "Software Engineering",
      exp: 2.0,
      skills: ["Python", "Java", "SQL", "Machine Learning", "AWS"],
      match: 100,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      topMatchRole: "Machine Learning Engineer (92% Match)"
    },
    {
      id: 2,
      name: "Alex Rivera",
      role: "Data Analyst",
      dept: "Analytics & BI",
      exp: 3.0,
      skills: ["SQL", "Tableau", "Python", "Data Engineering"],
      match: 67,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      topMatchRole: "Senior Data Scientist (88% Match)"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Search className="w-6 h-6 text-emerald-400" />
          <span>HR Internal Talent Search Engine</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Search internal talent by technical skills, verified GitHub evidence, experience, and department.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills e.g. Python + Machine Learning + AWS"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow-emerald transition-all">
            Search Talent
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Matching Employee Talent Profiles ({sampleResults.length})</h2>

        <div className="space-y-4">
          {sampleResults.map(emp => (
            <div key={emp.id} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center space-x-4">
                <img src={emp.avatar} alt={emp.name} className="w-14 h-14 rounded-2xl object-cover border border-emerald-500/40" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-white">{emp.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-500/30">
                      {emp.match}% Skill Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{emp.role} • {emp.dept} ({emp.exp} Yrs Exp)</p>
                  <p className="text-xs font-semibold text-indigo-300 mt-1">Top Potential Role: {emp.topMatchRole}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <Link
                  to="/hr-profile"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center space-x-1"
                >
                  <span>View HR Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
