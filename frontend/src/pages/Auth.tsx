import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Mail, Lock, UserPlus } from 'lucide-react';
import useCarbonStore from '../store/carbonStore';

export const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { loginMock } = useCarbonStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password || (isSignUp && !username)) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    // Since we are setting up Phase 1 scaffolding without active Supabase credentials,
    // we fallback to mock simulation logic to let the user log in instantly.
    setTimeout(() => {
      const parsedUser = username || email.split('@')[0];
      loginMock(parsedUser);
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  const triggerGoogleOAuth = () => {
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      loginMock('google_researcher');
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050A0E] text-text-primary flex items-center justify-center p-4 selection:bg-accent-green selection:text-bg-primary font-body">
      <div className="w-full max-w-[380px] bg-[#070D18] border border-white/[0.04] rounded-lg p-7 relative overflow-hidden">
        {/* Header Logo */}
        <div className="flex flex-col items-center mb-7">
          <div className="w-9 h-9 rounded bg-white/[0.01] flex items-center justify-center border border-white/[0.05] mb-3">
            <Activity className="text-accent-green" size={18} />
          </div>
          <h2 className="font-display font-black text-base tracking-[0.2em] text-text-primary uppercase">
            {isSignUp ? 'REGISTER_ACCOUNT' : 'SECURE_SIGN_IN'}
          </h2>
          <p className="text-[8px] text-text-subtle font-mono mt-1 tracking-widest uppercase opacity-60">
            CARBONSENSE_RESEARCH_TERMINAL_V1.5
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded bg-accent-red/5 border border-accent-red/10 text-accent-red text-[10px] font-mono flex items-center space-x-2">
            <span>⚠️</span>
            <span className="uppercase tracking-tighter">{error}</span>
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-black text-text-subtle tracking-widest block uppercase">
                RESEARCHER_ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted/40">
                  <UserPlus size={14} />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. researcher_01"
                  className="w-full bg-[#050A0E] border border-white/[0.04] focus:border-accent-green/50 text-text-primary pl-9 pr-3 py-2 rounded text-[11px] transition-all font-mono outline-none uppercase tracking-tighter"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[9px] font-mono font-black text-text-subtle tracking-widest block uppercase">
              EMAIL_ADDRESS
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted/40">
                <Mail size={14} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ID@CARBONSENSE.ORG"
                className="w-full bg-[#050A0E] border border-white/[0.04] focus:border-accent-green/50 text-text-primary pl-9 pr-3 py-2 rounded text-[11px] transition-all font-mono outline-none uppercase tracking-tighter"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-mono font-black text-text-subtle tracking-widest block uppercase">
              SECURITY_KEY
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted/40">
                <Lock size={14} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#050A0E] border border-white/[0.04] focus:border-accent-green/50 text-text-primary pl-9 pr-3 py-2 rounded text-[11px] transition-all font-mono outline-none tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded bg-accent-green text-bg-primary font-mono font-black text-[10px] tracking-[0.2em] transition-all disabled:opacity-50 select-none uppercase cursor-pointer mt-2"
          >
            {isLoading ? 'ESTABLISHING_LINK...' : isSignUp ? 'CREATE_ACCOUNT' : 'AUTHORIZE_SESSION'}
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex items-center justify-center my-5">
          <div className="absolute inset-x-0 h-px bg-white/[0.03]" />
          <span className="relative bg-[#070D18] px-3 text-[8px] font-mono text-text-subtle/50 tracking-[0.3em] font-black uppercase">
            OR
          </span>
        </div>

        {/* Google Auth Option */}
        <button
          onClick={triggerGoogleOAuth}
          className="w-full py-2 rounded bg-white/[0.01] border border-white/[0.06] hover:border-white/[0.12] text-text-primary font-mono font-bold text-[9px] flex items-center justify-center space-x-2 transition-all select-none uppercase cursor-pointer tracking-widest"
        >
          <ShieldCheck size={12} className="text-accent-blue" />
          <span>SIGN_IN_WITH_OAUTH_2.0</span>
        </button>

        {/* Switch panel */}
        <div className="mt-7 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-text-muted/60 hover:text-accent-green transition-colors font-mono text-[9px] uppercase tracking-tighter"
          >
            {isSignUp ? '[ ALREADY REGISTERED? CLICK TO AUTHORIZE ]' : '[ REQUEST NEW CREDENTIALS / SIGN UP ]'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Auth;
