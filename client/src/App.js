import React, { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import Upload from './pages/Upload';
import DocumentDashboard from './pages/DocumentDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [refreshDocs, setRefreshDocs] = useState(false);

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const triggerRefresh = () => setRefreshDocs(!refreshDocs);

  return (
    <div
      className="min-h-screen text-gray-900 font-inter bg-gradient-to-br from-[#e0e7ff] via-[#fdf2ff] to-[#ffe3ec]"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/geometry.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: '400px'
      }}
    >
      {isAuthenticated ? (
        <>
          {/* Top Navbar */}
          <div className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-sm shadow sticky top-0 z-10 rounded-b-xl">
            <h1 className="text-2xl font-bold text-indigo-700 tracking-wide">📄 Signature Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition shadow-md"
            >
              Logout
            </button>
          </div>

          {/* Main Content */}
          <main className="max-w-6xl mx-auto p-6 space-y-10">
            <Upload onUploadComplete={triggerRefresh} />
            <DocumentDashboard refresh={refreshDocs} />
          </main>
        </>
      ) : (
        <Auth onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
};

export default App;
