export interface Media {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  altText?: string;
  caption?: string;
  uploadedBy: string;
  createdAt: Date;
}

export interface MediaFormData {
  file: File;
  altText?: string;
  caption?: string;
}