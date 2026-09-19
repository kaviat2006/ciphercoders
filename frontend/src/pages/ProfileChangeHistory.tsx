import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { 
  History, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Loader2,
  AlertCircle
} from 'lucide-react';

export const ProfileChangeHistory: React.FC = () => {
  const { syncUpdates, refreshData, approveAllUpdates, activeEmployeeId } = useApp();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [isApprovingAll, setIsApprovingAll] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleReview = async (id: number, approved: boolean) => {
    setLoadingId(id);
    const success = await api.processSyncReview(id, approved);
    if (success) {
      await refreshData();
      showToast('success', `Signal ${approved ? 'approved' : 'rejected'} successfully. Profile updated!`);
    } else {
      showToast('error', 'Failed to update signal status. Please try again.');
    }
    setLoadingId(null);
  };

  const handleApproveAll = async () => {
    setIsApprovingAll(true);
    await approveAllUpdates();
    showToast('success', 'All pending signals approved successfully!');
    setIsApprovingAll(false);
  };

  const pendingUpdates = syncUpdates.filter(u => u.status === 'PENDING');
  const historyUpdates = syncUpdates.filter(u => u.status !== 'PENDING');

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toast && (
        <div className={`p-4 rounded-2xl border text-xs font-semibold flex items-center space-x-2 animate-fadeIn ${
          toast.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <History className="w-6 h-6 text-indigo-400" />
            <span>Profile Change History & Review Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Human-in-the-loop validation: Review AI-detected skill signals before official profile updating.
          </p>
        </div>

        {pendingUpdates.length > 0 && (
          <button
            onClick={handleApproveAll}
            disabled={isApprovingAll}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow-emerald transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {isApprovingAll ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>{isApprovingAll ? 'Approving All...' : `Approve All Pending (${pendingUpdates.length})`}</span>
          </button>
        )}
      </div>

      {/* Pending Approval Queue */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-amber-300 flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>Pending Review ({pendingUpdates.length})</span>
        </h2>

        {pendingUpdates.length > 0 ? (
          <div className="space-y-3">
            {pendingUpdates.map((item) => {
              const isProcessing = loadingId === item.id;
              return (
                <div key={item.id} className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                        PENDING REVIEW
                      </span>
                      <span className="text-xs text-slate-400">Source: <strong className="text-slate-200">{item.source}</strong></span>
                      <span className="text-xs text-slate-400">• Confidence: <strong className="text-emerald-400">{item.confidence}%</strong></span>
                    </div>

                    <h3 className="text-sm font-bold text-white">{item.update_title}</h3>

                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold text-indigo-300">Supporting Evidence:</p>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5">
                        {item.evidence.map((ev, i) => (
                          <li key={i}>{ev}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end md:self-auto shrink-0">
                    <button
                      onClick={() => handleReview(item.id, true)}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow-emerald transition-all flex items-center space-x-1.5 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Approve</span>
                      )}
                    </button>
                    <button
                      onClick={() => handleReview(item.id, false)}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-300 font-bold text-xs transition-all disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
            No pending updates. Your talent profile is fully up to date!
          </div>
        )}
      </div>

      {/* Historical Updates */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Processed Signal History ({historyUpdates.length})</h2>
        {historyUpdates.length > 0 ? (
          <div className="space-y-3">
            {historyUpdates.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  {item.status === 'APPROVED' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <p className="font-bold text-white">{item.update_title}</p>
                    <p className="text-[11px] text-slate-400">{item.source} • {item.confidence}% Confidence</p>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                  item.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
            No processed signals yet.
          </div>
        )}
      </div>
    </div>
  );
};
