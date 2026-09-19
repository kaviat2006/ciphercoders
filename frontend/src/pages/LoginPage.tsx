import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, UserCheck, Building2, Linkedin, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'employee' | 'hr'>('employee');
  const [email, setEmail] = useState('employee@talentflow.demo');
  const [password, setPassword] = useState('Employee@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTabChange = (tab: 'employee' | 'hr') => {
    setActiveTab(tab);
    if (tab === 'employee') {
      setEmail('employee@talentflow.demo');
      setPassword('Employee@123');
    } else {
      setEmail('hr@talentflow.demo');
      setPassword('HR@123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password);
    if (success) {
      if (activeTab === 'hr') {
        navigate('/hr/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    } else {
      setError('Invalid credentials. Please use the provided demo login credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="w-full max-w-md space-y-6">
        {/* Logo Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/30 mb-2">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">TalentFlow <span className="text-rose-600 dark:text-rose-500">AI</span></h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            "Discover your potential. Find your next opportunity."
          </p>
        </div>

        {/* Card Wrapper */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          {/* Tab Selector */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <button
              onClick={() => handleTabChange('employee')}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === 'employee'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Employee Login</span>
            </button>
            <button
              onClick={() => handleTabChange('hr')}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === 'hr'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>HR Administrator</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {activeTab === 'employee' ? 'Employee Email' : 'HR Admin Email'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Authenticating...' : `Login as ${activeTab === 'employee' ? 'Employee' : 'HR Admin'}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Additional Options */}
          {activeTab === 'employee' && (
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => handleTabChange('employee')}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span>Continue with LinkedIn</span>
              </button>

              <Link
                to="/onboarding"
                className="w-full block text-center py-2.5 rounded-xl border border-rose-500/30 text-rose-600 dark:text-rose-400 font-bold text-xs hover:bg-rose-500/10 transition-all"
              >
                Create Employee Profile
              </Link>
            </div>
          )}

          {/* Demo Credentials Box */}
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
            <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Login Credentials</span>
            </span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              {activeTab === 'employee' ? (
                <>Email: <strong>employee@talentflow.demo</strong> | Password: <strong>Employee@123</strong></>
              ) : (
                <>Email: <strong>hr@talentflow.demo</strong> | Password: <strong>HR@123</strong></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
