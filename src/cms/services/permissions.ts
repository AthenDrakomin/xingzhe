import { User } from '../types/user.js';

// 权限检查服务
export class PermissionService {
  // 检查用户是否为管理员
  static isAdmin(user: User | null): boolean {
    return !!user && user.role === 'admin';
  }

  // 检查用户是否为编辑者
  static isEditor(user: User | null): boolean {
    return !!user && (user.role === 'admin' || user.role === 'editor');
  }

  // 检查用户是否为作者
  static isAuthor(user: User | null): boolean {
    return !!user && (user.role === 'admin' || user.role === 'editor' || user.role === 'author');
  }

  // 检查用户是否有权创建文章
  static canCreateArticle(user: User | null): boolean {
    return this.isEditor(user);
  }

  // 检查用户是否有权更新文章
  static canUpdateArticle(user: User | null, articleAuthorId?: string): boolean {
    if (!user) return false;
    
    // 管理员和编辑者可以更新任何文章
    if (this.isAdmin(user) || this.isEditor(user)) {
      return true;
    }
    
    // 作者只能更新自己的文章
    if (this.isAuthor(user) && articleAuthorId && user.id === articleAuthorId) {
      return true;
    }
    
    return false;
  }

  // 检查用户是否有权删除文章
  static canDeleteArticle(user: User | null): boolean {
    return this.isAdmin(user);
  }

  // 检查用户是否有权创建页面
  static canCreatePage(user: User | null): boolean {
    return this.isEditor(user);
  }

  // 检查用户是否有权更新页面
  static canUpdatePage(user: User | null): boolean {
    return this.isEditor(user);
  }

  // 检查用户是否有权删除页面
  static canDeletePage(user: User | null): boolean {
    return this.isAdmin(user);
  }

  // 检查用户是否有权管理媒体
  static canManageMedia(user: User | null): boolean {
    return !!user; // 所有认证用户都可以管理媒体
  }

  // 检查用户是否有权删除媒体
  static canDeleteMedia(user: User | null): boolean {
    return this.isAdmin(user);
  }
}