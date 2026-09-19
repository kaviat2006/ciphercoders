import React, { useMemo } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  Node, 
  Edge,
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GitGraph, User, Code, Briefcase, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Custom Nodes
const EmployeeNode = ({ data }: any) => (
  <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow-indigo border border-indigo-400 min-w-[200px]">
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <div className="flex items-center space-x-2">
      <User className="w-5 h-5 shrink-0" />
      <div>
        <p className="font-extrabold text-sm">{data.label}</p>
        <p className="text-[10px] opacity-90">{data.role}</p>
      </div>
    </div>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

const SkillNode = ({ data }: any) => (
  <div className="p-3 rounded-xl bg-slate-900 border border-indigo-500/40 text-slate-100 shadow-md min-w-[150px]">
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <div className="flex items-center justify-between space-x-2">
      <span className="font-bold text-xs">{data.label}</span>
      <span className="text-[10px] font-bold text-emerald-400">{data.confidence}%</span>
    </div>
    <span className="text-[9px] text-slate-400 block mt-0.5">{data.category}</span>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

const ProjectNode = ({ data }: any) => (
  <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-slate-100 shadow-md min-w-[160px]">
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold mb-1">
      <Code className="w-3.5 h-3.5" />
      <span>{data.label}</span>
    </div>
    <div className="flex flex-wrap gap-1">
      {data.techs?.map((t: string) => (
        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
          {t}
        </span>
      ))}
    </div>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

const OpportunityNode = ({ data }: any) => (
  <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 text-slate-100 shadow-md min-w-[180px]">
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <div className="flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold">
        <Briefcase className="w-3.5 h-3.5" />
        <span>{data.label}</span>
      </div>
      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
        {data.score}
      </span>
    </div>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

export const SkillGraph: React.FC = () => {
  const { profile } = useApp();
  const nodeTypes = useMemo(() => ({
    employeeNode: EmployeeNode,
    skillNode: SkillNode,
    projectNode: ProjectNode,
    opportunityNode: OpportunityNode,
  }), []);

  const initialNodes: Node[] = [
    { id: 'emp-1', type: 'employeeNode', data: { label: profile?.name || 'Priya Sharma', role: profile?.current_role || 'Software Developer' }, position: { x: 350, y: 180 } },
    { id: 'skill-1', type: 'skillNode', data: { label: 'Python', confidence: 96, category: 'AI/ML' }, position: { x: 80, y: 320 } },
    { id: 'skill-2', type: 'skillNode', data: { label: 'Machine Learning', confidence: 88, category: 'AI/ML' }, position: { x: 260, y: 320 } },
    { id: 'skill-3', type: 'skillNode', data: { label: 'AWS', confidence: 92, category: 'Cloud' }, position: { x: 440, y: 320 } },
    { id: 'skill-4', type: 'skillNode', data: { label: 'SQL', confidence: 90, category: 'Data' }, position: { x: 620, y: 320 } },

    { id: 'proj-1', type: 'projectNode', data: { label: 'Fraud Detection System', techs: ['Python', 'XGBoost', 'SQL'] }, position: { x: 120, y: 460 } },
    { id: 'proj-2', type: 'projectNode', data: { label: 'Recommendation Engine', techs: ['Python', 'Scikit-learn'] }, position: { x: 400, y: 460 } },

    { id: 'opp-1', type: 'opportunityNode', data: { label: 'ML Engineer', score: '92% Match' }, position: { x: 260, y: 30 } },
    { id: 'opp-2', type: 'opportunityNode', data: { label: 'Senior Data Scientist', score: '64% Match' }, position: { x: 500, y: 30 } },
  ];

  const initialEdges: Edge[] = [
    { id: 'e-emp-s1', source: 'emp-1', target: 'skill-1', animated: true, style: { stroke: '#6366f1' } },
    { id: 'e-emp-s2', source: 'emp-1', target: 'skill-2', animated: true, style: { stroke: '#6366f1' } },
    { id: 'e-emp-s3', source: 'emp-1', target: 'skill-3', animated: true, style: { stroke: '#6366f1' } },
    { id: 'e-emp-s4', source: 'emp-1', target: 'skill-4', animated: true, style: { stroke: '#6366f1' } },

    { id: 'e-s1-p1', source: 'skill-1', target: 'proj-1', style: { stroke: '#10b981' } },
    { id: 'e-s2-p1', source: 'skill-2', target: 'proj-1', style: { stroke: '#10b981' } },
    { id: 'e-s2-p2', source: 'skill-2', target: 'proj-2', style: { stroke: '#10b981' } },

    { id: 'e-emp-o1', source: 'emp-1', target: 'opp-1', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
    { id: 'e-emp-o2', source: 'emp-1', target: 'opp-2', style: { stroke: '#64748b' } },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <GitGraph className="w-6 h-6 text-indigo-400" />
          <span>Interactive Skill Graph</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Visual network topology linking Employee $\rightarrow$ Skills $\rightarrow$ Projects $\rightarrow$ Opportunities.
        </p>
      </div>

      {/* React Flow Container */}
      <div className="h-[550px] w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl relative">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#1e293b" gap={16} />
          <Controls className="bg-slate-900 border-slate-800 fill-slate-200" />
        </ReactFlow>
      </div>
    </div>
  );
};
