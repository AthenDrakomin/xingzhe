import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
  isAdmin: boolean;
}

// 初始状态
const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  isAdmin: false
};

// 自定义认证Hook
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // 监听认证状态变化
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // 从Firestore获取用户详细信息
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          let user: User;
          
          if (userDoc.exists()) {
            // 用户存在，使用数据库中的信息
            const userData = userDoc.data();
            user = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: userData.name || firebaseUser.displayName || 'User',
              role: userData.role || 'author',
              avatar: userData.avatar || firebaseUser.photoURL || undefined,
              createdAt: userData.createdAt?.toDate() || new Date(),
              lastLoginAt: new Date()
            };
          } else {
            // 用户不存在，创建默认用户信息
            user = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || 'User',
              role: 'author', // 默认为作者角色
              avatar: firebaseUser.photoURL || undefined,
              createdAt: new Date(),
              lastLoginAt: new Date()
            };
          }
          
          setAuthState({
            user,
            loading: false,
            error: null,
            isAdmin: user.role === 'admin'
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          // 使用简化用户信息
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'User',
            role: 'author',
            avatar: firebaseUser.photoURL || undefined,
            createdAt: new Date(),
            lastLoginAt: new Date()
          };
          
          setAuthState({
            user,
            loading: false,
            error: null,
            isAdmin: user.role === 'admin'
          });
        }
      } else {
        // 用户未登录
        setAuthState({
          user: null,
          loading: false,
          error: null,
          isAdmin: false
        });
      }
    });

    // 清理订阅
    return () => unsubscribe();
  }, []);

  // 登录
  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error as Error 
      }));
      throw error;
    }
  };

  // 登出
  const logout = async () => {
    try {
      await signOut(auth);
      setAuthState(initialState);
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        error: error as Error 
      }));
      throw error;
    }
  };

  return {
    ...authState,
    login,
    logout
  };
};