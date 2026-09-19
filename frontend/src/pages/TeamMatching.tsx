import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const TeamMatching: React.FC = () => {
  const teams = [
    {
      name: "AI Research & Intelligence Team",
      department: "AI Research",
      score: 91,
      matched_skills: ["Python", "Machine Learning", "AWS", "XGBoost"],
      reason: "High alignment with Fraud Detection & ML recommendation project evidence.",
      members: 8,
      lead: "Dr. Aris Vance"
    },
    {
      name: "Data Science & Predictive Analytics",
      department: "Analytics",
      score: 88,
      matched_skills: ["Python", "SQL", "Scikit-learn"],
      reason: "Proven data analysis, feature engineering, and relational query optimization.",
      members: 12,
      lead: "Sarah Jenkins"
    },
    {
      name: "Cloud Infrastructure & DevOps",
      department: "Infrastructure",
      score: 76,
      matched_skills: ["AWS", "Docker"],
      reason: "AWS Certified Practitioner baseline with active Docker containerization track.",
      members: 10,
      lead: "Michael Chang"
    },
    {
      name: "Core Backend Payments Platform",
      department: "Core Engineering",
      score: 72,
      matched_skills: ["Java", "SQL"],
      reason: "Strong backend programming skills and PostgreSQL relational database expertise.",
      members: 15,
      lead: "David Miller"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Users className="w-6 h-6 text-indigo-400" />
          <span>Internal Team Matching</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Discover cross-functional internal teams aligned with your technical capabilities and project background.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="space-y-4">
        {teams.map((t, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40">
                    {t.score}% Team Fit Score
                  </span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">{t.department} • {t.members} Members</span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1">{t.name}</h2>
                <p className="text-xs text-slate-300">Lead: <strong className="text-white">{t.lead}</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <p className="text-xs font-bold text-indigo-300 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Why this team?</span>
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">{t.reason}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {t.matched_skills.map(s => (
                  <span key={s} className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-xs font-medium border border-emerald-500/20 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
