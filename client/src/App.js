import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Upload from './pages/Upload';
import DocumentDashboard from './pages/DocumentDashboard';
import SignPDF from './pages/SignPDF';

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/');
  };

  // If not authenticated and not on login page, redirect
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/') {
      navigate('/');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <div className="min-h-screen text-gray-900 font-inter bg-gradient-to-br from-[#e0e7ff] via-[#fdf2ff] to-[#ffe3ec]"
         style={{
           backgroundImage: "url('https://www.transparenttextures.com/patterns/geometry.png')",
           backgroundRepeat: 'repeat',
           backgroundSize: '400px'
         }}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <div className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-sm shadow sticky top-0 z-10 rounded-b-xl">
                  <h1 className="text-2xl font-bold text-indigo-700 tracking-wide">📄 Signature Dashboard</h1>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition shadow-md"
                  >
                    Logout
                  </button>
                </div>
                <main className="max-w-6xl mx-auto p-6 space-y-10">
                  <Upload />
                  <DocumentDashboard />
                </main>
              </>
            ) : (
              <Auth onLoginSuccess={() => setIsAuthenticated(true)} />
            )
          }
        />

        <Route path="/sign" element={<SignPDF />} />

        {/* Optional 404 fallback */}
        <Route path="*" element={<div className="text-center mt-20 text-red-600 text-xl">🚫 Page not found</div>} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
