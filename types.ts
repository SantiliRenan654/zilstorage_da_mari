export interface Game {
  id: number;
  name: string;
  image: string;
  description: string;
  // Fix: Changed launchDate type from Date to string to match mock data and component usage.
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
  // Fix: Corrected typo in password property definition.
  password: string;
  status: UserStatus;
  isAdmin: boolean;
  favorites: number[];
}

export type Page = 'login' | 'signup' | 'home' | 'about' | 'admin' | 'profile' | 'favorites' | 'help' | 'dashboard';