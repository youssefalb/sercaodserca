import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path as necessary

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(''); // Reset error messages before attempting to register
    try {
      await signup(email, password);
      navigate('/login'); // Navigate to the login page on successful registration
    } catch (err) {
      setError('Failed to create an account');
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-cover bg-center bg-gray-100 pt-20">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
          <p className="text-sm text-gray-600 text-center mb-6">Please enter your details to create an account.</p>
          {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
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
            <div>
              <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password:</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button type="submit" className="w-full bg-purple hover:bg-purple text-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </form>
          <div className="mt-6 mb-4 text-center">
            Already have an account? <span className="text-blue hover:text-blue cursor-pointer" onClick={() => navigate('/login')}>Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
