import React from 'react';

interface DeleteAccountSectionProps {
  deleteSelf: () => void;
}

const DeleteAccountSection: React.FC<DeleteAccountSectionProps> = ({ deleteSelf }) => {
  const handleDeleteAccount = () => {
    if (window.confirm('Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      deleteSelf();
    }
  };

  return (
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
  );
};

export default DeleteAccountSection;