import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (currentUser) {
      window.history.replaceState({ page: 'home' }, 'Home', '/');
      navigate('/'); // Redirect to Home page after successful login
    }
  }, [currentUser, navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-50 rounded-lg"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-transform hover:scale-105">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow hover:shadow-lg"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow hover:shadow-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        <div className="mt-4 text-center">
          <p>Don't have an account? <Link to="/register" className="text-blue-500 underline">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
