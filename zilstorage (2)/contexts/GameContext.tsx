import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Game } from '../types';

// Mock Data
const initialGames: Game[] = [
    {
      id: 1,
      name: 'Duolingo',
      image: 'https://img.ibxk.com.br/2021/04/13/13111326402061.jpg?w=328',
      description: 'Duolingo é uma plataforma de ensino de idiomas que combina inteligência artificial, vídeos e conteúdo interativo para que você possa aprender inglês, espanhol, francês, alemão, italiano e outros idiomas com lições rápidas.',
      launchDate: '30/11/2011',
      developer: 'Duolingo, Inc.',
      classification: 'Livre',
      skills: 'Leitura, escrita e fala.',
      obtainLink: 'https://www.duolingo.com'
    },
    {
      id: 2,
      name: 'Proloqui2GO',
      image: 'https://i.ytimg.com/vi/wIcon-I19-I/maxresdefault.jpg',
      description: 'Proloquo2Go é um aplicativo AAC premiado que permite que pessoas com dificuldades de fala se comuniquem com clareza e confiança. Com a configuração de palavras na grade, ele é totalmente personalizável para atender às necessidades individuais de várias deficiências.',
      launchDate: '01/01/2009',
      developer: 'AssistiveWare',
      classification: 'Livre',
      skills: 'Comunicação',
      obtainLink: 'https://www.assistiveware.com/products/proloquo2go'
    },
     {
      id: 3,
      name: 'Minecraft',
      image: 'https://img.olhardigital.com.br/wp-content/uploads/2023/10/minecraft-personagens.jpg',
      description: 'Minecraft é um jogo eletrônico sandbox de sobrevivência criado pelo desenvolvedor sueco Markus "Notch" Persson e posteriormente desenvolvido e publicado pela Mojang Studios, cuja propriedade intelectual foi obtida pela Microsoft em 2014.',
      launchDate: '18/11/2011',
      developer: 'Mojang Studios',
      classification: 'Livre',
      skills: 'Criatividade, resolução de problemas',
      obtainLink: 'https://www.minecraft.net'
    },
    {
      id: 4,
      name: 'Khan Academy',
      image: 'https://pbs.twimg.com/profile_images/1222629734349283328/I49y542U_400x400.png',
      description: 'A Khan Academy é uma organização educacional sem fins lucrativos criada e sustentada por Salman Khan. Com a missão de fornecer educação de alta qualidade para qualquer um, em qualquer lugar, oferece exercícios, vídeos de instrução e um painel de aprendizado personalizado.',
      launchDate: '01/01/2008',
      developer: 'Khan Academy',
      classification: 'Livre',
      skills: 'Matemática, ciências, programação, etc.',
      obtainLink: 'https://www.khanacademy.org'
    }
  ];

interface GameContextType {
  games: Game[];
  addGame: (game: Omit<Game, 'id'>) => void;
  updateGame: (updatedGame: Game) => void;
  deleteGame: (gameId: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Fix: Added a named interface for GameProvider props to resolve children prop type error.
interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [games, setGames] = useState<Game[]>(initialGames);

  const addGame = (game: Omit<Game, 'id'>) => {
    const newGame = { ...game, id: games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1 };
    setGames([...games, newGame]);
  };

  const updateGame = (updatedGame: Game) => {
    setGames(games.map(game => (game.id === updatedGame.id ? updatedGame : game)));
  };

  const deleteGame = (gameId: number) => {
    setGames(games.filter(game => game.id !== gameId));
  };

  const value = { games, addGame, updateGame, deleteGame };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGames = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGames must be used within a GameProvider');
  }
  return context;
};