import React, { useState } from 'react';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Sun, 
  Moon, 
  Monitor, 
  User, 
  ShieldCheck, 
  Github, 
  Linkedin, 
  KeyRound, 
  LogOut, 
  CheckCircle2,
  Sliders,
  Sparkles
} from 'lucide-react';
import { LinkedInConnectModal } from '../components/LinkedInConnectModal';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Sliders className="w-6 h-6 text-rose-600 dark:text-rose-500" />
          <span>System & Account Settings</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage appearance themes, authenticated profile information, connected sources, and security preferences.
        </p>
      </div>

      {/* 1. Appearance Theme Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Sun className="w-5 h-5 text-amber-500" />
          <span>Appearance Mode</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Choose your preferred interface theme. Selected theme persists across refreshes.
        </p>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <button
            onClick={() => setTheme('light')}
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 text-xs font-bold transition-all ${
              theme === 'light'
                ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 shadow-md'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <Sun className="w-6 h-6 text-amber-500" />
            <span>Light Mode</span>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 text-xs font-bold transition-all ${
              theme === 'dark'
                ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 shadow-md'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <Moon className="w-6 h-6 text-indigo-400" />
            <span>Dark Mode</span>
          </button>

          <button
            onClick={() => setTheme('system')}
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 text-xs font-bold transition-all ${
              theme === 'system'
                ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 shadow-md'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <Monitor className="w-6 h-6 text-sky-400" />
            <span>System Preference</span>
          </button>
        </div>
      </div>

      {/* 2. Account Information */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <User className="w-5 h-5 text-rose-600 dark:text-rose-500" />
          <span>Account Profile</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 dark:text-slate-400 font-semibold block">Full Name</span>
            <span className="text-slate-900 dark:text-white font-bold text-sm block">{user?.name}</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 dark:text-slate-400 font-semibold block">Email Address</span>
            <span className="text-slate-900 dark:text-white font-bold text-sm block">{user?.email}</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 dark:text-slate-400 font-semibold block">Application Role</span>
            <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold text-xs inline-block">
              {user?.role === 'HR_ADMIN' ? 'HR Administrator' : 'Employee User'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Connected Accounts */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Connected Professional Sources</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Github className="w-5 h-5 text-slate-900 dark:text-white" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">GitHub API</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Code signal ingestion active</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Connected ✓</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Linkedin className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">LinkedIn OAuth / Demo</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">OpenID Connect & Demo Fallback</p>
              </div>
            </div>
            <button
              onClick={() => setShowLinkedInModal(true)}
              className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            >
              Configure
            </button>
          </div>
        </div>
      </div>

      {/* 4. Security & Logout */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-rose-600 dark:text-rose-500" />
          <span>Security & Authentication</span>
        </h2>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={logout}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        </div>
      </div>

      {showLinkedInModal && <LinkedInConnectModal onClose={() => setShowLinkedInModal(false)} />}
    </div>
  );
};
