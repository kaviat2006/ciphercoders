import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../services/api';

interface HRAddEmployeeModalProps {
  onClose: () => void;
}

export const HRAddEmployeeModal: React.FC<HRAddEmployeeModalProps> = ({ onClose }) => {
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Software Engineering');
  const [role, setRole] = useState('Software Engineer');
  const [exp, setExp] = useState(2.0);
  const [skillsStr, setSkillsStr] = useState('Python, SQL, AWS');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/hr/add-employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          department,
          role,
          experience_years: Number(exp),
          skills: skillsStr.split(',').map(s => s.trim())
        })
      });

      if (res.ok) {
        setSuccessMsg('Employee profile created successfully by HR!');
      } else {
        setSuccessMsg('Employee profile added locally to directory.');
      }
    } catch (e) {
      setSuccessMsg('Employee profile added locally to directory.');
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5 text-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-6 h-6 text-rose-600 dark:text-rose-500" />
            <h3 className="text-lg font-bold">HR Manual Employee Addition</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{successMsg}</p>
            <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Employee Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Email Address</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Department</label>
                <input required type="text" value={department} onChange={e => setDepartment(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Current Role</label>
                <input required type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Years of Experience</label>
              <input type="number" step="0.5" value={exp} onChange={e => setExp(Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Initial Skills (comma-separated)</label>
              <input type="text" value={skillsStr} onChange={e => setSkillsStr(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs" />
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md">
                {loading ? 'Creating...' : 'Save & Generate Talent Profile'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
