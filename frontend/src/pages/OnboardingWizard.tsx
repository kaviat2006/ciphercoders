import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  Code, 
  Award, 
  Link as LinkIcon, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../services/api';

export const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const { setUserSession } = useAuth();
  const [step, setStep] = useState(1);

  // Form State
  const [fullName, setFullName] = useState('Priya Sharma');
  const [email, setEmail] = useState('priya.sharma@talentflow.ai');
  const [password, setPassword] = useState('Employee@123');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [location, setLocation] = useState('San Francisco, CA');

  const [currentRole, setCurrentRole] = useState('Software Developer');
  const [department, setDepartment] = useState('Software Engineering');
  const [experienceYears, setExperienceYears] = useState(2.0);
  const [careerGoal, setCareerGoal] = useState('Machine Learning Engineer');

  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(['Python', 'Java', 'SQL', 'Machine Learning', 'AWS']);

  const [projTitle, setProjTitle] = useState('Fraud Detection System');
  const [projDesc, setProjDesc] = useState('Financial anomaly transaction scoring using XGBoost & Python');
  const [projTechs, setProjTechs] = useState('Python, XGBoost, SQL');

  const [certName, setCertName] = useState('AWS Certified Cloud Practitioner');
  const [certIssuer, setCertIssuer] = useState('Amazon Web Services');

  const [githubUrl, setGithubUrl] = useState('https://github.com/priyasharma-dev');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/priya-sharma-demo');

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (s: string) => {
    setSkills(skills.filter(k => k !== s));
  };

  const handleNext = () => {
    if (step < 7) {
      setStep(step + 1);
    }
  };

  const handleFinish = async () => {
    try {
      await fetch(`${API_BASE}/auth/register-employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          phone,
          location,
          current_role: currentRole,
          department,
          experience_years: Number(experienceYears),
          career_goal: careerGoal,
          github_url: githubUrl,
          linkedin_url: linkedinUrl,
          skills,
          projects: [{ title: projTitle, description: projDesc, technologies: projTechs.split(',').map(s=>s.trim()) }],
          certifications: [{ name: certName, issuer: certIssuer, year: '2024' }]
        })
      });
    } catch (e) {}

    setUserSession({
      id: 1,
      name: fullName,
      email,
      role: 'EMPLOYEE',
      employee_id: 1
    }, 'onboarded_token');

    navigate('/employee/dashboard');
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center transition-colors">
      <div className="w-full max-w-2xl space-y-6">
        {/* Wizard Header Progress Bar */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EMPLOYEE SELF-ONBOARDING WIZARD</span>
          </div>
          <h1 className="text-2xl font-bold">Step {step} of 7: {
            step === 1 ? 'Personal Information' :
            step === 2 ? 'Professional Experience' :
            step === 3 ? 'Skills & Projects' :
            step === 4 ? 'Certifications & Learning' :
            step === 5 ? 'Professional Profiles' :
            step === 6 ? 'AI Profile Generation' :
            'Profile Review & Completeness'
          }</h1>

          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-rose-600 h-full transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Wizard Card Body */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-base font-bold text-rose-600 dark:text-rose-400">STEP 1: Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-base font-bold text-rose-600 dark:text-rose-400">STEP 2: Professional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Current Role</label>
                  <input type="text" value={currentRole} onChange={e => setCurrentRole(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Department</label>
                  <input type="text" value={department} onChange={e => setDepartment(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Years of Experience</label>
                  <input type="number" step="0.5" value={experienceYears} onChange={e => setExperienceYears(Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Career Goal / Target Role</label>
                  <input type="text" value={careerGoal} onChange={e => setCareerGoal(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-base font-bold text-rose-600 dark:text-rose-400">STEP 3: Skills & Key Projects</h2>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Add Technical & Soft Skills</label>
                <div className="flex space-x-2">
                  <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="e.g. Scikit-learn, Docker, MLOps" className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white" />
                  <button onClick={addSkill} type="button" className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center space-x-1">
                      <span>{s}</span>
                      <button onClick={() => removeSkill(s)} className="text-slate-400 hover:text-rose-600">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Primary Project Title</label>
                <input type="text" value={projTitle} onChange={e => setProjTitle(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white" />
                <input type="text" value={projDesc} onChange={e => setProjDesc(e.target.value)} placeholder="Project description..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white" />
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-base font-bold text-rose-600 dark:text-rose-400">STEP 4: Certifications & Learning</h2>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Certification Name</label>
                  <input type="text" value={certName} onChange={e => setCertName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Issuer / Organization</label>
                  <input type="text" value={certIssuer} onChange={e => setCertIssuer(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-base font-bold text-rose-600 dark:text-rose-400">STEP 5: Professional Profiles</h2>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">GitHub Profile URL</label>
                  <input type="text" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">LinkedIn Profile URL</label>
                  <input type="text" value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-indigo-500 flex items-center justify-center animate-spin">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Generating AI Talent Profile...</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                TalentFlow AI is synthesizing your skills, extracting GitHub signals, and computing initial internal opportunity matches.
              </p>
            </div>
          )}

          {/* STEP 7 */}
          {step === 7 && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center space-x-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Your Talent Profile is Ready! (100% Completeness)</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
                <p className="font-bold text-slate-900 dark:text-white">{fullName} • {currentRole}</p>
                <p className="text-slate-500 dark:text-slate-400">Target Role: <strong>{careerGoal}</strong></p>
                <p className="text-slate-500 dark:text-slate-400">Extracted Skills: {skills.join(', ')}</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold">Top Matched Role: Machine Learning Engineer (92% Match Score)</p>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          )}

          {/* Footer Controls */}
          {step < 7 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs disabled:opacity-30"
              >
                Back
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all flex items-center space-x-1.5"
              >
                <span>{step === 6 ? 'Review Profile' : 'Next Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
