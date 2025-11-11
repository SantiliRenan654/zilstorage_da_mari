import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserStatus } from '../types';

// Mock Data
const initialUsers: User[] = [
  { id: 1, name: 'Admin', email: 'admin@admin.com', password: 'admin', status: 'Ativo', isAdmin: true },
  { id: 2, name: 'Usuário #1', email: 'email@teste.com', password: '123', status: 'Ativo', isAdmin: false },
  { id: 3, name: 'Usuário #2', email: 'user2@teste.com', password: '123', status: 'Ativo', isAdmin: false },
  { id: 4, name: 'Usuário #3', email: 'user3@teste.com', password: '123', status: 'Bloqueado', isAdmin: false },
  { id: 5, name: 'Usuário #4', email: 'user4@teste.com', password: '123', status: 'Pendente', isAdmin: false },
  { id: 6, name: 'Mariana Batalha Mesquita', email: 'marybatalha2012@gmail.com', password: '12345678', status: 'Pendente', isAdmin: false },
];

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => { success: boolean, message?: string };
  logout: () => void;
  signup: (name: string, email: string, password: string) => { success: boolean, message?: string };
  updateUserStatus: (userId: number, status: UserStatus) => void;
  deleteUser: (userId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fix: Added a named interface for AuthProvider props to resolve children prop type error.
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
    };
    setUsers([...users, newUser]);
    return { success: true };
  };

  const updateUserStatus = (userId: number, status: UserStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status } : user
    ));
  };

  const deleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const value = { currentUser, users, login, logout, signup, updateUserStatus, deleteUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};