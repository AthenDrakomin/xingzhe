export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  order: number;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface PageFormData {
  title: string;
  content: string;
  order: number;
  status: 'draft' | 'published';
}