import React, { useState } from 'react';
import { Linkedin, X, CheckCircle2, AlertTriangle, RefreshCw, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LinkedInConnectModalProps {
  onClose: () => void;
}

export const LinkedInConnectModal: React.FC<LinkedInConnectModalProps> = ({ onClose }) => {
  const { profile, activeEmployeeId, refreshData } = useApp();
  const [linkedinUrl, setLinkedinUrl] = useState(profile?.linkedin_url || 'https://www.linkedin.com/in/priya-sharma-demo');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(profile?.linkedin_url ? true : false);

  const handleConnectDemo = async () => {
    setIsConnecting(true);
    try {
      await fetch(`/api/auth/linkedin/demo-connect?employee_id=${activeEmployeeId}`, { method: 'POST' });
      await refreshData();
      setConnected(true);
    } catch (e) {}
    setIsConnecting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5 text-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Linkedin className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-bold">LinkedIn Professional Integration</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* URL Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">LinkedIn Profile URL</label>
          <input
            type="text"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white"
          />
        </div>

        {/* OAuth Warning / Fallback Callout */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-200 space-y-1">
          <p className="font-bold flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>LinkedIn OAuth Status</span>
          </p>
          <p className="text-[11px] leading-relaxed opacity-90">
            LinkedIn OAuth is not configured in this environment (LINKEDIN_CLIENT_ID missing). Use the authorized synthetic demo connection below to test TalentSync integration safely without scraping.
          </p>
        </div>

        {/* Demo Connection Button */}
        {!connected ? (
          <button
            onClick={handleConnectDemo}
            disabled={isConnecting}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Linkedin className="w-4 h-4" />
            <span>{isConnecting ? 'Connecting Demo Profile...' : 'Use Demo LinkedIn Profile'}</span>
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>LinkedIn Connected ✓</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Headline: <strong>Software Developer | AI & Cloud Enthusiast</strong>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              New skill <strong>TensorFlow</strong> extracted and added to TalentSync pending review queue.
            </p>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
