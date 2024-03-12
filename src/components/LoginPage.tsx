import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path as necessary

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    setError(''); // Reset error messages before attempting login
    try {
      await login(email, password);
      navigate('/'); // Navigate to the homepage or dashboard on successful login
    } catch (err) {
      // Catch any errors and set an error message
      setError('Failed to log in');
      console.error(err);
    }
  };

  return (
    <div className="login-container p-40">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Log In</button>
      </form>
      <div>
        Don't have an account? <span className="link" onClick={() => navigate('/register')}>Register</span>
      </div>
    </div>
  );
};

export default LoginPage;
