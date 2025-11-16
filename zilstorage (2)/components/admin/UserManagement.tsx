import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserStatus } from '../../types';

const statusColors: { [key in UserStatus]: string } = {
  Ativo: 'bg-green-100 text-green-800',
  Bloqueado: 'bg-red-100 text-red-800',
  Pendente: 'bg-yellow-100 text-yellow-800',
};

const UserManagement: React.FC = () => {
  const { users, updateUserStatus, deleteUser } = useAuth();
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Senha</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.password}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[user.status]}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                {user.status === 'Pendente' && <button onClick={() => updateUserStatus(user.id, 'Ativo')} className="text-green-600 hover:text-green-900">Ativar</button>}
                {user.status === 'Ativo' && <button onClick={() => updateUserStatus(user.id, 'Bloqueado')} className="text-yellow-600 hover:text-yellow-900">Bloquear</button>}
                {user.status === 'Bloqueado' && <button onClick={() => updateUserStatus(user.id, 'Ativo')} className="text-blue-600 hover:text-blue-900">Desbloquear</button>}
                {!user.isAdmin && <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-900">Excluir</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
