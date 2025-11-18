
import React, { useState } from 'react';
import { useHelp } from '../../contexts/HelpContext';
import { HelpMessage } from '../../types';
import HelpMessageModal from './HelpMessageModal';

const HelpMessagesManagement: React.FC = () => {
  const { messages, deleteMessage } = useHelp();
  const [selectedMessage, setSelectedMessage] = useState<HelpMessage | null>(null);

  return (
    <div className="space-y-6">
      {selectedMessage && (
        <HelpMessageModal 
            message={selectedMessage} 
            onClose={() => setSelectedMessage(null)} 
        />
      )}

      <h2 className="text-2xl font-bold text-white mb-4">Mensagens de Ajuda</h2>
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assunto</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.length > 0 ? (
                messages.map((msg) => (
                <tr key={msg.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{msg.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex flex-col">
                            <span>{msg.name}</span>
                            <span className="text-xs text-gray-400">{msg.email}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="max-w-xs truncate" title={msg.subject}>{msg.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => setSelectedMessage(msg)} className="text-blue-600 hover:text-blue-900">Ler</button>
                    <button onClick={() => deleteMessage(msg.id)} className="text-red-600 hover:text-red-900">Excluir</button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                        Nenhuma mensagem encontrada.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HelpMessagesManagement;
