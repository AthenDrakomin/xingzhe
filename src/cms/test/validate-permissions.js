// 权限服务验证脚本
console.log('权限服务验证');
console.log('============\n');

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

// 手动实现权限检查逻辑
function isAdmin(user) {
  return !!user && user.role === 'admin';
}

function isEditor(user) {
  return !!user && (user.role === 'admin' || user.role === 'editor');
}

function isAuthor(user) {
  return !!user && (user.role === 'admin' || user.role === 'editor' || user.role === 'author');
}

function canCreateArticle(user) {
  return isEditor(user);
}

function canUpdateArticle(user, articleAuthorId) {
  if (!user) return false;
  
  // 管理员和编辑者可以更新任何文章
  if (isAdmin(user) || isEditor(user)) {
    return true;
  }
  
  // 作者只能更新自己的文章
  if (isAuthor(user) && articleAuthorId && user.id === articleAuthorId) {
    return true;
  }
  
  return false;
}

function canDeleteArticle(user) {
  return isAdmin(user);
}

function canCreatePage(user) {
  return isEditor(user);
}

function canUpdatePage(user) {
  return isEditor(user);
}

function canDeletePage(user) {
  return isAdmin(user);
}

function canManageMedia(user) {
  return !!user; // 所有认证用户都可以管理媒体
}

function canDeleteMedia(user) {
  return isAdmin(user);
}

// 测试函数
function runValidation() {
  console.log('1. 管理员权限验证:');
  console.log('isAdmin:', isAdmin(adminUser));
  console.log('isEditor:', isEditor(adminUser));
  console.log('isAuthor:', isAuthor(adminUser));
  console.log('canCreateArticle:', canCreateArticle(adminUser));
  console.log('canDeleteArticle:', canDeleteArticle(adminUser));
  console.log('canCreatePage:', canCreatePage(adminUser));
  console.log('canDeletePage:', canDeletePage(adminUser));
  console.log('canManageMedia:', canManageMedia(adminUser));
  console.log('canDeleteMedia:', canDeleteMedia(adminUser));
  console.log('');
  
  console.log('2. 编辑者权限验证:');
  console.log('isAdmin:', isAdmin(editorUser));
  console.log('isEditor:', isEditor(editorUser));
  console.log('isAuthor:', isAuthor(editorUser));
  console.log('canCreateArticle:', canCreateArticle(editorUser));
  console.log('canDeleteArticle:', canDeleteArticle(editorUser));
  console.log('canCreatePage:', canCreatePage(editorUser));
  console.log('canDeletePage:', canDeletePage(editorUser));
  console.log('canManageMedia:', canManageMedia(editorUser));
  console.log('canDeleteMedia:', canDeleteMedia(editorUser));
  console.log('');
  
  console.log('3. 作者权限验证:');
  console.log('isAdmin:', isAdmin(authorUser));
  console.log('isEditor:', isEditor(authorUser));
  console.log('isAuthor:', isAuthor(authorUser));
  console.log('canCreateArticle:', canCreateArticle(authorUser));
  console.log('canUpdateArticle (own):', canUpdateArticle(authorUser, authorUser.id));
  console.log('canUpdateArticle (other):', canUpdateArticle(authorUser, anotherAuthorUser.id));
  console.log('canDeleteArticle:', canDeleteArticle(authorUser));
  console.log('canCreatePage:', canCreatePage(authorUser));
  console.log('canDeletePage:', canDeletePage(authorUser));
  console.log('canManageMedia:', canManageMedia(authorUser));
  console.log('canDeleteMedia:', canDeleteMedia(authorUser));
  console.log('');
  
  console.log('4. 未登录用户验证:');
  console.log('isAdmin:', isAdmin(null));
  console.log('isEditor:', isEditor(null));
  console.log('isAuthor:', isAuthor(null));
  console.log('canCreateArticle:', canCreateArticle(null));
  console.log('canDeleteArticle:', canDeleteArticle(null));
  console.log('canCreatePage:', canCreatePage(null));
  console.log('canDeletePage:', canDeletePage(null));
  console.log('canManageMedia:', canManageMedia(null));
  console.log('canDeleteMedia:', canDeleteMedia(null));
  console.log('');
  
  console.log('权限服务验证完成!');
}

// 运行验证
runValidation();