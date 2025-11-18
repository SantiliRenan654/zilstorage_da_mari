import React, { useState } from 'react';
import { User } from '../../types';

interface ProfileEditFormProps {
  currentUser: User;
  updateProfile: (userId: number, name: string, email: string) => { success: boolean, message?: string };
  renderMessage: (message: { type: string, text: string }) => React.ReactNode;
}

const statusColors: { [key: string]: string } = {
    Ativo: 'bg-green-100 text-green-800',
    Bloqueado: 'bg-red-100 text-red-800',
    Pendente: 'bg-yellow-100 text-yellow-800',
};

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ currentUser, updateProfile, renderMessage }) => {
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [editMessage, setEditMessage] = useState({ type: '', text: '' });

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

  return (
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
  );
};

export default ProfileEditForm;