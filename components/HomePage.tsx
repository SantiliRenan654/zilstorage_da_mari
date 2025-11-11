import React from 'react';
import GameCard from './GameCard';
import { useGames } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { Page } from '../types';

interface HomePageProps {
  searchQuery: string;
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ searchQuery, onNavigate }) => {
  const { games, deleteGame } = useGames();
  const { currentUser } = useAuth();

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="w-full max-w-5xl mx-auto py-12 px-4 space-y-px">
      {filteredGames.map(game => (
        <GameCard
          key={game.id}
          game={game}
          isAdmin={currentUser?.isAdmin || false}
          onEdit={() => onNavigate('admin')}
          onDelete={deleteGame}
        />
      ))}
    </main>
  );
};

export default HomePage;
