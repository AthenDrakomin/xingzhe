import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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

// 创建用户函数
async function createUser(email, password, name, role) {
  try {
    // 创建认证用户
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    
    const user = userCredential.user;
    
    // 创建用户文档
    await setDoc(doc(collection(db, 'users'), user.uid), {
      id: user.uid,
      email: email,
      name: name,
      role: role,
      createdAt: new Date(),
      lastLoginAt: new Date()
    });
    
    console.log(`User created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Name: ${name}`);
    console.log(`Role: ${role}`);
    console.log('---');
    
    return user;
  } catch (error) {
    console.error(`Error creating user ${email}:`, error);
    return null;
  }
}

// 创建多个用户
async function createMultipleUsers() {
  console.log('Creating users...');
  
  // 创建作者用户
  await createUser(
    'AthenDrakomin@proton.me', 
    'author123', 
    'Athen Drakomin', 
    'author'
  );
  
  // 创建普通用户
  await createUser(
    'guanyu432hz@gmail.com', 
    'user123', 
    'Guan Yu', 
    'user'
  );
  
  console.log('Finished creating users.');
}

createMultipleUsers();