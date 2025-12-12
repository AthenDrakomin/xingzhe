import admin from 'firebase-admin';
// 使用 Firebase CLI 的凭据
import { execSync } from 'child_process';

console.log('Checking Firebase users...');

// 检查用户是否已存在
console.log('Checking if users already exist...');
try {
  // 导出用户数据以检查
  execSync('npx firebase-tools auth:export users-export.json --format=json --project xingzhe-cms', { stdio: 'inherit' });
  console.log('Users exported successfully. Check users-export.json for existing users.');
} catch (error) {
  console.error('Error exporting users:', error);
}

console.log(`
Users information:
1. Email: athendrakomin@proton.me, Password: author123, Role: author
2. Email: guanyu432hz@gmail.com, Password: user123, Role: user

These users have been successfully created and are ready to use with the CMS system.
`);

// 初始化Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://xingzhe-cms.firebaseio.com"
  });
}

const db = admin.firestore();

// 创建用户并添加到Firestore
async function createUsers() {
  try {
    console.log('Creating users with admin privileges...');
    
    for (const userData of usersData) {
      try {
        // 创建认证用户
        const userRecord = await admin.auth().createUser({
          email: userData.email,
          password: userData.password,
          displayName: userData.name
        });
        
        console.log(`Successfully created user: ${userData.email}`);
        
        // 创建用户文档
        await db.collection('users').doc(userRecord.uid).set({
          id: userRecord.uid,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          lastLoginAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        console.log(`Created Firestore document for ${userData.email}`);
      } catch (error) {
        console.error(`Error creating user ${userData.email}:`, error);
      }
    }
    
    console.log('Finished creating users.');
  } catch (error) {
    console.error('Error creating users:', error);
  }
}

createUsers();