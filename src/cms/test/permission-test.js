// 简单的权限测试脚本
import { PermissionService } from '../services/permissions.js';

// 模拟用户对象
const adminUser = {
  id: '1',
  email: 'admin@test.com',
  name: 'Admin User',
  role: 'admin',
  createdAt: new Date(),
};

const editorUser = {
  id: '2',
  email: 'editor@test.com',
  name: 'Editor User',
  role: 'editor',
  createdAt: new Date(),
};

const authorUser = {
  id: '3',
  email: 'author@test.com',
  name: 'Author User',
  role: 'author',
  createdAt: new Date(),
};

const anotherAuthorUser = {
  id: '4',
  email: 'author2@test.com',
  name: 'Another Author',
  role: 'author',
  createdAt: new Date(),
};

// 测试函数
function runTests() {
  console.log('开始权限测试...\n');
  
  // 管理员权限测试
  console.log('1. 管理员权限测试:');
  console.log('isAdmin:', PermissionService.isAdmin(adminUser));
  console.log('isEditor:', PermissionService.isEditor(adminUser));
  console.log('isAuthor:', PermissionService.isAuthor(adminUser));
  console.log('canCreateArticle:', PermissionService.canCreateArticle(adminUser));
  console.log('canDeleteArticle:', PermissionService.canDeleteArticle(adminUser));
  console.log('canCreatePage:', PermissionService.canCreatePage(adminUser));
  console.log('canDeletePage:', PermissionService.canDeletePage(adminUser));
  console.log('canManageMedia:', PermissionService.canManageMedia(adminUser));
  console.log('canDeleteMedia:', PermissionService.canDeleteMedia(adminUser));
  console.log('');
  
  // 编辑者权限测试
  console.log('2. 编辑者权限测试:');
  console.log('isAdmin:', PermissionService.isAdmin(editorUser));
  console.log('isEditor:', PermissionService.isEditor(editorUser));
  console.log('isAuthor:', PermissionService.isAuthor(editorUser));
  console.log('canCreateArticle:', PermissionService.canCreateArticle(editorUser));
  console.log('canDeleteArticle:', PermissionService.canDeleteArticle(editorUser));
  console.log('canCreatePage:', PermissionService.canCreatePage(editorUser));
  console.log('canDeletePage:', PermissionService.canDeletePage(editorUser));
  console.log('canManageMedia:', PermissionService.canManageMedia(editorUser));
  console.log('canDeleteMedia:', PermissionService.canDeleteMedia(editorUser));
  console.log('');
  
  // 作者权限测试
  console.log('3. 作者权限测试:');
  console.log('isAdmin:', PermissionService.isAdmin(authorUser));
  console.log('isEditor:', PermissionService.isEditor(authorUser));
  console.log('isAuthor:', PermissionService.isAuthor(authorUser));
  console.log('canCreateArticle:', PermissionService.canCreateArticle(authorUser));
  console.log('canUpdateArticle (own):', PermissionService.canUpdateArticle(authorUser, authorUser.id));
  console.log('canUpdateArticle (other):', PermissionService.canUpdateArticle(authorUser, anotherAuthorUser.id));
  console.log('canDeleteArticle:', PermissionService.canDeleteArticle(authorUser));
  console.log('canCreatePage:', PermissionService.canCreatePage(authorUser));
  console.log('canDeletePage:', PermissionService.canDeletePage(authorUser));
  console.log('canManageMedia:', PermissionService.canManageMedia(authorUser));
  console.log('canDeleteMedia:', PermissionService.canDeleteMedia(authorUser));
  console.log('');
  
  // 未登录用户测试
  console.log('4. 未登录用户测试:');
  console.log('isAdmin:', PermissionService.isAdmin(null));
  console.log('isEditor:', PermissionService.isEditor(null));
  console.log('isAuthor:', PermissionService.isAuthor(null));
  console.log('canCreateArticle:', PermissionService.canCreateArticle(null));
  console.log('canDeleteArticle:', PermissionService.canDeleteArticle(null));
  console.log('canCreatePage:', PermissionService.canCreatePage(null));
  console.log('canDeletePage:', PermissionService.canDeletePage(null));
  console.log('canManageMedia:', PermissionService.canManageMedia(null));
  console.log('canDeleteMedia:', PermissionService.canDeleteMedia(null));
  console.log('');
  
  console.log('权限测试完成!');
}

// 运行测试
runTests();