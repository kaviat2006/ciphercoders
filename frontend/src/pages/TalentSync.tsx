import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  RefreshCw, 
  Github, 
  Linkedin, 
  FileText, 
  Award, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sliders,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TalentSync: React.FC = () => {
  const { profile, syncUpdates, pendingSyncCount, simulateFridayCommit, refreshData } = useApp();
  const [syncFrequency, setSyncFrequency] = useState(profile?.sync_frequency || 'Weekly');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncNow = async () => {
    setIsSyncing(true);
    await refreshData();
    setTimeout(() => setIsSyncing(false), 800);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>CORE MODULE 2 — TALENTSYNC AI</span>
          </div>
          <h1 className="text-2xl font-bold text-white">TalentSync AI Engine</h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Employee profiles evolve continuously. TalentSync safely ingests authorized data from GitHub, LinkedIn, and credentials, queuing pending changes for human approval.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSyncNow}
            disabled={isSyncing}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow-indigo transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>

          <Link
            to="/history"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all"
          >
            <span>Review Updates ({pendingSyncCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Sync Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Last Synchronized</p>
          <p className="text-base font-bold text-white flex items-center space-x-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Today, 10:14 AM</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Scheduled Frequency</p>
          <select
            value={syncFrequency}
            onChange={(e) => setSyncFrequency(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-white text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-indigo-500"
          >
            <option value="Daily">Daily Sync</option>
            <option value="Weekly">Weekly Sync</option>
            <option value="Monthly">Monthly Sync</option>
            <option value="Manual">Manual Only</option>
          </select>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Connected Sources</p>
          <p className="text-base font-bold text-white">4 Active Sources</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-amber-500/30 space-y-1 bg-amber-950/10">
          <p className="text-xs text-amber-300 font-medium">New Updates Detected</p>
          <p className="text-base font-extrabold text-amber-400">{pendingSyncCount} Pending Signals</p>
        </div>
      </div>

      {/* Connected Sources Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Connected Professional Sources</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-slate-800 text-slate-100">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">GitHub API Integration</h3>
                <p className="text-xs text-slate-400">Username: @{profile?.github_username}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                  Official API • Syncing Repos & Code Signals
                </span>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-bold">Connected</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">LinkedIn Integration (Demo API)</h3>
                <p className="text-xs text-slate-400">Authorized OAuth Abstraction</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                  Synthetic Demo Data • No Scraping
                </span>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-bold">Connected</span>
          </div>
        </div>
      </div>

      {/* Continuous GitHub Update Demo Trigger */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Interactive Demo: Continuous Friday GitHub Commit</span>
          </h3>
          <p className="text-xs text-slate-400">
            Simulates a new Friday commit detecting 3 new professional signals (Recommendation Systems, Scikit-learn, Model Evaluation).
          </p>
        </div>

        <button
          onClick={simulateFridayCommit}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-glow-indigo transition-all shrink-0"
        >
          Simulate Friday Commit
        </button>
      </div>
    </div>
  );
};
