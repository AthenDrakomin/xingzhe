export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'author';
  avatar?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}