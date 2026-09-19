import React, { useState } from 'react';
import { EvidenceModal } from './EvidenceModal';
import { ShieldCheck, Sparkles, HelpCircle, Eye } from 'lucide-react';

interface SkillBadgeProps {
  name: string;
  category?: string;
  confidence: number;
  type: 'explicit' | 'hidden' | 'transferable' | string;
  evidence: string[];
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  category,
  confidence,
  type,
  evidence
}) => {
  const [showModal, setShowModal] = useState(false);

  const typeStyles = {
    explicit: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    hidden: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    transferable: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  }[type] || 'bg-slate-800 text-slate-300 border-slate-700';

  return (
    <>
      <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${typeStyles} group transition-all`}>
        <div className="flex items-center space-x-1.5">
          {type === 'hidden' && <Sparkles className="w-3 h-3 text-emerald-400" />}
          {type === 'explicit' && <ShieldCheck className="w-3 h-3 text-indigo-400" />}
          <span className="font-semibold text-slate-100">{name}</span>
        </div>

        <div className="flex items-center space-x-1 border-l border-slate-700/60 pl-2">
          <span className="text-[11px] font-bold opacity-90">{confidence}%</span>
          <button
            onClick={() => setShowModal(true)}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full transition-colors"
            title="View Supporting Evidence"
          >
            <Eye className="w-3 h-3" />
          </button>
        </div>
      </div>

      {showModal && (
        <EvidenceModal
          skillName={name}
          confidence={confidence}
          evidence={evidence}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
