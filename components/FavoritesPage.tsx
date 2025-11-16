import React from 'react';
import GameCard from './GameCard';
import { useGames } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { Page, Game } from '../types';

interface FavoritesPageProps {
  searchQuery: string;
  onNavigate: (page: Page) => void;
  onShowDetails: (game: Game) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ searchQuery, onNavigate, onShowDetails }) => {
  const { games, deleteGame } = useGames();
  const { currentUser } = useAuth();

  const favoritedGames = games.filter(game => 
    currentUser?.favorites.includes(game.id)
  );

  const filteredGames = favoritedGames.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="w-full max-w-5xl mx-auto py-12 px-4 space-y-px">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        Meus Jogos Salvos
      </h1>
      {filteredGames.length > 0 ? (
        filteredGames.map(game => (
          <GameCard
            key={game.id}
            game={game}
            isAdmin={currentUser?.isAdmin || false}
            onEdit={() => onNavigate('admin')}
            onDelete={deleteGame}
            onShowDetails={onShowDetails}
          />
        ))
      ) : (
        <div className="text-center py-20">
            {searchQuery ? (
                 <p className="text-white text-lg">Nenhum jogo salvo encontrado para "{searchQuery}".</p>
            ) : (
                <p className="text-white text-lg">Você ainda não salvou nenhum jogo.</p>
            )}
        </div>
      )}
    </main>
  );
};

export default FavoritesPage;
