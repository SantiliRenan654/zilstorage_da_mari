import React, { useState } from 'react';
import { User, Game, UserStatus } from '../types';

interface AdminPageProps {
  users: User[];
  onUpdateUserStatus: (userId: number, status: UserStatus) => void;
  onDeleteUser: (userId: number) => void;
  games: Game[];
  onAddGame: (game: Omit<Game, 'id'>) => void;
  onUpdateGame: (game: Game) => void;
  onDeleteGame: (gameId: number) => void;
}

const statusColors: { [key in UserStatus]: string } = {
  Ativo: 'bg-green-100 text-green-800',
  Bloqueado: 'bg-red-100 text-red-800',
  Pendente: 'bg-yellow-100 text-yellow-800',
};

const emptyGame: Omit<Game, 'id'> = {
  name: '',
  image: '',
  description: '',
  launchDate: '',
  developer: '',
  classification: 'Livre',
  skills: '',
  obtainLink: ''
};

const AdminPage: React.FC<AdminPageProps> = ({ 
  users, onUpdateUserStatus, onDeleteUser,
  games, onAddGame, onUpdateGame, onDeleteGame
}) => {
  const [activeView, setActiveView] = useState<'users' | 'games'>('users');
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState<Omit<Game, 'id'>>(emptyGame);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditGameClick = (game: Game) => {
    setEditingGame(game);
    setFormData(game);
    window.scrollTo(0, 0); // Scroll to top for better UX on mobile
  };

  const handleCancelEdit = () => {
    setEditingGame(null);
    setFormData(emptyGame);
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGame) {
      onUpdateGame({ ...formData, id: editingGame.id });
    } else {
      onAddGame(formData);
    }
    handleCancelEdit();
  };


  const renderUserManagement = () => (
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
                {user.status === 'Pendente' && <button onClick={() => onUpdateUserStatus(user.id, 'Ativo')} className="text-green-600 hover:text-green-900">Ativar</button>}
                {user.status === 'Ativo' && <button onClick={() => onUpdateUserStatus(user.id, 'Bloqueado')} className="text-yellow-600 hover:text-yellow-900">Bloquear</button>}
                {user.status === 'Bloqueado' && <button onClick={() => onUpdateUserStatus(user.id, 'Ativo')} className="text-blue-600 hover:text-blue-900">Desbloquear</button>}
                {!user.isAdmin && <button onClick={() => onDeleteUser(user.id)} className="text-red-600 hover:text-red-900">Excluir</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

 const renderGameManagement = () => (
    <div className="space-y-6">
      <div className="bg-[#3c3c3c] p-4 md:p-6 rounded-lg border border-white">
        <h2 className="text-2xl font-bold text-white mb-4">{editingGame ? 'Editar Jogo' : 'Adicionar Novo Jogo'}</h2>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-500 mb-4">
              {formData.image ? <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-lg"/> : <span className="text-5xl text-gray-500">+</span>}
            </div>
             <input type="text" name="image" placeholder="URL da Imagem" value={formData.image} onChange={handleInputChange} className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-600 text-sm" />
          </div>

          <div className="md:col-span-3 grid grid-cols-1 gap-4">
            <input type="text" name="name" placeholder="Tema do jogo" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600" required />
            <textarea name="description" placeholder="Descrição do jogo" value={formData.description} onChange={handleInputChange} className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600 h-24" required></textarea>
            <input type="text" name="launchDate" placeholder="Data de lançamento" value={formData.launchDate} onChange={handleInputChange} className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600" required />
            <input type="text" name="developer" placeholder="Desenvolvedor" value={formData.developer} onChange={handleInputChange} className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600" required />
            <input type="text" name="obtainLink" placeholder="Link do botão obter" value={formData.obtainLink} onChange={handleInputChange} className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600" required />

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                {editingGame && <button type="button" onClick={handleCancelEdit} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md">Cancelar</button>}
                <button type="submit" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-6 rounded-md">{editingGame ? 'Salvar Alterações' : 'Criar Jogo'}</button>
            </div>
          </div>
        </form>
      </div>

       <div className="bg-black/50 p-4 rounded-lg">
           <h3 className="text-xl font-bold text-white mb-4">Jogos Existentes</h3>
            <div className="space-y-2">
            {games.map(game => (
                <div key={game.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-800 p-3 rounded-md">
                    <p className="text-white mb-2 sm:mb-0">{game.name}</p>
                    <div className="space-x-2 flex-shrink-0">
                        <button onClick={() => handleEditGameClick(game)} className="text-blue-400 hover:text-blue-300">Editar</button>
                        <button onClick={() => onDeleteGame(game.id)} className="text-red-400 hover:text-red-300">Excluir</button>
                    </div>
                </div>
            ))}
            </div>
       </div>

    </div>
  );


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
        {activeView === 'users' ? renderUserManagement() : renderGameManagement()}
      </main>
    </div>
  );
};

export default AdminPage;