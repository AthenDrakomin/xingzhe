// 调试环境变量
console.log('Environment Variables Check:');
console.log('========================');

// 检查 Firebase 环境变量
console.log('REACT_APP_FIREBASE_API_KEY:', process.env.REACT_APP_FIREBASE_API_KEY ? '[SET]' : '[NOT SET]');
console.log('REACT_APP_FIREBASE_AUTH_DOMAIN:', process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? '[SET]' : '[NOT SET]');
console.log('REACT_APP_FIREBASE_PROJECT_ID:', process.env.REACT_APP_FIREBASE_PROJECT_ID ? '[SET]' : '[NOT SET]');
console.log('REACT_APP_FIREBASE_MESSAGING_SENDER_ID:', process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ? '[SET]' : '[NOT SET]');
console.log('REACT_APP_FIREBASE_APP_ID:', process.env.REACT_APP_FIREBASE_APP_ID ? '[SET]' : '[NOT SET]');

// 检查所有以 REACT_APP_ 开头的环境变量
console.log('\nAll REACT_APP_* environment variables:');
Object.keys(process.env)
  .filter(key => key.startsWith('REACT_APP_'))
  .forEach(key => {
    console.log(`${key}: ${process.env[key] ? '[SET]' : '[NOT SET]'}`);
  });