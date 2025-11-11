import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminPage from './components/AdminPage';
import AboutPage from './components/AboutPage';
import HomePage from './components/HomePage';


function AppContent() {
  const [page, setPage] = useState<Page>('login');
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, logout } = useAuth();

  // Effect to navigate to home on successful login
  useEffect(() => {
    if (currentUser && (page === 'login' || page === 'signup')) {
      setPage('home');
    }
  }, [currentUser, page]);

  // Set body background color based on current page
  useEffect(() => {
    document.body.className = 'font-sans'; // Reset classes
    if (!currentUser) {
        document.body.classList.add('bg-gray-200');
    } else if (page === 'home') {
        document.body.classList.add('bg-black');
    } else if (page === 'admin' || page === 'about') {
        document.body.classList.add('bg-slate-800');
    } else {
        document.body.classList.add('bg-gray-200');
    }
  }, [page, currentUser]);


  const handleNavigate = (newPage: Page) => {
    if (newPage === 'admin' && !currentUser?.isAdmin) {
      return; // Prevent non-admins from accessing admin page
    }
    setPage(newPage);
  }

  const handleLogout = () => {
    logout();
    setPage('login');
  };

  if (!currentUser) {
    if (page === 'signup') {
        return <div className="min-h-screen flex items-center justify-center"><Signup onNavigateToLogin={() => setPage('login')} /></div>;
    }
    return <div className="min-h-screen flex items-center justify-center"><Login onNavigateToSignup={() => setPage('signup')} /></div>;
  }

  const renderContent = () => {
    switch (page) {
      case 'home':
        return <HomePage searchQuery={searchQuery} onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'admin':
        if (currentUser?.isAdmin) {
          return <AdminPage />;
        }
        return null; // Or a "Not Authorized" component
      default:
        // Default to home page if logged in and page is not set
        return <HomePage searchQuery={searchQuery} onNavigate={handleNavigate} />;
    }
  };


  return (
    <div>
      <Header 
        onNavigate={handleNavigate} 
        onLogout={handleLogout} 
        showAdminLink={currentUser.isAdmin}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {renderContent()}
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
