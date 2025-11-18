
import React from 'react';

interface AdminSidebarProps {
  activeView: 'users' | 'games' | 'messages';
  setActiveView: (view: 'users' | 'games' | 'messages') => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeView, setActiveView }) => {
  const getButtonClass = (view: 'users' | 'games' | 'messages') => 
    `w-full text-left p-2 rounded ${activeView === view ? 'bg-gray-700 text-white font-bold underline' : 'text-gray-300 hover:bg-gray-600'}`;

  return (
    <aside className="w-full lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
      <div className="bg-[#2a2a2a] p-4 rounded-lg border border-white">
        <h2 className="text-lg font-bold text-white mb-4 border-b border-gray-600 pb-2">MENU</h2>
        <nav className="space-y-2">
          <button onClick={() => setActiveView('users')} className={getButtonClass('users')}>
            Usuário
          </button>
          <button onClick={() => setActiveView('games')} className={getButtonClass('games')}>
            Criar jogo
          </button>
          <button onClick={() => setActiveView('messages')} className={getButtonClass('messages')}>
            Mensagens de Ajuda
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
