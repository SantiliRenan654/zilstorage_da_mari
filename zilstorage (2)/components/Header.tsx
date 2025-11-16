import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import SearchIcon from './icons/SearchIcon';
import UserIcon from './icons/UserIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import { useAuth } from '../contexts/AuthContext';


interface HeaderProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  showAdminLink: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onLogout, showAdminLink, searchQuery, onSearchChange, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }

  const handleUserMenuNav = (page: Page) => {
    onNavigate(page);
    setIsUserMenuOpen(false);
  }

  const handleLogoutClick = () => {
    onLogout();
    setIsUserMenuOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef]);
  
  const getNavClass = (page: Page) => {
     return currentPage === page ? 'text-gray-900 underline' : 'text-gray-500 hover:text-gray-900 hover:underline';
  }

  return (
    <header className="bg-white border-b border-gray-200 relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={() => handleNavClick('home')} className="flex-shrink-0 flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-green-500">Zil</span>
              <span className="text-2xl font-bold text-black">STORAGE</span>
            </button>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <button onClick={() => handleNavClick('home')} className={`text-base font-medium ${getNavClass('home')}`}>Início</button>
              <button onClick={() => handleNavClick('favorites')} className={`text-base font-medium ${getNavClass('favorites')}`}>Meus Jogos Salvos</button>
              <button onClick={() => handleNavClick('about')} className={`text-base font-medium ${getNavClass('about')}`}>Sobre nós</button>
              <button onClick={() => handleNavClick('help')} className={`text-base font-medium ${getNavClass('help')}`}>Ajuda</button>
              {showAdminLink && (
                <button onClick={() => handleNavClick('admin')} className={`text-base font-medium ${getNavClass('admin')}`}>Administrador</button>
              )}
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
             <div className="relative">
                 <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <input
                 type="text"
                 placeholder="Buscar..."
                 className="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-48 focus:outline-none focus:ring-2 focus:ring-green-500"
                 value={searchQuery}
                 onChange={(e) => onSearchChange(e.target.value)}
                 />
             </div>
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                  <UserIcon className="w-6 h-6 text-gray-600" />
                  <span className="font-medium text-gray-700 text-sm hidden lg:inline">{currentUser?.name.split(' ')[0]}</span>
                  <ChevronDownIcon className={`w-4 h-4 text-gray-600 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isUserMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button onClick={() => handleUserMenuNav('profile')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Meu Perfil</button>
                      <button onClick={handleLogoutClick} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sair</button>
                    </div>
                  </div>
                )}
              </div>
         </div>
         <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>
         </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-20">
            <div className="shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <button onClick={() => handleNavClick('home')} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Início</button>
                    <button onClick={() => handleNavClick('favorites')} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Meus Jogos Salvos</button>
                    <button onClick={() => handleNavClick('about')} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Sobre nós</button>
                    <button onClick={() => handleNavClick('help')} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Ajuda</button>
                    {showAdminLink && (
                        <button onClick={() => handleNavClick('admin')} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Administrador</button>
                    )}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="px-5 mb-3">
                         <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                            type="text"
                            placeholder="Buscar..."
                            className="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="px-2 space-y-2">
                       <button onClick={() => handleUserMenuNav('profile')} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Meu Perfil</button>
                        <button 
                            onClick={handleLogoutClick}
                            className="w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
