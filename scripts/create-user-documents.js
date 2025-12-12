import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase配置
const firebaseConfig = {
  apiKey: "AIzaSyBhewmDi9SojgYnglOGpyyodV62_c8RFyk",
  authDomain: "xingzhe-cms.firebaseapp.com",
  projectId: "xingzhe-cms",
  messagingSenderId: "459950634832",
  appId: "1:459950634832:web:26167383ddaaabb736de55"
};

// 初始化Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 用户数据
const usersData = [
  {
    email: 'athendrakomin@proton.me',
    password: 'author123',
    name: 'Athen Drakomin',
    role: 'author'
  },
  {
    email: 'guanyu432hz@gmail.com',
    password: 'user123',
    name: 'Guan Yu',
    role: 'user'
  }
];

// 为用户创建 Firestore 文档
async function createUserDocuments() {
  try {
    console.log('Creating user documents...');
    
    for (const userData of usersData) {
      try {
        // 用户登录
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        
        const user = userCredential.user;
        console.log(`Logged in as ${userData.email}`);
        
        // 检查用户文档是否已存在
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('email', '==', userData.email));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          // 用户文档不存在，创建新文档
          await setDoc(doc(usersCollection, user.uid), {
            id: user.uid,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            createdAt: new Date(),
            lastLoginAt: new Date()
          });
          
          console.log(`Created document for ${userData.email}`);
        } else {
          console.log(`Document already exists for ${userData.email}`);
        }
      } catch (error) {
        console.error(`Error processing user ${userData.email}:`, error);
      }
    }
    
    console.log('Finished creating user documents.');
  } catch (error) {
    console.error('Error creating user documents:', error);
  }
}

createUserDocuments();