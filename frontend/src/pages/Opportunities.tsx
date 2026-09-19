import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Filter,
  Layers,
  HelpCircle
} from 'lucide-react';

export const Opportunities: React.FC = () => {
  const { matches } = useApp();
  const [filterType, setFilterType] = useState<string>('All');

  const filteredMatches = matches.filter(m => {
    if (filterType === 'All') return true;
    return m.opportunity.opportunity_type.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-indigo-400" />
            <span>Internal Role & Opportunity Matching</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Matched against your verified technical skills, GitHub project evidence, and experience.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          {['All', 'Job', 'Project', 'Team'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterType === type ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Callout */}
      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-center justify-between text-xs text-indigo-200">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Scoring Formula:</strong> Match Score = (Weighted Matched Requirements / Weighted Total Requirements) × 100%
          </span>
        </div>
        <span className="text-[11px] text-indigo-300 font-mono">100% Transparent & Explainable</span>
      </div>

      {/* Opportunity Cards List */}
      <div className="space-y-4">
        {filteredMatches.map((m) => {
          const isHighMatch = m.match_score >= 80;
          return (
            <div
              key={m.opportunity.id}
              className={`p-6 rounded-2xl bg-slate-900/70 border transition-all ${
                isHighMatch ? 'border-emerald-500/40 hover:border-emerald-500/70' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                      isHighMatch 
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {m.match_score}% Match Score
                    </span>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {m.opportunity.department} • {m.opportunity.opportunity_type}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white">{m.opportunity.title}</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">{m.opportunity.description}</p>

                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                    <div>
                      <span className="text-slate-400">Required Skills: </span>
                      <span className="text-slate-200 font-semibold">{m.opportunity.required_skills.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Req Exp: </span>
                      <span className="text-slate-200 font-semibold">{m.opportunity.required_experience_years} Yrs</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 self-stretch md:self-auto shrink-0 pt-2 md:pt-0">
                  <Link
                    to="/why-recommended"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-glow-indigo transition-all text-center"
                  >
                    Why Recommended?
                  </Link>

                  <Link
                    to="/why-not-selected"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all text-center"
                  >
                    Why Not Selected?
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
