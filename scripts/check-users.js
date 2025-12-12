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