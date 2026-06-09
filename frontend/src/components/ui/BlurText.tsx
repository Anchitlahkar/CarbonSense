import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export const BlurText: React.FC<BlurTextProps> = ({ text, className = '', delay = 0, duration = 0.5 }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay }
    }
  };

  const item = {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 4 },
    show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration } }
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={item} className="inline-block mr-[0.25em]" aria-hidden="true">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
