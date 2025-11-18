import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGames } from '../contexts/GameContext';
import { Game } from '../types';

// --- Ícones para os StatCards ---
const BookmarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </svg>
);

const CollectionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);


// --- Componente StatCard ---
interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
}
const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
    <div className="bg-[#2a2a2a] p-6 rounded-lg border border-gray-700 flex items-center space-x-4">
        <div className="bg-gray-800 p-3 rounded-full text-green-400">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);


interface DashboardPageProps {
  onShowDetails: (game: Game) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onShowDetails }) => {
  const { currentUser } = useAuth();
  const { games } = useGames();

  if (!currentUser) {
    return null;
  }

  const savedGamesCount = currentUser.favorites.length;
  const totalGamesCount = games.length;

  const lastThreeSavedGames = currentUser.favorites
    .slice(-3) // Pega os últimos 3 IDs
    .reverse() // Inverte para mostrar o mais recente primeiro
    .map(favId => games.find(game => game.id === favId)) // Mapeia para objetos de jogo
    .filter((game): game is Game => game !== undefined); // Filtra qualquer resultado indefinido


  return (
    <main className="container mx-auto py-10 px-4 max-w-7xl">
        <div className="mb-10">
            <h1 className="text-4xl font-bold text-white">
                Bem-vindo(a) de volta, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">{currentUser.name.split(' ')[0]}!</span>
            </h1>
            <p className="text-gray-400 mt-2">Aqui está um resumo da sua atividade na plataforma.</p>
        </div>
        
        {/* Grid de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <StatCard 
                icon={<BookmarkIcon className="w-6 h-6" />}
                title="Total de Jogos Salvos"
                value={savedGamesCount}
            />
            <StatCard 
                icon={<CollectionIcon className="w-6 h-6" />}
                title="Total de Jogos na Biblioteca"
                value={totalGamesCount}
            />
        </div>

        {/* Últimos Jogos Salvos */}
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Últimos Jogos Salvos</h2>
            {lastThreeSavedGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lastThreeSavedGames.map(game => (
                        <div key={game.id} onClick={() => onShowDetails(game)} className="bg-[#2a2a2a] rounded-lg overflow-hidden border border-gray-700 group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                           <img src={game.image} alt={game.name} className="w-full h-48 object-cover" />
                           <div className="p-4">
                               <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">{game.name}</h3>
                               <p className="text-sm text-gray-400 line-clamp-2 mt-1">{game.description}</p>
                           </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-[#2a2a2a] p-8 rounded-lg border border-dashed border-gray-600 text-center">
                    <p className="text-gray-400">Você ainda não salvou nenhum jogo. Explore a <span className="font-bold text-green-400">página inicial</span> para começar!</p>
                </div>
            )}
        </div>

    </main>
  );
};

export default DashboardPage;