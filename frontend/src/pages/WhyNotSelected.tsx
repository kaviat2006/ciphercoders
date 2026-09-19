import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  AlertCircle, 
  HelpCircle, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Target, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const WhyNotSelected: React.FC = () => {
  const { matches } = useApp();
  // Find a role where match score is moderate/not 100% (e.g., Senior Data Scientist or AI Architect)
  const match = matches.find(m => m.match_score < 85) || matches[1] || matches[0];

  if (!match) {
    return <div className="p-8 text-center text-slate-400">Loading alignment breakdown...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/opportunities" className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Opportunities</span>
      </Link>

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-950 border border-amber-500/40 space-y-4 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/40">
              CORE MODULE 5 — WHY NOT CURRENTLY SELECTED?
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">{match.opportunity.title}</h1>
            <p className="text-xs text-slate-400">{match.opportunity.department} • {match.opportunity.description}</p>
          </div>

          <div className="text-right p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30">
            <span className="text-xs text-slate-400 font-semibold block">CURRENT ALIGNMENT</span>
            <span className="text-4xl font-extrabold text-amber-400">{match.match_score}%</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
          <p className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
            <AlertCircle className="w-4 h-4" />
            <span>Neutral Data-Grounded Alignment Analysis</span>
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            {match.ai_explanation}
          </p>
        </div>
      </div>

      {/* Grid: Missing Criteria Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Required Skills */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>Missing Criteria & Skill Gaps</span>
          </h2>
          <div className="space-y-2">
            {match.missing_skills.map(s => (
              <div key={s} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-rose-500/20 text-xs">
                <span className="font-bold text-slate-200">{s}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">
                  Currently Missing
                </span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
            <span className="text-slate-400 block">Experience Requirement:</span>
            <span className="text-slate-200 font-semibold">
              Required: {match.required_experience} Yrs • Current: {match.current_experience} Yrs
            </span>
          </div>
        </div>

        {/* Actionable How To Improve Roadmap */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <Target className="w-4 h-4 text-indigo-400" />
            <span>HOW TO IMPROVE YOUR MATCH SCORE</span>
          </h2>

          <div className="space-y-3">
            {(match.improvement_plan || [
              "1. Complete Docker & Containerization Learning Track",
              "2. Build a practical containerized ML Deployment Project",
              "3. Learn MLOps pipelines and experiment tracking",
              "4. Gain hands-on project experience under internal mentorship"
            ]).map((step, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/70 border border-indigo-500/20 text-xs">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-slate-200 leading-relaxed">{step}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/roadmap"
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-glow-indigo transition-all"
            >
              <span>Launch Personalized Career Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
