
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { HelpMessage } from '../types';

// Mock Data
const initialMessages: HelpMessage[] = [
  { 
    id: 1, 
    name: 'Usuário #1', 
    email: 'email@teste.com', 
    subject: 'Problema no login', 
    message: 'Não consigo acessar minha conta antiga, diz que a senha está incorreta mesmo após eu alterar.', 
    date: '15/05/2024' 
  },
  { 
    id: 2, 
    name: 'Mariana Batalha Mesquita', 
    email: 'marybatalha2012@gmail.com', 
    subject: 'Sugestão de jogo', 
    message: 'Olá! Adoro o site. Gostaria de sugerir a adição de jogos voltados para o ensino de física básica.', 
    date: '16/05/2024' 
  }
];

interface HelpContextType {
  messages: HelpMessage[];
  addMessage: (message: Omit<HelpMessage, 'id' | 'date'>) => void;
  deleteMessage: (id: number) => void;
}

const HelpContext = createContext<HelpContextType | undefined>(undefined);

interface HelpProviderProps {
  children: ReactNode;
}

export const HelpProvider = ({ children }: HelpProviderProps) => {
  const [messages, setMessages] = useState<HelpMessage[]>(initialMessages);

  const addMessage = (messageData: Omit<HelpMessage, 'id' | 'date'>) => {
    const newMessage: HelpMessage = {
      ...messageData,
      id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
      date: new Date().toLocaleDateString('pt-BR')
    };
    setMessages([newMessage, ...messages]);
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const value = { messages, addMessage, deleteMessage };

  return <HelpContext.Provider value={value}>{children}</HelpContext.Provider>;
};

export const useHelp = () => {
  const context = useContext(HelpContext);
  if (context === undefined) {
    throw new Error('useHelp must be used within a HelpProvider');
  }
  return context;
};
