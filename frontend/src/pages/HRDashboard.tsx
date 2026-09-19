import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { BarChart3, Users, Briefcase, Target, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export const HRDashboard: React.FC = () => {
  const skillDist = [
    { category: "AI & ML", count: 18 },
    { category: "Backend Eng", count: 24 },
    { category: "Cloud Arch", count: 14 },
    { category: "Data Analytics", count: 22 },
    { category: "DevOps & MLOps", count: 9 },
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>CORE MODULE 12 — HR INTELLIGENCE DASHBOARD</span>
        </div>
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-emerald-400" />
          <span>Organizational Talent Intelligence</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time workforce skill distribution, internal mobility metrics, active skill gaps, and recommendation analytics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Total Employees Profiled</p>
          <p className="text-3xl font-extrabold text-white">42</p>
          <p className="text-[10px] text-emerald-400 font-bold">100% AI Dynamic Profiled</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Open Internal Opportunities</p>
          <p className="text-3xl font-extrabold text-white">12</p>
          <p className="text-[10px] text-indigo-400 font-bold">Jobs, Projects & Teams</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Active Organizational Gaps</p>
          <p className="text-3xl font-extrabold text-amber-400">14</p>
          <p className="text-[10px] text-amber-300 font-bold">MLOps & Cloud Container Gaps</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Internal Mobility Moves</p>
          <p className="text-3xl font-extrabold text-emerald-400">8</p>
          <p className="text-[10px] text-emerald-300 font-bold">Successful Transitions</p>
        </div>
      </div>

      {/* Recharts Skill Distribution Graph */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">Workforce Skill Category Distribution</h2>
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillDist} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="category" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]}>
                {skillDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
