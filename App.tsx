
import React, { useState, useEffect } from 'react';
import { Page, Game } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import { HelpProvider } from './contexts/HelpContext';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminPage from './components/AdminPage';
import AboutPage from './components/AboutPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import FavoritesPage from './components/FavoritesPage';
import HelpPage from './components/HelpPage';
import DashboardPage from './components/DashboardPage';
import GameDetailsModal from './components/GameDetailsModal';
import { useGames } from './contexts/GameContext';


function AppContent() {
  const [page, setPage] = useState<Page>('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const { currentUser, logout } = useAuth();
  const { games } = useGames();

  // Effect to handle navigation on login and logout
  useEffect(() => {
    // If user is logged in and on a public page, navigate to home
    if (currentUser && (page === 'login' || page === 'signup')) {
      setPage('home');
    }
    // If user is not logged in and not on a public page, navigate to login
    if (!currentUser && page !== 'login' && page !== 'signup') {
      setPage('login');
    }
  }, [currentUser, page]);


  // Set body background color based on current page
  useEffect(() => {
    document.body.className = 'font-sans'; // Reset classes
    if (!currentUser) {
        document.body.classList.add('bg-gray-200');
    } else if (page === 'home' || page === 'favorites') {
        document.body.classList.add('bg-black');
    } else if (page === 'admin' || page === 'about' || page === 'profile' || page === 'help' || page === 'dashboard') {
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
  };

  if (!currentUser) {
    if (page === 'signup') {
        return <div className="min-h-screen flex items-center justify-center"><Signup onNavigateToLogin={() => setPage('login')} /></div>;
    }
    return <div className="min-h-screen flex items-center justify-center"><Login onNavigateToSignup={() => setPage('signup')} /></div>;
  }

  const handleShowDetails = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const renderContent = () => {
    switch (page) {
      case 'home':
        return <HomePage searchQuery={searchQuery} onNavigate={handleNavigate} onShowDetails={handleShowDetails} />;
      case 'about':
        return <AboutPage />;
      case 'admin':
        if (currentUser?.isAdmin) {
          return <AdminPage />;
        }
        return null; // Or a "Not Authorized" component
      case 'profile':
        return <ProfilePage />;
      case 'favorites':
        return <FavoritesPage searchQuery={searchQuery} onShowDetails={handleShowDetails} onNavigate={handleNavigate} />;
      case 'help':
        return <HelpPage />;
      case 'dashboard':
        return <DashboardPage onShowDetails={handleShowDetails} />;
      default:
        // Default to home page if logged in and page is not set
        return <HomePage searchQuery={searchQuery} onNavigate={handleNavigate} onShowDetails={handleShowDetails}/>;
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
        currentPage={page}
      />
      {renderContent()}
      {selectedGame && <GameDetailsModal game={selectedGame} onClose={handleCloseModal} />}
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <HelpProvider>
          <AppContent />
        </HelpProvider>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
