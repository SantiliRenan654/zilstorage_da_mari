
import React, { useState } from 'react';
import UserManagement from './admin/UserManagement';
import GameManagement from './admin/GameManagement';
import HelpMessagesManagement from './admin/HelpMessagesManagement';
import AdminSidebar from './admin/AdminSidebar';

const AdminPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'users' | 'games' | 'messages'>('users');

  return (
    <div className="flex flex-col lg:flex-row container mx-auto py-10 px-4 max-w-7xl">
      <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="w-full lg:w-3/4">
        {activeView === 'users' && <UserManagement />}
        {activeView === 'games' && <GameManagement />}
        {activeView === 'messages' && <HelpMessagesManagement />}
      </main>
    </div>
  );
};

export default AdminPage;
