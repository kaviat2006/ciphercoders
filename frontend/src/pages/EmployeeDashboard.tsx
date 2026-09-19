import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SkillBadge } from '../components/SkillBadge';
import { 
  Briefcase, 
  Sparkles, 
  RefreshCw, 
  Map, 
  Target, 
  Bot, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Github,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

export const EmployeeDashboard: React.FC = () => {
  const { profile, matches, pendingSyncCount, simulateFridayCommit } = useApp();
  const topMatch = matches[0];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <img 
            src={profile?.avatar_url}
            alt="Priya Sharma"
            className="w-16 h-16 rounded-2xl border-2 border-indigo-500/50 object-cover shadow-glow-indigo"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-white">Welcome back, {profile?.name || 'Priya Sharma'}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                AI Profile Active
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {profile?.current_role} • {profile?.department} ({profile?.experience_years} Yrs Exp)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Link
            to="/copilot"
            className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-200 text-xs font-semibold hover:bg-purple-600/30 transition-all"
          >
            <Bot className="w-4 h-4 text-purple-400" />
            <span>Ask Gemini Copilot</span>
          </Link>

          <Link
            to="/talent-sync"
            className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-glow-indigo hover:bg-indigo-500 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>TalentSync</span>
          </Link>
        </div>
      </div>

      {/* Pending TalentSync Notification Banner */}
      {pendingSyncCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-5 h-5 text-amber-400 animate-spin-slow shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-200">
                {pendingSyncCount} New TalentSync Signal Updates Detected
              </p>
              <p className="text-[11px] text-amber-300/80">
                GitHub & Resume parsers detected new skill evidence waiting for your approval.
              </p>
            </div>
          </div>
          <Link
            to="/history"
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-glow-amber shrink-0"
          >
            Review Updates
          </Link>
        </div>
      )}

      {/* Grid Section: Top Opportunity & AI Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Opportunity Match Card */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TOP AI MATCHED OPPORTUNITY</span>
              </span>
              {topMatch && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40">
                  {topMatch.match_score}% Match Score
                </span>
              )}
            </div>

            {topMatch ? (
              <>
                <h2 className="text-xl font-bold text-white">{topMatch.opportunity.title}</h2>
                <p className="text-xs text-slate-400">{topMatch.opportunity.department} • {topMatch.opportunity.description}</p>

                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-semibold text-slate-300">Matched Skills ({topMatch.matched_skills.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {topMatch.matched_skills.map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 text-xs font-medium border border-emerald-500/20 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{s}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p className="font-semibold text-indigo-300">AI Explanation:</p>
                  <p className="text-slate-400 leading-relaxed">{topMatch.ai_explanation}</p>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400">Loading opportunity matches...</p>
            )}
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <Link
              to="/why-recommended"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow-indigo transition-all"
            >
              Why Recommended?
            </Link>
            <Link
              to="/why-not-selected"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
            >
              Why Not Selected?
            </Link>
          </div>
        </div>

        {/* Quick Demo Continuous GitHub Monitoring Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Github className="w-4 h-4 text-white" />
              <span>Continuous GitHub Monitoring</span>
            </div>
            <h3 className="text-sm font-bold text-white">Simulate Friday Repository Sync</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Test continuous TalentSync signal detection. Simulates a new Friday commit containing an AI Recommendation System project.
            </p>
          </div>

          <button
            onClick={simulateFridayCommit}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-glow-indigo transition-all flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Simulate Friday Commit (3 New Signals)</span>
          </button>
        </div>
      </div>

      {/* Profile Skills Overview */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Verified Technical Skills & Evidence</h3>
            <p className="text-xs text-slate-400">Click inspect icon on any skill to review supporting evidence</p>
          </div>
          <Link to="/profile" className="text-xs text-indigo-400 hover:underline font-semibold flex items-center space-x-1">
            <span>View Full Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {profile?.skills.map((s) => (
            <SkillBadge
              key={s.id}
              name={s.name}
              category={s.category}
              confidence={s.confidence_score}
              type={s.skill_type}
              evidence={s.evidence}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
