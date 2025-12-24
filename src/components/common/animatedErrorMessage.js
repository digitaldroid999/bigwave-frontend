import React, { useEffect, useState } from 'react';
import './animatedErrorMessage.css';

export default function AnimatedErrorMessage({ message, onDismiss, autoDismiss = true, dismissDelay = 5000 }) {
  const [isVisible, setIsVisible] = useState(!!message);
  const [isDismissing, setIsDismissing] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setIsDismissing(false);
      
      if (autoDismiss) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, dismissDelay);
        
        return () => clearTimeout(timer);
      }
    } else {
      handleDismiss();
    }
  }, [message, autoDismiss, dismissDelay]);

  const handleDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) {
        onDismiss();
      }
    }, 300); // Match animation duration
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`header-login-error ${isDismissing ? 'dismissing' : ''}`}
      role="alert"
      aria-live="polite"
    >
      <span className="error-icon">⚠</span>
      <span className="error-message">{message}</span>
      <button 
        className="error-dismiss-btn" 
        onClick={handleDismiss}
        aria-label="Dismiss error"
      >
        ×
      </button>
    </div>
  );
}

