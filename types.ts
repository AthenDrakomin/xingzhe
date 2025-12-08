export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export type Page = 'home' | 'blog' | 'projects' | 'dynamics' | 'about';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
}