import React from 'react';
import { X, CheckCircle, ShieldAlert, FileText, Github, Linkedin, Award } from 'lucide-react';

interface EvidenceModalProps {
  skillName: string;
  confidence: number;
  evidence: string[];
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  skillName,
  confidence,
  evidence,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              WHY WAS THIS SKILL DETECTED?
            </span>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2 mt-0.5">
              <span>{skillName}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                {confidence}% Confidence
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-slate-400 font-medium">
            TalentFlow AI detected this skill through verified evidence across connected professional sources:
          </p>

          <div className="space-y-2">
            {evidence && evidence.length > 0 ? (
              evidence.map((ev, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200 leading-relaxed">{ev}</span>
                </div>
              ))
            ) : (
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
                Extracted from explicit profile declarations and resume technical keywords.
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow-indigo transition-all"
          >
            Close Evidence Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};
