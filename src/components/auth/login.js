import React, { useState, useEffect } from "react";
import { performLogin } from "../../utils/auth";

export default function Login({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("samplay01");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setError(""); // Reset error when modal opens
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await performLogin(username, password);
      
      if (result.success) {
        // Call success callback with user data and balance data
        if (onLoginSuccess) {
          onLoginSuccess(result.user, result.token, result.balanceData);
        }
        // Close modal on success
        onClose();
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="login-overlay" onClick={onClose}></div>
      <div className="login-modal">
        <button className="login-close-btn" onClick={onClose}>
          <span>×</span>
        </button>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">ログイン</h2>
          
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
          
          <div className="login-field">
            <label className="login-label">ユーザー名</label>
            <input
              type="text"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ユーザー名は6 ~ 16ビットです"
            />
          </div>
          
          <div className="login-field">
            <label className="login-label">ログインパスワード</label>
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6 ~ 16桁のログインパスワードを入力します"
            />
          </div>
          
          <div className="login-checkbox-container">
            <input
              type="checkbox"
              id="remember-password"
              className="login-checkbox"
              checked={rememberPassword}
              onChange={(e) => setRememberPassword(e.target.checked)}
            />
            <label htmlFor="remember-password" className="login-checkbox-label">
              パスワードに記憶させる
            </label>
          </div>
          
          <button type="submit" className="login-submit-btn" disabled={isLoading}>
            {isLoading ? "ログイン中..." : "ログインをします"}
          </button>
        </form>
      </div>
    </>
  );
}

