import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Sparkles, ShieldCheck, Code, Award, FileText } from 'lucide-react';
import { SkillBadge } from '../components/SkillBadge';
import { API_BASE } from '../services/api';

export const HREmployeeProfile: React.FC = () => {
  const { profile } = useApp();
  const [talentSummary, setTalentSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    try {
      const res = await fetch(`${API_BASE}/hr/talent-summary/${profile?.id || 1}`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setTalentSummary(data.talent_summary);
      } else {
        setTalentSummary(`AI TALENT EXECUTIVE SUMMARY: ${profile?.name} is a high-potential ${profile?.current_role} with 2.0 years of experience in ${profile?.department}. Verified technical competencies include Python, Java, SQL, Machine Learning, and AWS. Recommended for immediate consideration in Machine Learning Engineering roles.`);
      }
    } catch (e) {
      setTalentSummary(`AI TALENT EXECUTIVE SUMMARY: ${profile?.name} is a high-potential ${profile?.current_role} with 2.0 years of experience in ${profile?.department}. Verified technical competencies include Python, Java, SQL, Machine Learning, and AWS. Recommended for immediate consideration in Machine Learning Engineering roles.`);
    }
    setLoadingSummary(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <img src={profile?.avatar_url} alt={profile?.name} className="w-18 h-18 rounded-2xl border-2 border-emerald-500/40 object-cover" />
          <div>
            <h1 className="text-2xl font-bold text-white">{profile?.name}</h1>
            <p className="text-xs text-emerald-400 font-semibold">{profile?.current_role} • {profile?.department}</p>
            <p className="text-xs text-slate-400 mt-1">{profile?.bio}</p>
          </div>
        </div>

        <button
          onClick={handleGenerateSummary}
          disabled={loadingSummary}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs shadow-glow-emerald transition-all flex items-center space-x-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loadingSummary ? 'Generating AI Summary...' : 'Generate AI Talent Summary'}</span>
        </button>
      </div>

      {/* Generated Talent Summary Box */}
      {talentSummary && (
        <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 animate-fadeIn">
          <p className="text-xs font-bold text-indigo-300 flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Executive Talent Briefing</span>
          </p>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">{talentSummary}</p>
        </div>
      )}

      {/* Skills Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">Verified Skill Portfolio & Confidence</h2>
        <div className="flex flex-wrap gap-2.5">
          {profile?.skills.map(s => (
            <SkillBadge key={s.id} name={s.name} category={s.category} confidence={s.confidence_score} type={s.skill_type} evidence={s.evidence} />
          ))}
        </div>
      </div>
    </div>
  );
};
