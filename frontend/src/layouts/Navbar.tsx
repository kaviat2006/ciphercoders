import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { 
  BrainCircuit, 
  RefreshCw, 
  Bot, 
  Sun, 
  Moon, 
  Monitor, 
  LogOut, 
  Sliders, 
  UserCheck, 
  Building2,
  ChevronDown,
  Bell
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { profile, pendingSyncCount } = useApp();
  const { user, role, logout } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-4 lg:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl bg-rose-600 text-white shadow-lg shadow-rose-600/30">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  TalentFlow <span className="text-rose-600 dark:text-rose-500">AI</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Discover your potential. Find your next opportunity.
              </p>
            </div>
          </Link>
        </div>

        {/* Center - TalentSync & Gemini Copilot Quick Link */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/employee/talent-sync" 
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-all text-xs text-slate-700 dark:text-slate-300"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-spin-slow" />
            <span>TalentSync AI: <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active</span></span>
            {pendingSyncCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-bold border border-amber-500/40">
                {pendingSyncCount} New
              </span>
            )}
          </Link>

          <Link
            to="/employee/copilot"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:border-purple-500/60 transition-all"
          >
            <Bot className="w-3.5 h-3.5 text-purple-500" />
            <span>Gemini Copilot</span>
          </Link>
        </div>

        {/* Right - Theme Toggle, Role Badge & Profile Dropdown */}
        <div className="flex items-center space-x-3">
          {/* Theme Selector Button */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-rose-600 transition-colors"
              title="Toggle Theme"
            >
              {resolvedTheme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-xl space-y-1 text-xs z-50">
                <button
                  onClick={() => { setTheme('light'); setShowThemeMenu(false); }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl font-semibold ${theme === 'light' ? 'bg-rose-500/10 text-rose-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light Mode</span>
                </button>
                <button
                  onClick={() => { setTheme('dark'); setShowThemeMenu(false); }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl font-semibold ${theme === 'dark' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Dark Mode</span>
                </button>
                <button
                  onClick={() => { setTheme('system'); setShowThemeMenu(false); }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl font-semibold ${theme === 'system' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <Monitor className="w-3.5 h-3.5 text-sky-400" />
                  <span>System</span>
                </button>
              </div>
            )}
          </div>

          {/* Role Badge */}
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
            role === 'HR_ADMIN' 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
          }`}>
            {role === 'HR_ADMIN' ? 'HR Admin' : 'Employee'}
          </span>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <img
                src={profile?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"}
                alt="User"
                className="w-8 h-8 rounded-full object-cover border border-rose-500/40"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-xl space-y-1 text-xs z-50">
                <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-white leading-tight">{user?.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{user?.email}</p>
                </div>

                <Link
                  to="/employee/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
