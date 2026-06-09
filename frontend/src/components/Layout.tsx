import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe, 
  Fingerprint, 
  TrendingUp, 
  Zap, 
  ScanLine, 
  MessageSquare, 
  LogOut, 
  Activity 
} from 'lucide-react';
import useCarbonStore from '../store/carbonStore';
import CommandPalette from './CommandPalette';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-3 py-1.5 rounded-lg transition-colors group text-[10px] font-mono ${
        active
          ? 'bg-white/5 text-white border-l-2 border-accent-green pl-2.5 rounded-l-none'
          : 'text-text-muted hover:text-white hover:bg-white/[0.02]'
      }`}
    >
      <div className={`shrink-0 ${active ? 'text-accent-green' : 'text-text-muted group-hover:text-white'}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 14 })}
      </div>
      <span className="font-bold tracking-widest uppercase">{label}</span>
    </Link>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useCarbonStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#050A0E] text-text-primary overflow-hidden">
      {/* Global Command Palette */}
      <CommandPalette />

      {/* Sidebar */}
      <aside className="w-56 bg-[#070D18] border-r border-white/[0.04] flex flex-col justify-between p-3 shrink-0 font-body">
        <div className="space-y-5">
          {/* Logo & Ctrl+K trigger button */}
          <div className="flex items-center justify-between px-2 py-2 border-b border-white/[0.03] mb-1">
            <Link to="/dashboard" className="flex items-center space-x-2 select-none">
              <Activity className="text-accent-green" size={18} />
              <span className="text-[11px] font-display font-black tracking-[0.2em] text-white">
                CARBONSENSE X
              </span>
            </Link>
            
            {/* Ctrl + K badge */}
            <button 
              onClick={() => {
                const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' });
                window.dispatchEvent(event);
              }}
              className="px-1.5 py-0.5 rounded border border-white/[0.08] hover:border-white/[0.2] bg-white/[0.02] text-[8px] font-mono text-text-subtle transition-all cursor-pointer"
              title="Open command palette (Ctrl+K)"
            >
              ⌘K
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4">
            {/* Section 1: Dashboard */}
            <div className="space-y-1">
              <div className="text-[8px] tracking-[0.2em] font-mono text-text-subtle/50 font-black px-3 uppercase">
                Observation
              </div>
              <SidebarItem
                to="/dashboard"
                icon={<LayoutDashboard />}
                label="Mission Control"
                active={location.pathname === '/dashboard'}
              />
            </div>

            {/* Section 2: Planet Twin */}
            <div className="space-y-1">
              <div className="text-[8px] tracking-[0.2em] font-mono text-text-subtle/50 font-black px-3 uppercase">
                Simulation
              </div>
              <SidebarItem
                to="/twin"
                icon={<Globe />}
                label="Planet Twin"
                active={location.pathname === '/twin'}
              />
            </div>

            {/* Section 3: Intelligence */}
            <div className="space-y-1">
              <div className="text-[8px] tracking-[0.2em] font-mono text-text-subtle/50 font-black px-3 uppercase">
                Intelligence
              </div>
              <div className="space-y-0.5">
                <SidebarItem
                  to="/dna"
                  icon={<Fingerprint />}
                  label="Carbon DNA"
                  active={location.pathname === '/dna'}
                />
                <SidebarItem
                  to="/forecasts"
                  icon={<TrendingUp />}
                  label="Forecasts"
                  active={location.pathname === '/forecasts'}
                />
                <SidebarItem
                  to="/optimization"
                  icon={<Zap />}
                  label="Optimization"
                  active={location.pathname === '/optimization'}
                />
              </div>
            </div>

            {/* Section 4: Tools */}
            <div className="space-y-1">
              <div className="text-[8px] tracking-[0.2em] font-mono text-text-subtle/50 font-black px-3 uppercase">
                Tools
              </div>
              <div className="space-y-0.5">
                <SidebarItem
                  to="/scanner"
                  icon={<ScanLine />}
                  label="Receipt Scanner"
                  active={location.pathname === '/scanner'}
                />
                <SidebarItem
                  to="/coach"
                  icon={<MessageSquare />}
                  label="AI Coach"
                  active={location.pathname === '/coach'}
                />
              </div>
            </div>
          </nav>
        </div>

        {/* Footer Profile & Logout */}
        {user && (
          <div className="border-t border-white/[0.04] pt-3 space-y-2">
            <Link to="/profile" className="flex items-center space-x-2.5 px-2 py-1.5 hover:bg-white/[0.02] rounded-lg transition-colors group">
              <img
                src={user.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                alt="Avatar"
                className="w-7 h-7 rounded border border-white/[0.08] bg-bg-card group-hover:border-accent-green/30 transition-colors"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold truncate font-display text-text-primary uppercase tracking-tight">
                  {user.username || 'Citizen'}
                </p>
                <p className="text-[8px] text-text-subtle truncate font-mono uppercase tracking-widest">
                  {user.country ? `🇮🇳 ${user.country}` : 'Global'}
                </p>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-accent-red hover:bg-accent-red/5 border border-transparent hover:border-accent-red/10 transition-all text-[9px] font-mono font-black uppercase tracking-widest"
            >
              <LogOut size={12} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col overflow-y-auto min-w-0 bg-[#050A0E]">
        <div className="flex-1 p-3 md:p-4 lg:p-5">
          {children}
        </div>
      </main>
    </div>
  );
};
export default Layout;
