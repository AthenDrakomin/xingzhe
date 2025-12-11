// 测试运行脚本
console.log('CMS 测试套件');
console.log('=============\n');

// 运行路由测试
console.log('1. 运行路由测试...');
try {
  await import('./route-test.js');
} catch (error) {
  console.error('路由测试失败:', error.message);
}

// 运行API服务测试
console.log('\n2. 运行API服务测试...');
try {
  await import('./api-test.js');
} catch (error) {
  console.error('API服务测试失败:', error.message);
}

// 运行权限验证
console.log('\n3. 运行权限验证...');
try {
  await import('./validate-permissions.js');
} catch (error) {
  console.error('权限验证失败:', error.message);
}

// 运行单元测试
console.log('\n4. 运行单元测试...');
try {
  await import('./jest-runner.js');
} catch (error) {
  console.error('单元测试运行失败:', error.message);
}

console.log('\n所有测试运行完成!');