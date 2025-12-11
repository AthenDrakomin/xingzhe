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

// New types for improved type safety
export interface NavItem {
  id: string;
  title: string;
  subtitle: string;
  path: Page;
  highlight?: boolean;
}

export interface SocialLink {
  id: string;
  href: string;
  label: string;
  icon: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight';
}