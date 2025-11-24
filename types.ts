
export interface Game {
  id: number;
  name: string;
  image: string;
  description: string;
  launchDate: string;
  developer: string;
  classification: string;
  skills: string;
  obtainLink: string;
}

export type UserStatus = 'Ativo' | 'Bloqueado' | 'Pendente';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  isAdmin: boolean;
  favorites: number[];
}

export interface HelpMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export type Page = 'login' | 'signup' | 'home' | 'about' | 'admin' | 'profile' | 'favorites' | 'help' | 'dashboard';
