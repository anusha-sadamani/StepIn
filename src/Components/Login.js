import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (!isVerified) {
      setError('Please verify that you are not a robot');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });

      const { role, token, userId } = response.data;

      // Use sessionStorage instead of localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);

      if (role.toLowerCase() === 'student') {
        navigate('/StudentDashboard');
      } else if (role.toLowerCase() === 'council') {
        navigate('/councilDashboard');
      } else {
        setError('Invalid user role');
      }
    } catch (err) {
      setError(err.response?.data || 'Login failed. Please try again.');
    }
  };

  return (
    <div
      className="login-container"
      style={{
        background: `url('/pic2.jpg') no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}
    >
      <form onSubmit={handleLogin}>
        <div className="logo-container">
          <img src="logo.png" alt="Logo" className="logo" />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <div className="input-wrapper">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <div className="captcha-wrapper">
          <div className="captcha-container">
            <label className="captcha-checkbox-label">
              <input
                type="checkbox"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                className="captcha-checkbox"
              />
              <span className="captcha-checkbox-custom"></span>
            </label>
            <div className="captcha-text">
              <span>I'm not a robot</span>
              <div className="captcha-logo">
                <img
                  src="/recaptcha-logo.png"
                  alt="reCAPTCHA"
                  className="recaptcha-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="login-button">Login</button>
        
        <div className="links-container">
          <a href="/ForgetPassword" className="forgot-password-link">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
