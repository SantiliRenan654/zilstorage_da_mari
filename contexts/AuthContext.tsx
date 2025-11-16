import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserStatus } from '../types';

// Mock Data
const initialUsers: User[] = [
  { id: 1, name: 'Admin', email: 'admin@admin.com', password: 'admin', status: 'Ativo', isAdmin: true, favorites: [1, 3] },
  { id: 2, name: 'Usuário #1', email: 'email@teste.com', password: '123', status: 'Ativo', isAdmin: false, favorites: [2] },
  { id: 3, name: 'Usuário #2', email: 'user2@teste.com', password: '123', status: 'Ativo', isAdmin: false, favorites: [] },
  { id: 4, name: 'Usuário #3', email: 'user3@teste.com', password: '123', status: 'Bloqueado', isAdmin: false, favorites: [] },
  { id: 5, name: 'Usuário #4', email: 'user4@teste.com', password: '123', status: 'Pendente', isAdmin: false, favorites: [] },
  { id: 6, name: 'Mariana Batalha Mesquita', email: 'marybatalha2012@gmail.com', password: '12345678', status: 'Pendente', isAdmin: false, favorites: [] },
];

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => { success: boolean, message?: string };
  logout: () => void;
  signup: (name: string, email: string, password: string) => { success: boolean, message?: string };
  updateUserStatus: (userId: number, status: UserStatus) => void;
  deleteUser: (userId: number) => void;
  updateProfile: (userId: number, name: string, email: string) => { success: boolean, message?: string };
  changePassword: (userId: number, oldPass: string, newPass: string) => { success: boolean, message?: string };
  deleteSelf: () => void;
  toggleFavoriteGame: (gameId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const login = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      if (user.status === 'Ativo') {
        setCurrentUser(user);
        return { success: true };
      }
      return { success: false, message: 'Sua conta está pendente ou bloqueada.' };
    }
    return { success: false, message: 'E-mail ou senha inválidos.' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const signup = (name: string, email: string, password: string) => {
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
      favorites: []
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    return { success: true };
  };

  const updateUserStatus = (userId: number, status: UserStatus) => {
    setUsers(prevUsers => prevUsers.map(user =>
      user.id === userId ? { ...user, status } : user
    ));
  };

  const deleteUser = (userId: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };
  
  const updateProfile = (userId: number, name: string, email: string) => {
    if (users.some(user => user.email === email && user.id !== userId)) {
        return { success: false, message: 'Este e-mail já está em uso por outra conta.' };
    }
    
    setUsers(prevUsers => {
        const updatedUsers = prevUsers.map(user =>
          user.id === userId ? { ...user, name, email } : user
        );
        if (currentUser?.id === userId) {
            const updatedCurrentUser = updatedUsers.find(u => u.id === userId);
            if(updatedCurrentUser) setCurrentUser(updatedCurrentUser);
        }
        return updatedUsers;
    });
    
    return { success: true };
  };

  const changePassword = (userId: number, oldPass: string, newPass: string) => {
      const user = users.find(u => u.id === userId);
      if (!user || user.password !== oldPass) {
          return { success: false, message: 'A senha atual está incorreta.' };
      }
      
      setUsers(prevUsers => {
          const updatedUsers = prevUsers.map(u => 
              u.id === userId ? { ...u, password: newPass } : u
          );
           if (currentUser?.id === userId) {
              const updatedCurrentUser = updatedUsers.find(u => u.id === userId);
              if(updatedCurrentUser) setCurrentUser(updatedCurrentUser);
          }
          return updatedUsers;
      });

      return { success: true };
  };

  const deleteSelf = () => {
      if (currentUser) {
          deleteUser(currentUser.id);
          logout();
      }
  };

  const toggleFavoriteGame = (gameId: number) => {
      if (!currentUser) return;
      
      setUsers(prevUsers => {
          const user = prevUsers.find(u => u.id === currentUser.id);
          if (!user) return prevUsers;

          const isFavorited = user.favorites.includes(gameId);
          const newFavorites = isFavorited
            ? user.favorites.filter(id => id !== gameId)
            : [...user.favorites, gameId];
            
          const updatedUsers = prevUsers.map(u => 
              u.id === currentUser.id ? { ...u, favorites: newFavorites } : u
          );

          const updatedCurrentUser = updatedUsers.find(u => u.id === currentUser.id);
          if(updatedCurrentUser) setCurrentUser(updatedCurrentUser);
          
          return updatedUsers;
      });
  };


  const value = { currentUser, users, login, logout, signup, updateUserStatus, deleteUser, updateProfile, changePassword, deleteSelf, toggleFavoriteGame };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};