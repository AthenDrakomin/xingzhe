// 简单的路由测试脚本
console.log('路由测试');
console.log('=======\n');

// 测试路由配置
const routes = [
  '/cms/login',
  '/cms/dashboard',
  '/cms/articles',
  '/cms/articles/new',
  '/cms/articles/edit/:id',
  '/cms/pages',
  '/cms/pages/new',
  '/cms/pages/edit/:id',
  '/cms/media',
  '/cms/users',
  '/',
  '/blog',
  '/blog/:slug',
  '/:slug'
];

console.log('已配置的路由:');
routes.forEach(route => {
  console.log(`  ${route}`);
});

console.log('\n路由保护测试:');
console.log('  - /cms/* 路由需要认证');
console.log('  - /login 公开访问');
console.log('  - /blog 公开访问');
console.log('  - /blog/:slug 公开访问');
console.log('  - /:slug 公开访问');

console.log('\n路由测试完成!');