import React from 'react';
import { Game } from '../../types';

interface GameListProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (id: number) => void;
}

const GameList: React.FC<GameListProps> = ({ games, onEdit, onDelete }) => {
  return (
    <div className="bg-black/50 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-4">Jogos Existentes</h3>
        <div className="space-y-2">
        {games.map(game => (
            <div key={game.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-800 p-3 rounded-md">
                <p className="text-white mb-2 sm:mb-0">{game.name}</p>
                <div className="space-x-2 flex-shrink-0">
                    <button onClick={() => onEdit(game)} className="text-blue-400 hover:text-blue-300">Editar</button>
                    <button onClick={() => onDelete(game.id)} className="text-red-400 hover:text-red-300">Excluir</button>
                </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default GameList;