import React, { useEffect } from 'react';

export default function Notification({ message, isVisible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="notification">
      <div className="notification-content">
        <span className="notification-message">{message}</span>
        <button className="notification-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

