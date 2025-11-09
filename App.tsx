import React, { useState, useEffect } from 'react';
import { Game, User, Page, UserStatus } from './types';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminPage from './components/AdminPage';
import AboutPage from './components/AboutPage';
import GameCard from './components/GameCard';

// Mock Data
const initialUsers: User[] = [
  { id: 1, name: 'Admin', email: 'admin@admin.com', password: 'admin', status: 'Ativo', isAdmin: true },
  { id: 2, name: 'Usuário #1', email: 'email@teste.com', password: '123', status: 'Ativo', isAdmin: false },
  { id: 3, name: 'Usuário #2', email: 'user2@teste.com', password: '123', status: 'Ativo', isAdmin: false },
  { id: 4, name: 'Usuário #3', email: 'user3@teste.com', password: '123', status: 'Bloqueado', isAdmin: false },
  { id: 5, name: 'Usuário #4', email: 'user4@teste.com', password: '123', status: 'Pendente', isAdmin: false },
  { id: 6, name: 'Mariana Batalha Mesquita', email: 'marybatalha2012@gmail.com', password: '12345678', status: 'Pendente', isAdmin: false },
];

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

function App() {
  const [page, setPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [games, setGames] = useState<Game[]>(initialGames);
  const [searchQuery, setSearchQuery] = useState('');

  // Set body background color based on current page
  useEffect(() => {
    document.body.className = 'font-sans'; // Reset classes
    if (!currentUser) {
        document.body.classList.add('bg-gray-200');
    } else if (page === 'home') {
        document.body.classList.add('bg-black');
    } else if (page === 'admin' || page === 'about') {
        document.body.classList.add('bg-slate-800');
    } else {
        document.body.classList.add('bg-gray-200');
    }
  }, [page, currentUser]);


  const handleLogin = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      if (user.status === 'Ativo') {
        setCurrentUser(user);
        setPage('home');
        return { success: true };
      }
      return { success: false, message: 'Sua conta está pendente ou bloqueada.' };
    }
    return { success: false, message: 'E-mail ou senha inválidos.' };
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setPage('login');
  };

  const handleSignup = (name: string, email: string, password: string) => {
    if (users.some(user => user.email === email)) {
      return { success: false, message: 'Este e-mail já está em uso.' };
    }
    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name,
      email,
      password,
      status: 'Pendente',
      isAdmin: false,
    };
    setUsers([...users, newUser]);
    return { success: true };
  };

  const handleUpdateUserStatus = (userId: number, status: UserStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status } : user
    ));
  };
  
  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };
  
  const handleAddGame = (game: Omit<Game, 'id'>) => {
    const newGame = { ...game, id: games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1 };
    setGames([...games, newGame]);
  };

  const handleUpdateGame = (updatedGame: Game) => {
    setGames(games.map(game => (game.id === updatedGame.id ? updatedGame : game)));
  };

  const handleDeleteGame = (gameId: number) => {
    setGames(games.filter(game => game.id !== gameId));
  };


  const handleNavigate = (newPage: Page) => {
    if (newPage === 'admin' && !currentUser?.isAdmin) {
      return; // Prevent non-admins from accessing admin page
    }
    setPage(newPage);
  }

  const renderContent = () => {
    switch (page) {
      case 'home':
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
                onEdit={() => {
                  // In a real app, you'd navigate to an edit form
                  handleNavigate('admin');
                }}
                onDelete={handleDeleteGame}
              />
            ))}
          </main>
        );
      case 'about':
        return <AboutPage />;
      case 'admin':
        if (currentUser?.isAdmin) {
          return (
            <AdminPage 
              users={users} 
              onUpdateUserStatus={handleUpdateUserStatus}
              onDeleteUser={handleDeleteUser}
              games={games}
              onAddGame={handleAddGame}
              onUpdateGame={handleUpdateGame}
              onDeleteGame={handleDeleteGame}
            />
          );
        }
        return null; // Or a "Not Authorized" component
      default:
        return null;
    }
  };


  if (!currentUser) {
    if (page === 'signup') {
        return <div className="min-h-screen flex items-center justify-center"><Signup onSignup={handleSignup} onNavigateToLogin={() => setPage('login')} /></div>;
    }
    return <div className="min-h-screen flex items-center justify-center"><Login onLogin={handleLogin} onNavigateToSignup={() => setPage('signup')} /></div>;
  }

  return (
    <div>
      <Header 
        onNavigate={handleNavigate} 
        onLogout={handleLogout} 
        showAdminLink={currentUser.isAdmin}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {renderContent()}
    </div>
  );
}

export default App;