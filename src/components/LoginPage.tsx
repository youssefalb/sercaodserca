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
      setError('Failed to log in'); // Catch any errors and set an error message
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-cover bg-center bg-gray-100 pt-20">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
          <p className="text-sm text-gray-600 text-center mb-8">Please enter your login details.</p>
          {error && <div className="bg-red-100 text-red-700 p-3 mb-6 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button type="submit" className="w-full bg-purple hover:bg-purple text-white font-bold py-2 px-4 rounded">
              Log In
            </button>
          </form>
          <div className="mt-6 text-center mb-8">
            Don't have an account? <span className="text-purple hover:text-blue-700 font-bold cursor-pointer" onClick={() => navigate('/register')}>Register</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
