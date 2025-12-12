import React from 'react';
import { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const baseClasses = "border rounded-sm transition-all duration-500";
  
  const variantClasses = {
    default: "border-white/5 bg-transparent hover:border-white/10 hover:bg-white/[0.02]",
    highlight: "border-white/10 bg-white/[0.03] hover:border-white/20"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;