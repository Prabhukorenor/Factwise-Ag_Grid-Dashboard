import React from 'react';
import './common.css';

export const Button = ({ children, variant = 'primary', icon, onClick, className = '', ...props }) => {
  const isIconOnly = icon && !children;
  return (
    <button 
      className={`btn btn-${variant} ${isIconOnly ? 'btn-icon' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
