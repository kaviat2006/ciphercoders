import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  CheckCircle2, 
  Code, 
  Award, 
  Briefcase, 
  ShieldCheck, 
  ArrowLeft,
  BookOpen
} from 'lucide-react';

export const WhyRecommended: React.FC = () => {
  const { matches, profile } = useApp();
  const match = matches[0]; // Top recommendation

  if (!match) {
    return <div className="p-8 text-center text-slate-400">Loading recommendation breakdown...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/opportunities" className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Opportunities</span>
      </Link>

      {/* Hero Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-emerald-500/40 space-y-4 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40">
              CORE MODULE 4 — WHY THIS RECOMMENDATION?
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">{match.opportunity.title}</h1>
            <p className="text-xs text-slate-400">{match.opportunity.department} • {match.opportunity.description}</p>
          </div>

          <div className="text-right p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
            <span className="text-xs text-slate-400 font-semibold block">MATCH ALIGNMENT</span>
            <span className="text-4xl font-extrabold text-emerald-400">{match.match_score}%</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
          <p className="text-xs font-bold text-indigo-300 flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4" />
            <span>AI Evidence Explanation</span>
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">{match.ai_explanation}</p>
        </div>
      </div>

      {/* Grid: Matched Criteria & Supporting Evidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Matched Core Skills ({match.matched_skills.length})</span>
          </h2>
          <div className="space-y-2">
            {match.matched_skills.map(s => (
              <div key={s} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <span className="font-bold text-slate-100">{s}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                  Verified Match
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Projects */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <Code className="w-4 h-4 text-indigo-400" />
            <span>Relevant Projects ({match.relevant_projects.length})</span>
          </h2>
          <div className="space-y-2">
            {match.relevant_projects.map(p => (
              <div key={p} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-200">
                ✓ {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supporting Evidence Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span>Supporting Evidence Breakdown</span>
        </h2>
        <div className="space-y-2">
          {match.supporting_evidence.map((ev, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{ev}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
