import React from 'react';

// --- Ícones SVG Personalizados ---

const IconSparkles: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

const IconTarget: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

const IconPlay: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
    </svg>
);

const IconCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const AboutPage: React.FC = () => {
  return (
    <main className="container mx-auto py-12 md:py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-20 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Sobre a Biblioteca de Jogos Educacionais
        </h1>
        
        <div className="space-y-16 max-w-5xl mx-auto">
            
            {/* Seção 1: O que é? */}
            <div className="flex flex-col md:flex-row items-center bg-slate-900 p-6 md:p-8 rounded-lg border border-gray-700/50 transition-all duration-300 ease-in-out hover:border-green-400/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10 text-green-400">
                    <IconSparkles className="w-20 h-20 md:w-24 md:h-24" />
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-green-300">O que é a Biblioteca?</h3>
                    <p className="text-gray-300 leading-relaxed">Uma plataforma que reúne e indica jogos online projetados para fins acadêmicos, visando auxiliar estudantes e entusiastas a aprimorarem seus conhecimentos em diversas áreas do saber.</p>
                </div>
            </div>

            {/* Seção 2: Propósito */}
            <div className="flex flex-col md:flex-row-reverse items-center bg-slate-900 p-6 md:p-8 rounded-lg border border-gray-700/50 transition-all duration-300 ease-in-out hover:border-green-400/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:ml-10 text-green-400">
                    <IconTarget className="w-20 h-20 md:w-24 md:h-24" />
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-green-300">Nosso propósito</h3>
                    <p className="text-gray-300 leading-relaxed">Tornar o processo de estudo mais dinâmico e envolvente, oferecendo uma seleção de jogos que complementam o aprendizado tradicional e incentivam o desenvolvimento de habilidades essenciais para o sucesso acadêmico.</p>
                </div>
            </div>

            {/* Seção 3: Áreas de estudo */}
            <div className="bg-slate-900 p-6 md:p-8 rounded-lg border border-gray-700/50 transition-all duration-300 ease-in-out hover:border-green-400/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10">
               <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-300">Áreas de estudo e habilidades</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-6 text-gray-300 max-w-2xl mx-auto">
                  <div className="flex items-center space-x-3"><IconCheck className="w-5 h-5 text-green-400"/><span>Matemática e Raciocínio Lógico</span></div>
                  <div className="flex items-center space-x-3"><IconCheck className="w-5 h-5 text-green-400"/><span>Ciências Naturais e Exatas</span></div>
                  <div className="flex items-center space-x-3"><IconCheck className="w-5 h-5 text-green-400"/><span>Linguagens e Comunicação</span></div>
                  <div className="flex items-center space-x-3"><IconCheck className="w-5 h-5 text-green-400"/><span>História e Ciências Humanas</span></div>
               </div>
            </div>

             {/* Seção 4: Como funciona? */}
            <div className="flex flex-col md:flex-row items-center bg-slate-900 p-6 md:p-8 rounded-lg border border-gray-700/50 transition-all duration-300 ease-in-out hover:border-green-400/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10 text-green-400">
                    <IconPlay className="w-20 h-20 md:w-24 md:h-24" />
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-green-300">Como a plataforma funciona?</h3>
                    <p className="text-gray-300 leading-relaxed">Explore uma variedade de jogos, navegando por categorias e faixas etárias. Cada jogo é selecionado para garantir uma experiência de aprendizado eficaz e divertida. Clique no botão "Obter" para ser direcionado ao link do jogo e comece a aprender agora mesmo.</p>
                </div>
            </div>

        </div>
    </main>
  );
};

export default AboutPage;