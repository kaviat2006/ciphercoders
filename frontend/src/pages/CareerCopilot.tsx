import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  BookOpen, 
  Map, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'copilot';
  text?: string;
  data?: any;
}

export const CareerCopilot: React.FC = () => {
  const { profile, activeEmployeeId } = useApp();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'copilot',
      text: `Hello ${profile?.name || 'Priya'}! I am your Gemini Career Copilot. I have full context on your talent profile, verified GitHub evidence, target opportunities, and skill gap matrix. How can I assist your career progression today?`
    }
  ]);

  const quickPrompts = [
    "What roles match my skills?",
    "Why was ML Engineer recommended?",
    "Why am I not currently aligned with Data Scientist?",
    "What skills am I missing?",
    "Create a 3-month learning plan.",
    "What did my latest GitHub project demonstrate?"
  ];

  const handleSend = async (queryText?: string) => {
    const q = queryText || input;
    if (!q.trim() || loading) return;

    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: q }]);
    setLoading(true);

    const res = await api.queryCopilot(activeEmployeeId, q);

    setMessages(prev => [
      ...prev,
      {
        sender: 'copilot',
        data: res
      }
    ]);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/30 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-glow-indigo">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white">Gemini Career Copilot</h1>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                Backend Context Integrated
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personalized career AI advisor grounded in your verified technical evidence and target roles.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-medium transition-all"
          >
            ✨ {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 min-h-[420px] max-h-[600px] overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'user' ? (
              <div className="max-w-md p-4 rounded-2xl bg-indigo-600 text-white text-xs font-medium shadow-glow-indigo">
                {m.text}
              </div>
            ) : (
              <div className="max-w-2xl p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs text-slate-200">
                {m.text && <p className="leading-relaxed">{m.text}</p>}

                {m.data && (
                  <div className="space-y-4">
                    <p className="text-slate-200 leading-relaxed font-medium">{m.data.summary}</p>

                    {m.data.strengths && m.data.strengths.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                        <p className="font-bold text-emerald-400">Validated Strengths:</p>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                          {m.data.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                    )}

                    {m.data.skill_gaps && m.data.skill_gaps.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                        <p className="font-bold text-amber-400">Identified Skill Gaps:</p>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                          {m.data.skill_gaps.map((g: string, i: number) => <li key={i}>{g}</li>)}
                        </ul>
                      </div>
                    )}

                    {m.data.recommendations && m.data.recommendations.length > 0 && (
                      <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 space-y-1">
                        <p className="font-bold text-indigo-300">Action Recommendations:</p>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                          {m.data.recommendations.map((r: string, i: number) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-purple-300 flex items-center space-x-2">
              <Bot className="w-4 h-4 animate-spin" />
              <span>Gemini Copilot is synthesizing your profile context...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Gemini Career Copilot anything about your skills, matches, or roadmap..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-glow-indigo transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
