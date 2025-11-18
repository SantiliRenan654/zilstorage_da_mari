
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHelp } from '../contexts/HelpContext';

const HelpPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { addMessage } = useHelp();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentUser) {
        addMessage({
            name: currentUser.name,
            email: currentUser.email,
            subject,
            message
        });
    }

    // Show success message and reset form
    setStatusMessage('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
    setSubject('');
    setMessage('');

    // Clear message after a few seconds
    setTimeout(() => {
        setStatusMessage('');
    }, 5000);
  };
  

  return (
    <main className="container mx-auto py-12 md:py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        Central de Ajuda
      </h1>
       <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Tem alguma dúvida, sugestão ou encontrou algum problema? Preencha o formulário abaixo e nossa equipe entrará em contato.
      </p>
      
      <div className="max-w-3xl mx-auto bg-[#2a2a2a] p-6 sm:p-8 rounded-lg border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          {statusMessage && (
            <div className="p-3 rounded-md bg-green-900/50 text-green-300 text-center text-sm">
              {statusMessage}
            </div>
          )}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-300">Nome</label>
              <input 
                id="name" 
                type="text" 
                value={currentUser?.name || ''} 
                className="mt-1 w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-gray-400 cursor-not-allowed" 
                readOnly 
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300">E-mail</label>
              <input 
                id="email" 
                type="email" 
                value={currentUser?.email || ''} 
                className="mt-1 w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-gray-400 cursor-not-allowed" 
                readOnly 
              />
            </div>
          </div>
         
          <div>
            <label htmlFor="subject" className="text-sm font-medium text-gray-300">Assunto</label>
            <input 
              id="subject" 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: Dúvida sobre um jogo"
              className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
              required 
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-gray-300">Sua Mensagem</label>
            <textarea 
              id="message" 
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem aqui..."
              className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
              required
            ></textarea>
          </div>

          <div className="text-right">
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md transition-colors"
            >
              Enviar Mensagem
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default HelpPage;
