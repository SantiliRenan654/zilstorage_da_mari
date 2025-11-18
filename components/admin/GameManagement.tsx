import React, { useState } from 'react';
import { Game } from '../../types';
import { useGames } from '../../contexts/GameContext';
import GameForm from './GameForm';
import GameList from './GameList';

const emptyGame: Omit<Game, 'id'> = {
  name: '', image: '', description: '', launchDate: '',
  developer: '', classification: 'Livre', skills: '', obtainLink: ''
};

const GameManagement: React.FC = () => {
  const { games, addGame, updateGame, deleteGame } = useGames();
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState<Omit<Game, 'id'>>(emptyGame);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditGameClick = (game: Game) => {
    setEditingGame(game);
    setFormData(game);
    window.scrollTo(0, 0);
  };

  const handleCancelEdit = () => {
    setEditingGame(null);
    setFormData(emptyGame);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGame) {
      updateGame({ ...formData, id: editingGame.id });
    } else {
      addGame(formData);
    }
    handleCancelEdit();
  };

  return (
    <div className="space-y-6">
      <GameForm 
        formData={formData} 
        isEditing={!!editingGame} 
        handleInputChange={handleInputChange} 
        handleFormSubmit={handleFormSubmit} 
        handleCancelEdit={handleCancelEdit} 
      />
      <GameList 
        games={games} 
        onEdit={handleEditGameClick} 
        onDelete={deleteGame} 
      />
    </div>
  );
};

export default GameManagement;