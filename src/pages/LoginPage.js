import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Create navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin({ username, password });
      setError('');
      navigate('/home'); // Navigate to the home page after login
    } else {
      setError('Please enter both username and password!');
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot Password functionality will be available soon.');
  };

  const handleLoginWithGoogle = () => {
    alert('Login with Google functionality will be available soon.');
  };

  return (
    <div className="login-page">
      <div className="header-container">
        <h1 className="header">ScoreArena</h1>
        <p className="subheader">Track all your football matches with ease</p>
      </div>

      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            aria-describedby="username-error"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            aria-describedby="password-error"
          />
          {error && <p id="error-message" className="error-message">{error}</p>}
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <button onClick={handleForgotPassword} className="forgot-password-btn">Forgot Password?</button>
        <button onClick={handleLoginWithGoogle} className="google-login-btn">Login with Google</button>
      </div>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Live Scores</a>
        </div>
        <p className="footer-copyright">© 2024 ScoreArena. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LoginPage;
