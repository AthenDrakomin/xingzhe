import { PermissionService } from '../services/permissions';
import { User } from '../types/user';

describe('Permission Service', () => {
  const adminUser: User = {
    id: '1',
    email: 'admin@test.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
  };

  const editorUser: User = {
    id: '2',
    email: 'editor@test.com',
    name: 'Editor User',
    role: 'editor',
    createdAt: new Date(),
  };

  const authorUser: User = {
    id: '3',
    email: 'author@test.com',
    name: 'Author User',
    role: 'author',
    createdAt: new Date(),
  };

  const anotherAuthorUser: User = {
    id: '4',
    email: 'author2@test.com',
    name: 'Another Author',
    role: 'author',
    createdAt: new Date(),
  };

  test('管理员权限检查', () => {
    expect(PermissionService.isAdmin(adminUser)).toBe(true);
    expect(PermissionService.isEditor(adminUser)).toBe(true);
    expect(PermissionService.isAuthor(adminUser)).toBe(true);
    
    expect(PermissionService.canCreateArticle(adminUser)).toBe(true);
    expect(PermissionService.canUpdateArticle(adminUser)).toBe(true);
    expect(PermissionService.canDeleteArticle(adminUser)).toBe(true);
    
    expect(PermissionService.canCreatePage(adminUser)).toBe(true);
    expect(PermissionService.canUpdatePage(adminUser)).toBe(true);
    expect(PermissionService.canDeletePage(adminUser)).toBe(true);
    
    expect(PermissionService.canManageMedia(adminUser)).toBe(true);
    expect(PermissionService.canDeleteMedia(adminUser)).toBe(true);
  });

  test('编辑者权限检查', () => {
    expect(PermissionService.isAdmin(editorUser)).toBe(false);
    expect(PermissionService.isEditor(editorUser)).toBe(true);
    expect(PermissionService.isAuthor(editorUser)).toBe(true);
    
    expect(PermissionService.canCreateArticle(editorUser)).toBe(true);
    expect(PermissionService.canUpdateArticle(editorUser)).toBe(true);
    expect(PermissionService.canDeleteArticle(editorUser)).toBe(false);
    
    expect(PermissionService.canCreatePage(editorUser)).toBe(true);
    expect(PermissionService.canUpdatePage(editorUser)).toBe(true);
    expect(PermissionService.canDeletePage(editorUser)).toBe(false);
    
    expect(PermissionService.canManageMedia(editorUser)).toBe(true);
    expect(PermissionService.canDeleteMedia(editorUser)).toBe(false);
  });

  test('作者权限检查', () => {
    expect(PermissionService.isAdmin(authorUser)).toBe(false);
    expect(PermissionService.isEditor(authorUser)).toBe(false);
    expect(PermissionService.isAuthor(authorUser)).toBe(true);
    
    expect(PermissionService.canCreateArticle(authorUser)).toBe(false);
    expect(PermissionService.canUpdateArticle(authorUser, authorUser.id)).toBe(true);
    expect(PermissionService.canUpdateArticle(authorUser, anotherAuthorUser.id)).toBe(false);
    expect(PermissionService.canDeleteArticle(authorUser)).toBe(false);
    
    expect(PermissionService.canCreatePage(authorUser)).toBe(false);
    expect(PermissionService.canUpdatePage(authorUser)).toBe(false);
    expect(PermissionService.canDeletePage(authorUser)).toBe(false);
    
    expect(PermissionService.canManageMedia(authorUser)).toBe(true);
    expect(PermissionService.canDeleteMedia(authorUser)).toBe(false);
  });

  test('未登录用户权限检查', () => {
    expect(PermissionService.isAdmin(null)).toBe(false);
    expect(PermissionService.isEditor(null)).toBe(false);
    expect(PermissionService.isAuthor(null)).toBe(false);
    
    expect(PermissionService.canCreateArticle(null)).toBe(false);
    expect(PermissionService.canUpdateArticle(null)).toBe(false);
    expect(PermissionService.canDeleteArticle(null)).toBe(false);
    
    expect(PermissionService.canCreatePage(null)).toBe(false);
    expect(PermissionService.canUpdatePage(null)).toBe(false);
    expect(PermissionService.canDeletePage(null)).toBe(false);
    
    expect(PermissionService.canManageMedia(null)).toBe(false);
    expect(PermissionService.canDeleteMedia(null)).toBe(false);
  });
});