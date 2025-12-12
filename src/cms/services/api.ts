import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  Timestamp 
} from 'firebase/firestore';
import { Article, ArticleFormData } from '../types/article';
import { Page, PageFormData } from '../types/page';
import { Media } from '../types/media';

// 转换Firestore时间戳为JavaScript日期
const convertTimestamp = (timestamp: any): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return timestamp;
};

// 文章相关API
export const articleApi = {
  // 获取所有文章
  getAll: async (): Promise<Article[]> => {
    const q = query(
      collection(db, 'articles'),
      orderBy('publishedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
        publishedAt: data.publishedAt ? convertTimestamp(data.publishedAt) : undefined
      };
    });
  },

  // 根据slug获取文章
  getBySlug: async (slug: string): Promise<Article | null> => {
    const q = query(
      collection(db, 'articles'),
      where('slug', '==', slug),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    const data = doc.data() as any;
    return {
      id: doc.id,
      ...data,
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
      publishedAt: data.publishedAt ? convertTimestamp(data.publishedAt) : undefined
    };
  },

  // 创建文章
  create: async (data: ArticleFormData, author: { id: string; name: string }): Promise<string> => {
    const docRef = await addDoc(collection(db, 'articles'), {
      ...data,
      author,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 0
    });
    return docRef.id;
  },

  // 更新文章
  update: async (id: string, data: Partial<ArticleFormData>): Promise<void> => {
    const docRef = doc(db, 'articles', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  },

  // 删除文章
  delete: async (id: string): Promise<void> => {
    const docRef = doc(db, 'articles', id);
    await deleteDoc(docRef);
  }
};

// 页面相关API
export const pageApi = {
  // 获取所有页面
  getAll: async (): Promise<Page[]> => {
    const q = query(
      collection(db, 'pages'),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
        publishedAt: data.publishedAt ? convertTimestamp(data.publishedAt) : undefined
      };
    });
  },

  // 根据slug获取页面
  getBySlug: async (slug: string): Promise<Page | null> => {
    const q = query(
      collection(db, 'pages'),
      where('slug', '==', slug),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    const data = doc.data() as any;
    return {
      id: doc.id,
      ...data,
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: convertTimestamp(data.updatedAt),
      publishedAt: data.publishedAt ? convertTimestamp(data.publishedAt) : undefined
    };
  },

  // 创建页面
  create: async (data: PageFormData): Promise<string> => {
    const docRef = await addDoc(collection(db, 'pages'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  // 更新页面
  update: async (id: string, data: Partial<PageFormData>): Promise<void> => {
    const docRef = doc(db, 'pages', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  },

  // 删除页面
  delete: async (id: string): Promise<void> => {
    const docRef = doc(db, 'pages', id);
    await deleteDoc(docRef);
  }
};

// 媒体相关API - 修改为使用Base64编码存储图片数据
export const mediaApi = {
  // 创建媒体记录（不上传文件，而是存储Base64数据）
  create: async (data: Omit<Media, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'media'), {
      ...data,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  // 获取所有媒体
  getAll: async (): Promise<Media[]> => {
    const q = query(
      collection(db, 'media'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt)
      };
    });
  },

  // 删除媒体
  delete: async (id: string): Promise<void> => {
    const docRef = doc(db, 'media', id);
    await deleteDoc(docRef);
  }
};