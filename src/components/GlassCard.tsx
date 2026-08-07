import React from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  glowColor?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  id,
  children,
  className = '',
  interactive = false,
  glowColor = 'rgba(16, 185, 129, 0.12)',
  onClick
}) => {
  return (
    <motion.div
      id={id}
      whileHover={interactive ? { y: -4, scale: 1.008 } : undefined}
      whileTap={interactive ? { scale: 0.985 } : undefined}
      onClick={onClick}
      style={{
        boxShadow: interactive ? `0 20px 45px -12px ${glowColor}` : undefined
      }}
      className={`relative overflow-hidden rounded-[36px] sm:rounded-[48px] ${
        interactive ? 'glass-panel-interactive cursor-pointer' : 'glass-panel'
      } p-6 sm:p-8 transition-all duration-300 ${className}`}
    >
      {/* Liquid background light reflection */}
      <div 
        className="pointer-events-none absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-40"
        style={{ background: glowColor }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};


