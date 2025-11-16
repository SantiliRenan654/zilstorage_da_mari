import React, { useEffect } from 'react';
import { Game } from '../types';

interface GameDetailsModalProps {
  game: Game;
  onClose: () => void;
}

const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ game, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleObtainClick = () => {
    if (game.obtainLink) {
        window.open(game.obtainLink, '_blank');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <img src={game.image} alt={game.name} className="w-full md:w-1/3 h-64 md:h-auto object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none" />
        
        <div className="p-8 text-white flex flex-col flex-grow">
          <div className="flex-grow">
            <h2 id="modal-title" className="text-3xl lg:text-4xl font-bold text-shadow-custom mb-4 text-green-400">{game.name}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">{game.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
                <p><span className="font-semibold text-gray-200">Data de lançamento:</span> {game.launchDate}</p>
                <p><span className="font-semibold text-gray-200">Desenvolvedor:</span> {game.developer}</p>
                <p><span className="font-semibold text-gray-200">Classificação:</span> {game.classification}</p>
                <p><span className="font-semibold text-gray-200">Habilidades:</span> {game.skills}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={handleObtainClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              Obter Jogo
            </button>
            <button 
              onClick={onClose} 
              className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsModal;
