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
    <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center p-4 selection:bg-accent-green/30 font-body relative overflow-hidden">
      {/* Subtle grid background overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="w-full max-w-[360px] bg-bg-surface/80 backdrop-blur-md border border-white/[0.06] rounded-sm p-6 relative z-10 shadow-2xl">
        {/* Header Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-10 h-10 rounded-sm bg-bg-card border border-white/[0.08] flex items-center justify-center mb-3 shadow-inner">
            <Activity className="text-accent-green opacity-80" size={18} />
          </div>
          <h2 className="font-display font-black text-[13px] tracking-[0.25em] text-text-primary uppercase mb-1">
            {isSignUp ? 'REGISTER_ACCOUNT' : 'SECURE_SIGN_IN'}
          </h2>
          <p className="text-[7.5px] text-text-muted/60 font-mono tracking-[0.3em] uppercase font-bold">
            CARBONSENSE_TERMINAL_V1.6
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-sm bg-accent-red/10 border border-accent-red/20 text-accent-red/90 text-[9px] font-mono flex items-center space-x-2 font-bold tracking-tighter uppercase shadow-[inset_0_0_10px_-5px_#FF3366]">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <div className="space-y-1.5">
              <label className="text-[8px] font-mono font-black text-text-muted/60 tracking-[0.2em] block uppercase">
                RESEARCHER_ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-text-muted/40">
                  <UserPlus size={12} />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. researcher_01"
                  className="w-full bg-bg-primary/80 border border-white/[0.06] focus:border-accent-green/60 text-text-primary pl-8 pr-3 py-1.5 rounded-sm text-[10.5px] transition-all font-mono outline-none uppercase tracking-tighter placeholder:text-text-muted/30 focus:shadow-[0_0_15px_-5px_rgba(0,255,135,0.2)]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[8px] font-mono font-black text-text-muted/60 tracking-[0.2em] block uppercase">
              EMAIL_ADDRESS
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-text-muted/40">
                <Mail size={12} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ID@CARBONSENSE.ORG"
                className="w-full bg-bg-primary/80 border border-white/[0.06] focus:border-accent-green/60 text-text-primary pl-8 pr-3 py-1.5 rounded-sm text-[10.5px] transition-all font-mono outline-none uppercase tracking-tighter placeholder:text-text-muted/30 focus:shadow-[0_0_15px_-5px_rgba(0,255,135,0.2)]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[8px] font-mono font-black text-text-muted/60 tracking-[0.2em] block uppercase">
              SECURITY_KEY
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-text-muted/40">
                <Lock size={12} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-bg-primary/80 border border-white/[0.06] focus:border-accent-green/60 text-text-primary pl-8 pr-3 py-1.5 rounded-sm text-[10.5px] transition-all font-mono outline-none tracking-widest focus:shadow-[0_0_15px_-5px_rgba(0,255,135,0.2)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-sm bg-accent-green text-bg-primary font-mono font-black text-[9.5px] tracking-[0.25em] transition-all disabled:opacity-40 select-none uppercase cursor-pointer mt-3 shadow-[0_0_15px_-5px_#00FF87] hover:bg-accent-green/90"
          >
            {isLoading ? 'ESTABLISHING_LINK...' : isSignUp ? 'CREATE_ACCOUNT' : 'AUTHORIZE_SESSION'}
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-x-0 h-px bg-white/[0.03]" />
          <span className="relative bg-bg-surface px-3 text-[7.5px] font-mono text-text-muted/40 tracking-[0.3em] font-black uppercase">
            OR
          </span>
        </div>

        {/* Google Auth Option */}
        <button
          onClick={triggerGoogleOAuth}
          className="w-full py-1.5 rounded-sm bg-white/[0.02] border border-white/[0.05] hover:border-accent-blue/30 hover:bg-accent-blue/5 text-text-primary/90 font-mono font-bold text-[8.5px] flex items-center justify-center space-x-2 transition-all select-none uppercase cursor-pointer tracking-[0.2em]"
        >
          <ShieldCheck size={11} className="text-accent-blue/80" />
          <span>SIGN_IN_WITH_OAUTH_2.0</span>
        </button>

        {/* Switch panel */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-text-muted/50 hover:text-accent-green/80 transition-colors font-mono text-[8px] uppercase tracking-tighter font-bold"
          >
            {isSignUp ? '[ ALREADY REGISTERED? CLICK TO AUTHORIZE ]' : '[ REQUEST NEW CREDENTIALS / SIGN UP ]'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Auth;
