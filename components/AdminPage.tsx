import React, { useState } from 'react';
import UserManagement from './admin/UserManagement';
import GameManagement from './admin/GameManagement';

const AdminPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'users' | 'games'>('users');

  return (
    <div className="flex flex-col lg:flex-row container mx-auto py-10 px-4 max-w-7xl">
      <aside className="w-full lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
        <div className="bg-[#2a2a2a] p-4 rounded-lg border border-white">
          <h2 className="text-lg font-bold text-white mb-4 border-b border-gray-600 pb-2">MENU</h2>
          <nav className="space-y-2">
            <button onClick={() => setActiveView('users')} className={`w-full text-left p-2 rounded ${activeView === 'users' ? 'bg-gray-700 text-white font-bold underline' : 'text-gray-300 hover:bg-gray-600'}`}>
              Usuário
            </button>
            <button onClick={() => setActiveView('games')} className={`w-full text-left p-2 rounded ${activeView === 'games' ? 'bg-gray-700 text-white font-bold underline' : 'text-gray-300 hover:bg-gray-600'}`}>
              Criar jogo
            </button>
          </nav>
        </div>
      </aside>
      <main className="w-full lg:w-3/4">
        {activeView === 'users' ? <UserManagement /> : <GameManagement />}
      </main>
    </div>
  );
};

export default AdminPage;
