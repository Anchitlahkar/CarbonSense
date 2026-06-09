import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  direction = 'up',
  className = '' 
}) => {
  const offset = 12;
  const initial = {
    opacity: 0,
    y: direction === 'up' ? offset : direction === 'down' ? -offset : 0,
    x: direction === 'left' ? offset : direction === 'right' ? -offset : 0,
    filter: 'blur(4px)'
  };

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <motion.div initial={initial} animate={animate} className={className}>
      {children}
    </motion.div>
  );
};
