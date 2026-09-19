import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FeedbackPage: React.FC = () => {
  const { activeEmployeeId } = useApp();
  const [useful, setUseful] = useState<boolean | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (useful === null) return;

    try {
      await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: activeEmployeeId,
          opportunity_id: 1,
          useful,
          feedback_text: feedbackText
        })
      });
    } catch (e) {}

    setSubmitted(true);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-indigo-400" />
          <span>Recommendation Feedback & Outcomes</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Help TalentFlow AI continuously calibrate recommendation quality and explainability.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-base font-bold text-white">
              Was the Machine Learning Engineer recommendation useful and accurate?
            </h2>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setUseful(true)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-2xl border font-bold text-xs transition-all ${
                  useful === true 
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-glow-emerald' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
                <span>Yes, Very Useful</span>
              </button>

              <button
                type="button"
                onClick={() => setUseful(false)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-2xl border font-bold text-xs transition-all ${
                  useful === false 
                    ? 'bg-rose-600 text-white border-rose-400 shadow-glow-emerald' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-rose-500/50'
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
                <span>No, Not Accurate</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Optional Feedback / Comments:
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell us how we can make internal opportunity recommendations even better..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={useful === null}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-glow-indigo transition-all disabled:opacity-50"
            >
              Submit Feedback
            </button>
          </form>
        ) : (
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Thank You for Your Feedback!</h3>
            <p className="text-xs text-slate-300">
              Your input has been recorded and aggregated to improve future recommendation precision across your organization.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
