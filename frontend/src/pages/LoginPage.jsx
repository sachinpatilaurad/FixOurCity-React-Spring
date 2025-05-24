// frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To redirect after login
// We'll create this authService soon to handle API calls
// import { loginUser } from '../services/authService';
import './LoginPage.css'; // We'll create specific styles for the login page
 import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission (which reloads the page)
    setError(''); // Clear previous errors
    setLoading(true);

    if (!email || !password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }

    // ** SIMULATED API CALL **
    // In a real app, you would call your authService here:
    // try {
    //   const userData = await loginUser({ email, password });
    //   // console.log('Login successful:', userData);
    //   // TODO: Save user data/token to context/localStorage
    //   // TODO: navigate('/dashboard'); // or wherever the user should go after login
    //   alert('Simulated Login Successful!'); // Placeholder
    //   navigate('/'); // Redirect to home page for now
    // } catch (err) {
    //   setError(err.message || 'Login failed. Please try again.');
    // } finally {
    //   setLoading(false);
    // }

    // For now, just simulate success after a delay
    console.log('Simulating login with:', { email, password });
    setTimeout(() => {
      alert('Simulated Login Successful!');
      setLoading(false);
      navigate('/'); // Redirect to home page after "successful" login
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to FixOurCity</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign Up</Link> {/* Later use <Link to="/register"> */}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;