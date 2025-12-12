export interface ArticleAuthor {
  id: string;
  name: string;
  avatar?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: ArticleAuthor;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  views: number;
}

export interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
}