import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile, changePassword, deleteSelf } = useAuth();
  
  // State for profile editing
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [editMessage, setEditMessage] = useState({ type: '', text: '' });
  
  // State for password change
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  
  if (!currentUser) {
    return null; // or a loading spinner
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMessage({ type: '', text: '' });
    const result = updateProfile(currentUser.id, name, email);
    if (result.success) {
      setEditMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
    } else {
      setEditMessage({ type: 'error', text: result.message || 'Falha ao atualizar o perfil.' });
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'As novas senhas não correspondem.' });
      return;
    }
    const result = changePassword(currentUser.id, oldPassword, newPassword);
    if (result.success) {
      setPasswordMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordMessage({ type: 'error', text: result.message || 'Falha ao alterar a senha.' });
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      deleteSelf();
    }
  };
  
  const statusColors: { [key: string]: string } = {
    Ativo: 'bg-green-100 text-green-800',
    Bloqueado: 'bg-red-100 text-red-800',
    Pendente: 'bg-yellow-100 text-yellow-800',
  };

  const renderMessage = (message: { type: string, text: string }) => {
    if (!message.text) return null;
    const isError = message.type === 'error';
    return (
      <p className={`text-sm text-center p-2 rounded ${isError ? 'bg-red-900/50 text-red-400' : 'bg-green-900/50 text-green-400'}`}>
        {message.text}
      </p>
    );
  };

  return (
    <main className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        Meu Perfil
      </h1>
      <div className="space-y-8">
        {/* Edit Profile Section */}
        <div className="bg-[#2a2a2a] p-6 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Informações da Conta</h2>
           <div className="mb-4">
             <span className="text-gray-400 mr-2">Status da conta:</span>
             <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${statusColors[currentUser.status]}`}>
                  {currentUser.status}
             </span>
           </div>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            {renderMessage(editMessage)}
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-300">Nome</label>
              <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300">E-mail</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
            <div className="text-right">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition-colors">Salvar Alterações</button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-[#2a2a2a] p-6 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Alterar Senha</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {renderMessage(passwordMessage)}
            <div>
              <label className="text-sm font-medium text-gray-300">Senha Atual</label>
              <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Nova Senha</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Confirmar Nova Senha</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
            <div className="text-right">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition-colors">Alterar Senha</button>
            </div>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="bg-[#2a2a2a] p-6 rounded-lg border border-red-500/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-red-400">Zona de Perigo</h2>
              <p className="text-gray-400 mt-2">
                A exclusão da sua conta é permanente e removerá todos os seus dados. Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button 
                onClick={handleDeleteAccount} 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors w-full md:w-auto"
              >
                Excluir Minha Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;