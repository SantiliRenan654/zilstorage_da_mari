import React from 'react';
import GameCard from './GameCard';
import { useGames } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { Page, Game } from '../types';

interface HomePageProps {
  searchQuery: string;
  onNavigate: (page: Page) => void;
  onShowDetails: (game: Game) => void;
}

const HomePage: React.FC<HomePageProps> = ({ searchQuery, onNavigate, onShowDetails }) => {
  const { games, deleteGame } = useGames();
  const { currentUser } = useAuth();

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="w-full max-w-5xl mx-auto py-12 px-4 space-y-px">
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
          <p className="text-white text-lg">Nenhum jogo encontrado para "{searchQuery}".</p>
        </div>
      )}
    </main>
  );
};

export default HomePage;
