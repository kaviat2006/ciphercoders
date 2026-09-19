import React, { useState } from 'react';
import { Map, CheckCircle2, Clock, BookOpen, Code, Award, Sparkles } from 'lucide-react';

export const CareerRoadmap: React.FC = () => {
  const [steps, setSteps] = useState([
    { id: 1, title: "Software Developer Baseline", skill: "Python & SQL", type: "Current Role", duration: "Completed", status: "COMPLETED", description: "Established strong full-stack backend development and fraud detection project portfolio." },
    { id: 2, title: "Docker Fundamentals & Containerization", skill: "Docker", type: "Course Module", duration: "2 weeks", status: "IN_PROGRESS", description: "Master Dockerfiles, container networking, and multi-stage container builds." },
    { id: 3, title: "Containerized ML Model API Project", skill: "Machine Learning API", type: "Practical Project", duration: "3 weeks", status: "TODO", description: "Deploy your Fraud Detection model as a containerized FastAPI web service." },
    { id: 4, title: "Kubernetes Orchestration Essentials", skill: "Kubernetes", type: "Hands-on Lab", duration: "2 weeks", status: "TODO", description: "Deploy and manage container pods, services, deployments, and ingress rules." },
    { id: 5, title: "MLOps & CI/CD Automated Pipelines", skill: "MLOps", type: "Internal Project", duration: "3 weeks", status: "TODO", description: "Build automated MLflow model experiment tracking and retraining pipelines." },
    { id: 6, title: "Internal Transition: Machine Learning Engineer", skill: "ML Engineering", type: "Role Outcome", duration: "Target Role", status: "TODO", description: "Transition to Machine Learning Engineer in the flagship AI Research department." }
  ]);

  const toggleStep = (id: number) => {
    setSteps(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'COMPLETED' ? 'IN_PROGRESS' : s.status === 'IN_PROGRESS' ? 'COMPLETED' : 'IN_PROGRESS';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const completedCount = steps.filter(s => s.status === 'COMPLETED').length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            CORE MODULE 9 — VISUAL CAREER ROADMAP
          </span>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Map className="w-6 h-6 text-indigo-400" />
            <span>Target Role Roadmap: ML Engineer</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Personalized step-by-step career development path automatically updating as you approve new skills and complete learning tracks.
          </p>
        </div>

        <div className="w-full md:w-64 space-y-2 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="flex justify-between text-xs font-bold text-white">
            <span>Roadmap Progress</span>
            <span className="text-emerald-400">{progressPct}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-400 text-right">{completedCount} of {steps.length} Steps Completed</p>
        </div>
      </div>

      {/* Visual Roadmap Step Flow */}
      <div className="relative space-y-6 before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-indigo-500 before:to-slate-800">
        {steps.map((step) => {
          const isDone = step.status === 'COMPLETED';
          const isInProgress = step.status === 'IN_PROGRESS';

          return (
            <div key={step.id} className="relative pl-14 group">
              {/* Node Bullet */}
              <button
                onClick={() => toggleStep(step.id)}
                className={`absolute left-3 top-4 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                  isDone 
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-glow-emerald' 
                    : isInProgress
                    ? 'bg-indigo-600 border-indigo-400 text-white animate-pulse'
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4 font-extrabold" /> : <span className="text-xs font-bold">{step.id}</span>}
              </button>

              <div className={`p-6 rounded-2xl bg-slate-900/70 border transition-all ${
                isDone 
                  ? 'border-emerald-500/30' 
                  : isInProgress
                  ? 'border-indigo-500/50 shadow-glow-indigo'
                  : 'border-slate-800'
              }`}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{step.type}</span>
                      <span className="text-xs text-slate-500">• {step.duration}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                  </div>

                  <button
                    onClick={() => toggleStep(step.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      isDone 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : isInProgress
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow-indigo'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isDone ? 'Step Completed ✓' : isInProgress ? 'Mark Complete' : 'Start Step'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
