import React from 'react';
import './loadingSpinner.css';

export default function LoadingSpinner({ size = 'small', color = 'white' }) {
  const sizeClass = size === 'large' ? 'spinner-large' : size === 'medium' ? 'spinner-medium' : 'spinner-small';
  
  return (
    <span 
      className={`loading-spinner ${sizeClass}`}
      style={{ borderTopColor: color }}
      aria-label="Loading"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </span>
  );
}

