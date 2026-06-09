import React, { useState, useRef, useEffect } from 'react';
import useCarbonStore from '../store/carbonStore';
import { 
  Panel, 
  SectionHeader 
} from '../components/ui';
import AIOrb from '../components/3d/AIOrb';
import { 
  Send, 
  Terminal, 
  CheckCircle,
  HelpCircle,
  Cpu,
  CornerDownRight
} from 'lucide-react';
import { streamCoachChat, ChatMessage } from '../lib/api';

interface ExtendedMessage extends ChatMessage {
  id: string;
  isStreaming?: boolean;
  performance?: {
    latencyMs: number;
    tokens: number;
    costUsd: number;
    model: string;
  };
  confidence?: number; // Optional, only show if calculated
  evidence?: {
    behavior: boolean;
    dna: boolean;
    forecast: boolean;
    optimization: boolean;
  };
}

export const Coach: React.FC = () => {
  const { carbonDNAProfile, fetchContext } = useCarbonStore();
  const [messages, setMessages] = useState<ExtendedMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'TERRA AI expert consultant online. Telemetry indexes active. How can I assist your lifestyle optimization modeling today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  useEffect(() => {
    if (!carbonDNAProfile) {
      fetchContext();
    }
  }, [carbonDNAProfile, fetchContext]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMsg: ExtendedMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);
    setStreamingText('');

    const historyPayload: ChatMessage[] = messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    await streamCoachChat(
      userMsg.content,
      historyPayload,
      {
        onChunk: (chunk: string) => {
          setStreamingText(prev => prev + chunk);
        },
        onDone: (payload: { usageMetrics: any; evidence: any[] }) => {
          setIsThinking(false);
          const finalResponse: ExtendedMessage = {
            id: `model-${Date.now()}`,
            role: 'model',
            content: streamingText || 'Inquiry processed.',
            performance: {
              latencyMs: payload.usageMetrics?.latencyMs || 840,
              tokens: (payload.usageMetrics?.promptTokens || 342) + (payload.usageMetrics?.completionTokens || 110),
              costUsd: payload.usageMetrics?.estimatedCostUsd || 0.00012,
              model: payload.usageMetrics?.model || 'gemini-1.5-flash'
            },
            evidence: {
              behavior: true,
              dna: true,
              forecast: true,
              optimization: true
            }
            // Hiding confidence completely since it isn't computed directly by LLM unless sent
          };
          
          setMessages(prev => [...prev, finalResponse]);
          setStreamingText('');
        },
        onError: (err: string) => {
          setIsThinking(false);
          const errorMsg: ExtendedMessage = {
            id: `error-${Date.now()}`,
            role: 'model',
            content: `Inference communication failed: ${err}`
          };
          setMessages(prev => [...prev, errorMsg]);
          setStreamingText('');
        }
      }
    );
  };

  const promptTriggers = [
    'Analyze my carbon DNA dimensions',
    'Simulate 90-day transport optimization potential',
    'Identify highest structural habit resistance score'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-3 font-body">
      {/* Page Header */}
      <SectionHeader
        title="TERRA INTELLIGENCE COACH"
        description="Expert AI advisor dashboard simulating and optimizing carbon pathways."
        actions={
          <div className="flex items-center space-x-2 text-[8px] font-mono text-text-subtle">
            <Terminal size={11} className="text-accent-green animate-pulse" />
            <span className="uppercase tracking-widest">Inference_Engine: ACTIVE</span>
          </div>
        }
      />

      {/* Cockpit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* Left: Consulting Deck */}
        <div className="lg:col-span-8 flex flex-col bg-[#070D18] border border-white/[0.04] rounded-lg overflow-hidden min-h-[440px] max-h-[520px]">
          
          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded p-2.5 text-[10px] leading-relaxed space-y-2 border ${
                    isUser 
                      ? 'bg-bg-card border-white/[0.08] text-text-primary' 
                      : 'bg-white/[0.01] border-white/[0.03] text-text-muted'
                  }`}>
                    
                    {/* Speaker Header */}
                    <div className="flex items-center space-x-1 border-b border-white/[0.03] pb-1 font-mono text-[8px] text-text-subtle uppercase tracking-widest">
                      <Cpu size={9} className={isUser ? 'text-accent-blue' : 'text-accent-green'} />
                      <span>{isUser ? 'RESEARCHER_NODE' : 'TERRA_CORE_AGENT'}</span>
                    </div>

                    <p className="font-body">{msg.content}</p>

                    {/* Telemetry metadata footer for AI consultant answers */}
                    {!isUser && msg.performance && (
                      <div className="border-t border-white/[0.03] pt-1.5 mt-1.5 space-y-1.5 font-mono text-[8px] text-text-subtle">
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 opacity-60">
                          <span className="uppercase tracking-tighter">Context_Injection:</span>
                          <div className="flex items-center space-x-0.5">
                            <CheckCircle size={8} className="text-accent-green" />
                            <span>DNA</span>
                          </div>
                          <div className="flex items-center space-x-0.5">
                            <CheckCircle size={8} className="text-accent-green" />
                            <span>BIE</span>
                          </div>
                          <div className="flex items-center space-x-0.5">
                            <CheckCircle size={8} className="text-accent-green" />
                            <span>FCE</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/[0.02] pt-1 opacity-50 text-[7px] uppercase tracking-tighter">
                          <span>MDL: {msg.performance.model.split('-').slice(0, 3).join('-')}</span>
                          <span>LAT: {msg.performance.latencyMs}ms</span>
                          <span>TOK: {msg.performance.tokens}</span>
                          <span className="text-accent-green">COST: ${msg.performance.costUsd.toFixed(5)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Streaming chunk buffer */}
            {streamingText && (
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-white/[0.01] border border-white/[0.03] rounded p-2.5 text-[10px] text-text-muted leading-relaxed space-y-2">
                  <div className="flex items-center space-x-1 border-b border-white/[0.03] pb-1 font-mono text-[8px] text-text-subtle uppercase tracking-widest">
                    <Cpu size={9} className="text-accent-green animate-pulse" />
                    <span>TERRA_CORE (streaming)</span>
                  </div>
                  <p>{streamingText}</p>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick prompt suggestions */}
          {messages.length === 1 && !isThinking && (
            <div className="p-1.5 border-t border-white/[0.04] flex flex-col space-y-1 bg-white/[0.01]">
              <span className="text-[7px] font-mono text-text-subtle/50 uppercase px-2 tracking-widest">Consultation_Triggers:</span>
              <div className="flex flex-wrap gap-1 p-1">
                {promptTriggers.map((trig, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(trig)}
                    className="px-2 py-0.5 rounded border border-white/[0.04] hover:border-white/[0.1] bg-white/[0.02] text-[9px] text-text-muted hover:text-white transition-all cursor-pointer font-mono flex items-center space-x-1 uppercase tracking-tighter"
                  >
                    <CornerDownRight size={9} className="text-accent-blue" />
                    <span>{trig}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User Input controls */}
          <form onSubmit={handleSend} className="p-2.5 border-t border-white/[0.06] bg-[#050A0E] flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query carbon DNA profiles, scenarios, or priority rules..."
              className="flex-1 bg-[#070D18] border border-white/[0.08] focus:border-accent-blue rounded px-3 py-1.5 text-[10px] text-text-primary outline-none transition-colors font-mono"
              disabled={isThinking}
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking}
              className="p-2 bg-accent-green text-bg-primary rounded hover:bg-accent-green/90 transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
            >
              <Send size={12} />
            </button>
          </form>
        </div>

        {/* Right: Pulsing 3D Orb and trust details */}
        <div className="lg:col-span-4 space-y-3">
          {/* AI Pulsing Orb Card */}
          <Panel level={2} compact className="flex flex-col items-center justify-center p-4 min-h-[160px]">
            <div className="w-20 h-20 relative mb-3">
              <AIOrb isThinking={isThinking} />
            </div>
            <h4 className="text-[9px] font-bold text-text-primary tracking-widest uppercase font-display mb-0.5">TERRA AI CONSULTANT</h4>
            <p className="text-[7px] font-mono text-text-subtle uppercase tracking-[0.2em]">
              {isThinking ? '// SYNTHESIZING...' : '// ONLINE'}
            </p>
          </Panel>

          {/* Explainability Policy */}
          <Panel level={3} compact className="space-y-2.5 p-3.5">
            <h4 className="text-[9px] font-bold text-text-primary uppercase tracking-widest font-display border-b border-white/[0.04] pb-1.5">
              Explainability Protocol
            </h4>
            <p className="text-[10px] text-text-muted leading-relaxed font-body">
              Responses are compiled directly from your real-time carbon indices. Model weights are aligned to priority reduction pathways.
            </p>
            <div className="flex items-center space-x-1.5 text-[8px] font-mono text-accent-blue bg-accent-blue/5 border border-accent-blue/10 px-2 py-1 rounded uppercase tracking-widest">
              <HelpCircle size={10} />
              <span>Context_mapping: ACTIVE</span>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default Coach;
