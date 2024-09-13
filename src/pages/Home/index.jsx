import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';

function Home() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'home') {
        dispatch(logout());
        navigate('/login');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [dispatch, navigate]);

  if (!currentUser) {
    return null; // Return nothing while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main Container */}
      <div className="relative z-10 bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Bulk Imports</h2>
        
        {/* Buttons Container */}
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => navigate('/gasstations')}
            className="bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md transform hover:bg-blue-600 hover:scale-105 transition-transform duration-300"
          >
            <span className="text-lg font-semibold">Gas Stations</span>
          </button>
          <button
            onClick={() => navigate('/discounts')}
            className="bg-green-500 text-white py-3 px-4 rounded-lg shadow-md transform hover:bg-green-600 hover:scale-105 transition-transform duration-300"
          >
            <span className="text-lg font-semibold">Discounts</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
