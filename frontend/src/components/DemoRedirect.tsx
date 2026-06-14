import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCarbonStore from '../store/carbonStore';
import { PremiumLoader } from './ui';

export const DemoRedirect: React.FC = () => {
  const { enterDemoMode } = useCarbonStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[DEMO_MODE] Initiating automatic demo redirect login');
    enterDemoMode();
    navigate('/dashboard', { replace: true });
  }, [enterDemoMode, navigate]);

  return <PremiumLoader label="LAUNCHING DEMO ENVIRONMENT..." className="min-h-screen" />;
};

export default DemoRedirect;
