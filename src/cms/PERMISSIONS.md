# CMS 权限系统说明

## 角色定义

系统包含三种用户角色，每种角色具有不同的权限级别：

### 1. 管理员 (admin)
- 拥有系统的最高权限
- 可以管理所有内容（文章、页面、媒体）
- 可以管理用户账户和权限
- 可以删除任何内容

### 2. 编辑者 (editor)
- 可以创建、编辑和删除文章
- 可以创建、编辑和删除页面
- 可以上传和管理媒体文件
- 不能管理用户账户

### 3. 作者 (author)
- 可以创建文章
- 只能编辑自己创建的文章
- 可以上传和管理媒体文件
- 不能删除文章或页面
- 不能管理用户账户

## 权限矩阵

| 操作 | 管理员 | 编辑者 | 作者 |
|------|--------|--------|------|
| 创建文章 | ✓ | ✓ | ✓ |
| 编辑任意文章 | ✓ | ✓ | ✗ |
| 编辑自己的文章 | ✓ | ✓ | ✓ |
| 删除文章 | ✓ | ✗ | ✗ |
| 创建页面 | ✓ | ✓ | ✗ |
| 编辑页面 | ✓ | ✓ | ✗ |
| 删除页面 | ✓ | ✗ | ✗ |
| 上传媒体 | ✓ | ✓ | ✓ |
| 删除任意媒体 | ✓ | ✗ | ✗ |
| 管理用户 | ✓ | ✗ | ✗ |

## 实现细节

权限检查通过 `PermissionService` 类实现，该类提供了一系列静态方法来检查用户权限：

```typescript
// 检查用户是否为管理员
PermissionService.isAdmin(user)

// 检查用户是否可以创建文章
PermissionService.canCreateArticle(user)

// 检查用户是否可以更新特定文章
PermissionService.canUpdateArticle(user, articleAuthorId)

// 检查用户是否可以删除文章
PermissionService.canDeleteArticle(user)
```

## 安全规则

Firebase Firestore 和 Storage 的安全规则与应用层权限保持一致，确保即使在客户端被绕过的情况下也能保护数据安全。

### Firestore 规则示例
```
match /articles/{articleId} {
  // 所有认证用户可以读取已发布的文章
  allow read: if resource.data.status == 'published' || isAuthenticated();
  
  // 管理员和编辑者可以创建文章
  allow create: if isAdmin() || isEditor();
  
  // 管理员、编辑者和作者可以更新自己的文章
  allow update: if isAdmin() || 
                isEditor() || 
                (isAuthor() && request.auth.uid == resource.data.author.id);
  
  // 只有管理员可以删除文章
  allow delete: if isAdmin();
}
```

## 最佳实践

1. **始终在前端和后端进行权限检查**：不要仅依赖前端权限检查，后端也必须验证权限。

2. **使用最小权限原则**：为每个用户分配完成其工作所需的最低权限。

3. **定期审查用户权限**：定期检查用户权限设置，确保符合安全要求。

4. **记录敏感操作**：对涉及权限变更的重要操作进行日志记录。