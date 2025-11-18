import React, { createContext, useContext, ReactNode } from 'react';
import { User, UserStatus } from '../types';
import { useAuthSource } from './useAuthSource';

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
  const authValues = useAuthSource();

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};