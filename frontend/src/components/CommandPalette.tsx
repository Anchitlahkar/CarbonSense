import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Terminal, 
  Globe, 
  Fingerprint, 
  TrendingUp, 
  Zap, 
  ScanLine, 
  MessageSquare, 
  User, 
  LogOut 
} from 'lucide-react';
import useCarbonStore from '../store/carbonStore';

interface CommandItem {
  icon: React.ReactNode;
  label: string;
  category: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const navigate = useNavigate();
  const logout = useCarbonStore(state => state.logout);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle palette on Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autofocus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActiveIndex(0);
      setSearch('');
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      icon: <Terminal size={16} />,
      label: 'Go to Mission Control (Dashboard)',
      category: 'Navigation',
      action: () => { navigate('/dashboard'); setIsOpen(false); }
    },
    {
      icon: <Globe size={16} />,
      label: 'Go to Planet Twin (Digital Twin)',
      category: 'Navigation',
      action: () => { navigate('/twin'); setIsOpen(false); }
    },
    {
      icon: <Fingerprint size={16} />,
      label: 'Go to Carbon DNA profile',
      category: 'Navigation',
      action: () => { navigate('/dna'); setIsOpen(false); }
    },
    {
      icon: <TrendingUp size={16} />,
      label: 'Go to multi-horizon Forecasts',
      category: 'Navigation',
      action: () => { navigate('/forecasts'); setIsOpen(false); }
    },
    {
      icon: <Zap size={16} />,
      label: 'Go to Optimization Center',
      category: 'Navigation',
      action: () => { navigate('/optimization'); setIsOpen(false); }
    },
    {
      icon: <ScanLine size={16} />,
      label: 'Launch Receipt Scanner tool',
      category: 'Tools',
      action: () => { navigate('/scanner'); setIsOpen(false); }
    },
    {
      icon: <MessageSquare size={16} />,
      label: 'Ask TERRA AI Carbon Coach',
      category: 'Tools',
      action: () => { navigate('/coach'); setIsOpen(false); }
    },
    {
      icon: <User size={16} />,
      label: 'View Researcher Profile',
      category: 'Account',
      action: () => { navigate('/profile'); setIsOpen(false); }
    },
    {
      icon: <LogOut size={16} className="text-accent-red" />,
      label: 'End Session (Sign Out)',
      category: 'Account',
      action: () => { logout(); setIsOpen(false); navigate('/'); }
    }
  ];

  // Filter commands
  const filtered = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) {
        filtered[activeIndex].action();
      }
    }
  };

  // Click outside to close
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[9999] flex items-start justify-center pt-[15vh] px-4"
    >
      <div 
        className="w-full max-w-lg bg-[#0B1220] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden flex flex-col font-body"
        onKeyDown={handleKeyDown}
      >
        {/* Search header */}
        <div className="flex items-center space-x-3 px-4 py-3 border-b border-white/[0.06]">
          <Search size={18} className="text-text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActiveIndex(0); }}
            placeholder="Type a command or search platform..."
            className="w-full bg-transparent text-text-primary placeholder-text-subtle text-sm outline-none border-none focus:ring-0"
            aria-label="Command search input"
          />
          <div className="shrink-0 flex items-center space-x-1">
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-text-muted uppercase">ESC</kbd>
          </div>
        </div>

        {/* List items */}
        <div 
          ref={listRef}
          className="max-h-[300px] overflow-y-auto p-2 space-y-0.5 scrollbar-thin"
          role="listbox"
          aria-label="Commands list"
        >
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-text-subtle">
              No results matching "{search}"
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const active = idx === activeIndex;
              return (
                <div
                  key={idx}
                  onClick={cmd.action}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    active 
                      ? 'bg-white/5 text-accent-green' 
                      : 'text-text-primary hover:bg-white/[0.02]'
                  }`}
                  role="option"
                  aria-selected={active}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`${active ? 'text-accent-green' : 'text-text-muted'} shrink-0`}>
                      {cmd.icon}
                    </div>
                    <span className="font-medium truncate">{cmd.label}</span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[10px] font-mono text-text-subtle px-1.5 py-0.5 bg-white/[0.02] border border-white/[0.04] rounded uppercase">
                      {cmd.category}
                    </span>
                    {active && (
                      <span className="text-[10px] font-mono text-text-muted animate-pulse">↵</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {/* Footer info panel */}
        <div className="px-4 py-2 bg-white/[0.01] border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-text-subtle">
          <span>Navigate with ↑↓ and press Enter to select</span>
          <span>CarbonSense X Control Palette</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
