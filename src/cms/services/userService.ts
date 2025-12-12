import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { User } from '../types/user';

// 用户管理服务
export class UserService {
  private static readonly COLLECTION_NAME = 'users';

  // 获取所有用户
  static async getAllUsers(): Promise<User[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || undefined
        } as User;
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  // 根据ID获取用户
  static async getUserById(id: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, this.COLLECTION_NAME, id));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          id: userDoc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || undefined
        } as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  // 根据邮箱获取用户
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('email', '==', email)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const data = userDoc.data();
        return {
          id: userDoc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || undefined
        } as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Failed to fetch user by email');
    }
  }

  // 创建或更新用户
  static async saveUser(userData: Omit<User, 'id'>, userId: string): Promise<void> {
    try {
      const userRef = doc(db, this.COLLECTION_NAME, userId);
      await setDoc(userRef, {
        ...userData,
        createdAt: userData.createdAt || new Date(),
        lastLoginAt: userData.lastLoginAt || null
      }, { merge: true });
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Failed to save user');
    }
  }

  // 更新用户信息
  static async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    try {
      const userRef = doc(db, this.COLLECTION_NAME, userId);
      await updateDoc(userRef, updates);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  // 删除用户
  static async deleteUser(userId: string): Promise<void> {
    try {
      const userRef = doc(db, this.COLLECTION_NAME, userId);
      await deleteDoc(userRef);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  // 更新用户最后登录时间
  static async updateLastLogin(userId: string): Promise<void> {
    try {
      const userRef = doc(db, this.COLLECTION_NAME, userId);
      await updateDoc(userRef, {
        lastLoginAt: new Date()
      });
    } catch (error) {
      console.error('Error updating last login time:', error);
      throw new Error('Failed to update last login time');
    }
  }
}