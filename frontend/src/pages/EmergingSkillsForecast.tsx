import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { TrendingUp, AlertTriangle, Sparkles, ShieldCheck } from 'lucide-react';

export const EmergingSkillsForecast: React.FC = () => {
  const trendData = [
    { year: "2023 Q1", "Generative AI": 15, "MLOps": 30, "AI Security": 10, "Cloud Native": 70 },
    { year: "2023 Q3", "Generative AI": 35, "MLOps": 45, "AI Security": 20, "Cloud Native": 75 },
    { year: "2024 Q1", "Generative AI": 65, "MLOps": 60, "AI Security": 35, "Cloud Native": 82 },
    { year: "2024 Q3", "Generative AI": 90, "MLOps": 80, "AI Security": 55, "Cloud Native": 88 },
    { year: "2025 Q1 (Proj)", "Generative AI": 125, "MLOps": 105, "AI Security": 80, "Cloud Native": 95 },
    { year: "2025 Q3 (Proj)", "Generative AI": 160, "MLOps": 130, "AI Security": 110, "Cloud Native": 102 },
  ];

  const emergingSkills = [
    { name: "Generative AI & LLMs", growth: "High Growth (+140%)", demand: "Critical", description: "Internal automation, custom copilot agents, and enterprise RAG pipelines." },
    { name: "MLOps & LLMOps", growth: "High Growth (+110%)", demand: "High", description: "Model deployment, automated retraining pipelines, and MLflow experiment tracking." },
    { name: "AI Security & Guardrails", growth: "Rising (+85%)", demand: "Emerging", description: "Prompt injection prevention, vulnerability scanning, and AI compliance auditability." },
    { name: "Cloud Native & K8s", growth: "Steady (+35%)", demand: "Core Baseline", description: "Multi-region resilience, microservice container orchestration, and Helm charts." }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>CORE MODULE 7 — ORGANIZATIONAL DEMAND FORECASTING</span>
        </div>
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-indigo-400" />
          <span>Emerging Skill Forecast</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Predict potential skill requirements for emerging roles based on organizational needs and historical trend data.
        </p>
      </div>

      {/* Mandatory Official Disclaimer Callout */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center space-x-3 text-xs text-indigo-200">
        <AlertTriangle className="w-5 h-5 text-indigo-400 shrink-0" />
        <div>
          <p className="font-bold text-white">AI-generated skill-demand forecast based on organizational data.</p>
          <p className="text-indigo-300/80 text-[11px]">
            Forecasts represent probabilistic predictions based on internal projects, hiring trends, and market requirements; use as strategic planning guidance.
          </p>
        </div>
      </div>

      {/* Recharts Area Graph */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">Historical & Projected Organizational Skill Demand Trend</h2>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGenAI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMLOps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="Generative AI" stroke="#6366f1" fillOpacity={1} fill="url(#colorGenAI)" />
              <Area type="monotone" dataKey="MLOps" stroke="#10b981" fillOpacity={1} fill="url(#colorMLOps)" />
              <Area type="monotone" dataKey="AI Security" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSec)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Emerging Skills Summary List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergingSkills.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">{item.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px] border border-indigo-500/30">
                {item.growth}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
