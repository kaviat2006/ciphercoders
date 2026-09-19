import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  BrainCircuit, 
  ShieldCheck, 
  Target, 
  RefreshCw, 
  ArrowRight, 
  UserCheck, 
  Building2, 
  Search,
  CheckCircle2,
  TrendingUp,
  Map
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setPersona } = useApp();

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-950 border border-indigo-500/20 p-8 md:p-14 overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI × Internal Talent Discovery Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Discover your potential. <br />
            <span className="gradient-text">Find your next opportunity.</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            TalentFlow AI continuously updates employee talent profiles from real work, GitHub activity, and professional signals to match internal jobs, projects, and career roadmaps with explainable AI precision.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/dashboard"
              onClick={() => setPersona('employee')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-glow-indigo transition-all transform hover:-translate-y-0.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Explore Employee Experience</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/hr-dashboard"
              onClick={() => setPersona('hr')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-200 font-semibold text-sm transition-all transform hover:-translate-y-0.5"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Open HR Intelligence</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Core Capabilities */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white">Continuous AI Talent Intelligence</h2>
          <p className="text-sm text-slate-400 mt-1">
            Bridging employee potential and organizational mobility without outdated static resumes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all">
            <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">TalentSync AI Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Continuously retrieves professional signals from GitHub commits, learning platforms, and credentials. Approves updates with human-in-the-loop control.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Explainable Matching</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clear mathematical matching formula detailing exact skill alignments, missing criteria, and data-grounded guidance on <strong>Why Not Currently Selected</strong>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all">
            <div className="p-3 w-fit rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Roadmaps & Copilot</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive step-by-step career roadmaps paired with Gemini Career Copilot for personalized learning, gap closing, and internal mobility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
