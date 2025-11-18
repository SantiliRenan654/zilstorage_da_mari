import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileEditForm from './profile/ProfileEditForm';
import PasswordChangeForm from './profile/PasswordChangeForm';
import DeleteAccountSection from './profile/DeleteAccountSection';

const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile, changePassword, deleteSelf } = useAuth();
  
  if (!currentUser) {
    return null; 
  }

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
        <ProfileEditForm currentUser={currentUser} updateProfile={updateProfile} renderMessage={renderMessage} />
        <PasswordChangeForm currentUser={currentUser} changePassword={changePassword} renderMessage={renderMessage} />
        <DeleteAccountSection deleteSelf={deleteSelf} />
      </div>
    </main>
  );
};

export default ProfilePage;