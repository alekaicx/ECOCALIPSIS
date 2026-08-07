import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  children,
  className = '',
  ...props
}) => {
  let baseStyle = "font-extrabold rounded-full px-6 py-3 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 select-none ";
  
  if (variant === 'primary') {
    baseStyle += "bg-[#00ff88] hover:bg-[#00e077] text-slate-950 shadow-[#00ff88]/20 ";
  } else if (variant === 'secondary') {
    baseStyle += "bg-[#183024] hover:bg-[#204030] text-slate-100 border border-[#00ff88]/30 ";
  } else if (variant === 'outline') {
    baseStyle += "bg-transparent border-2 border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10 ";
  } else if (variant === 'danger') {
    baseStyle += "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30 ";
  }

  return (
    <button className={`${baseStyle} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
