import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseClasses = "rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
  
  const variantClasses = {
    primary: "bg-emerald-700 hover:bg-emerald-600 text-white focus:ring-emerald-500",
    secondary: "border border-emerald-700 text-emerald-400 hover:bg-emerald-900/30 focus:ring-emerald-500",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5 focus:ring-slate-500"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button 
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;