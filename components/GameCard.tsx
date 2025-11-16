import React from 'react';
import { Game } from '../types';
import { useAuth } from '../contexts/AuthContext';
import HeartIcon from './icons/HeartIcon';


interface GameCardProps {
  game: Game;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: (id: number) => void;
  onShowDetails: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isAdmin, onEdit, onDelete, onShowDetails }) => {
  const { currentUser, toggleFavoriteGame } = useAuth();
  const isFavorited = currentUser?.favorites.includes(game.id) ?? false;

  const handleObtainClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (game.obtainLink) {
        window.open(game.obtainLink, '_blank');
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteGame(game.id);
  };
  
  const handleAdminAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  }


  return (
    <div onClick={() => onShowDetails(game)} className="flex flex-col md:flex-row items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 rounded-lg shadow-lg border-t border-b border-gray-700 cursor-pointer hover:border-green-500/50 transition-all duration-300">
      <div className="relative flex-shrink-0">
        <img src={game.image} alt={game.name} className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg" />
        {!isAdmin && (
           <button
            onClick={handleFavoriteClick}
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            className="absolute top-2 right-2 p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors z-10"
          >
            <HeartIcon 
              filled={isFavorited} 
              className={`w-5 h-5 ${isFavorited ? 'text-green-400' : 'text-white'}`} 
            />
          </button>
        )}
      </div>
      
      <div className="flex-grow text-center md:text-left mt-4 md:mt-0 md:ml-6 text-white">
        <h2 className="text-2xl md:text-3xl font-bold font-sans text-shadow-custom">{game.name}</h2>
        <h3 className="text-sm font-semibold text-gray-300 mt-2 mb-1">Sobre o jogo</h3>
        <p className="text-xs text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0 line-clamp-2">{game.description}</p>
        <div className="text-xs text-gray-500 mt-3 space-y-1">
          <p><span className="font-semibold">Data de lançamento:</span> {game.launchDate}</p>
          <p><span className="font-semibold">Desenvolvedor:</span> {game.developer}</p>
        </div>
      </div>
      <div className="flex flex-row md:flex-col items-center justify-center space-x-3 md:space-x-0 md:space-y-3 mt-4 md:mt-0 md:ml-6 w-full md:w-auto">
        {isAdmin ? (
          <>
            <button 
              onClick={(e) => handleAdminAction(e, onEdit)}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-8 rounded-md transition-colors w-full text-sm"
            >
              Editar
            </button>
            <button 
              onClick={(e) => handleAdminAction(e, () => onDelete(game.id))}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-8 rounded-md transition-colors w-full text-sm"
            >
              Excluir
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleObtainClick}
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-8 rounded-md border border-gray-600 transition-colors w-full md:w-auto"
            >
              Obter
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameCard;