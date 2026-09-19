import React from 'react';
import { useApp } from '../context/AppContext';
import { SkillBadge } from '../components/SkillBadge';
import { 
  User, 
  Sparkles, 
  ShieldCheck, 
  Github, 
  Linkedin, 
  Award, 
  BookOpen, 
  Code, 
  Briefcase,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const TalentProfile: React.FC = () => {
  const { profile } = useApp();

  const explicitSkills = profile?.skills.filter(s => s.skill_type === 'explicit') || [];
  const hiddenSkills = profile?.skills.filter(s => s.skill_type === 'hidden') || [];
  const transferableSkills = profile?.skills.filter(s => s.skill_type === 'transferable') || [];

  return (
    <div className="space-y-8">
      {/* Profile Header Header */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <img
            src={profile?.avatar_url}
            alt={profile?.name}
            className="w-20 h-20 rounded-2xl border-2 border-indigo-500/50 object-cover shadow-glow-indigo"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{profile?.name}</h1>
            <p className="text-sm text-indigo-400 font-medium">{profile?.current_role} • {profile?.department}</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">{profile?.bio}</p>

            <div className="flex items-center space-x-3 mt-3">
              <a href={profile?.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn Connected</span>
              </a>
              <a href={`https://github.com/${profile?.github_username}`} target="_blank" rel="noreferrer" className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors">
                <Github className="w-3.5 h-3.5 text-slate-100" />
                <span>GitHub Connected</span>
              </a>
            </div>
          </div>
        </div>

        <div className="text-right space-y-1 self-stretch md:self-auto border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
          <p className="text-xs text-slate-400">Total Validated Skills</p>
          <p className="text-3xl font-extrabold text-white">{profile?.skills.length || 0}</p>
          <p className="text-[10px] text-emerald-400 font-bold">100% Evidence Grounded</p>
        </div>
      </div>

      {/* Skills Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Explicit Skills */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Explicit Skills ({explicitSkills.length})</span>
          </div>
          <p className="text-xs text-slate-400">Declared in resume, titles, and certifications.</p>
          <div className="flex flex-wrap gap-2">
            {explicitSkills.map(s => (
              <SkillBadge key={s.id} name={s.name} category={s.category} confidence={s.confidence_score} type={s.skill_type} evidence={s.evidence} />
            ))}
          </div>
        </div>

        {/* Hidden / Inferred Skills */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/30 space-y-4 bg-emerald-950/10">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI Discovered Hidden Skills ({hiddenSkills.length})</span>
          </div>
          <p className="text-xs text-slate-400">Inferred from GitHub repo code, frameworks, and ML work.</p>
          <div className="flex flex-wrap gap-2">
            {hiddenSkills.map(s => (
              <SkillBadge key={s.id} name={s.name} category={s.category} confidence={s.confidence_score} type={s.skill_type} evidence={s.evidence} />
            ))}
          </div>
        </div>

        {/* Transferable Skills */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-amber-500/30 space-y-4 bg-amber-950/10">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Transferable Skills ({transferableSkills.length})</span>
          </div>
          <p className="text-xs text-slate-400">Competencies applicable across domain transitions.</p>
          <div className="flex flex-wrap gap-2">
            {transferableSkills.map(s => (
              <SkillBadge key={s.id} name={s.name} category={s.category} confidence={s.confidence_score} type={s.skill_type} evidence={s.evidence} />
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <Code className="w-5 h-5 text-indigo-400" />
          <span>Professional & GitHub Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile?.projects.map(p => (
            <div key={p.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{p.title}</h3>
                {p.repo_url && (
                  <a href={p.repo_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.technologies.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
