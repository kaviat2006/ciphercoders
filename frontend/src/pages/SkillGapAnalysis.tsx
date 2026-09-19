import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Target, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Award, 
  Code, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const SkillGapAnalysis: React.FC = () => {
  const { profile } = useApp();
  const [selectedTargetRole, setSelectedTargetRole] = useState('Machine Learning Engineer');

  const gapMatrix = [
    { skill: 'Python', current: 'Level 4 (Advanced)', required: 'Level 4 (Advanced)', status: 'Matched', type: 'Current Strength' },
    { skill: 'Machine Learning', current: 'Level 4 (Advanced)', required: 'Level 4 (Advanced)', status: 'Matched', type: 'Current Strength' },
    { skill: 'SQL', current: 'Level 4 (Advanced)', required: 'Level 3 (Intermediate)', status: 'Matched', type: 'Current Strength' },
    { skill: 'AWS', current: 'Level 3 (Certified)', required: 'Level 3 (Intermediate)', status: 'Matched', type: 'Current Strength' },
    { skill: 'Docker', current: 'Level 2 (Basic)', required: 'Level 4 (Advanced)', status: 'Gap', action: 'Docker & Container Mastery Course' },
    { skill: 'Kubernetes', current: 'Level 1 (Novice)', required: 'Level 3 (Intermediate)', status: 'Gap', action: 'Kubernetes Hands-on Lab' },
    { skill: 'MLOps', current: 'Level 1 (Novice)', required: 'Level 4 (Advanced)', status: 'Gap', action: 'MLOps & Pipeline Architecture Track' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Target className="w-6 h-6 text-indigo-400" />
            <span>Target Role Skill Gap Analysis</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compare your verified skill matrix against required target position benchmarks.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
          <span className="text-xs text-slate-400 font-semibold px-2">Target Role:</span>
          <select
            value={selectedTargetRole}
            onChange={(e) => setSelectedTargetRole(e.target.value)}
            className="bg-slate-950 border border-indigo-500/40 text-white font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-none"
          >
            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            <option value="Senior Data Scientist">Senior Data Scientist</option>
            <option value="AI Solutions Architect">AI Solutions Architect</option>
          </select>
        </div>
      </div>

      {/* Skill Gap Table Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">Skill Competency Comparison Matrix</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Skill</th>
                <th className="pb-3 font-semibold">Current Employee Level</th>
                <th className="pb-3 font-semibold">Required Target Level</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Recommended AI Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {gapMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 font-bold text-white">{item.skill}</td>
                  <td className="py-3.5 text-slate-300">{item.current}</td>
                  <td className="py-3.5 text-slate-300">{item.required}</td>
                  <td className="py-3.5">
                    {item.status === 'Matched' ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center w-fit space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Matched</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 flex items-center w-fit space-x-1">
                        <XCircle className="w-3 h-3" />
                        <span>Skill Gap</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-slate-400 italic">
                    {item.action || 'Sustain current high proficiency'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Learning Action Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Personalized Learning & Skill Building Recommendations</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-indigo-500/10 text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Docker & Container Mastery</h3>
            <p className="text-xs text-slate-400">Internal Course • 15 Hours</p>
            <p className="text-xs text-slate-300 leading-relaxed">Fills Docker skill gap from Level 2 to Level 4.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-purple-500/10 text-purple-400">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Containerized ML API Project</h3>
            <p className="text-xs text-slate-400">Practical Project • 3 Weeks</p>
            <p className="text-xs text-slate-300 leading-relaxed">Package Fraud Detection API with Docker & FastAPI.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-emerald-500/10 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">MLOps Architecture Track</h3>
            <p className="text-xs text-slate-400">Internal Certification • 4 Weeks</p>
            <p className="text-xs text-slate-300 leading-relaxed">Fills MLOps gap with MLflow and automated pipelines.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
