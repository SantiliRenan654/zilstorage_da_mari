import React, { useState } from 'react';
import { User } from '../../types';

interface PasswordChangeFormProps {
  currentUser: User;
  changePassword: (userId: number, oldPass: string, newPass: string) => { success: boolean, message?: string };
  renderMessage: (message: { type: string, text: string }) => React.ReactNode;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ currentUser, changePassword, renderMessage }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

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

  return (
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
  );
};

export default PasswordChangeForm;