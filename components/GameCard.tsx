import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  isAdmin: boolean;
  onEdit: (game: Game) => void;
  onDelete: (id: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isAdmin, onEdit, onDelete }) => {
  const handleObtainClick = () => {
    if (game.obtainLink) {
        window.open(game.obtainLink, '_blank');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 rounded-lg shadow-lg border-t border-b border-gray-700">
      <img src={game.image} alt={game.name} className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg flex-shrink-0" />
      <div className="flex-grow text-center md:text-left mt-4 md:mt-0 md:ml-6 text-white">
        <h2 className="text-2xl md:text-3xl font-bold font-sans text-shadow-custom">{game.name}</h2>
        <h3 className="text-sm font-semibold text-gray-300 mt-2 mb-1">Sobre o jogo</h3>
        <p className="text-xs text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">{game.description}</p>
        <div className="text-xs text-gray-500 mt-3 space-y-1">
          <p><span className="font-semibold">Data de lançamento:</span> {game.launchDate}</p>
          <p><span className="font-semibold">Desenvolvedor:</span> {game.developer}</p>
        </div>
      </div>
      <div className="flex flex-row md:flex-col items-center justify-center space-x-3 md:space-x-0 md:space-y-3 mt-4 md:mt-0 md:ml-6 w-full md:w-auto">
        {isAdmin ? (
          <>
            <button 
              onClick={() => onEdit(game)}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-8 rounded-md transition-colors w-full text-sm"
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete(game.id)}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-8 rounded-md transition-colors w-full text-sm"
            >
              Excluir
            </button>
          </>
        ) : (
          <button 
            onClick={handleObtainClick}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-8 rounded-md border border-gray-600 transition-colors w-full md:w-auto"
          >
            Obter
          </button>
        )}
      </div>
    </div>
  );
};

export default GameCard;