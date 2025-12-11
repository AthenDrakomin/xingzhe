# 无服务器CMS数据模型设计

## 1. 数据模型

### 1.1 文章模型 (Article)
```typescript
interface Article {
  id: string;           // 文章唯一标识
  title: string;        // 标题
  slug: string;         // URL友好标识
  content: string;      // Markdown格式内容
  excerpt: string;      // 摘要
  coverImage?: string;  // 封面图片URL
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags: string[];       // 标签
  category: string;     // 分类
  status: 'draft' | 'published' | 'archived'; // 状态
  createdAt: Date;      // 创建时间
  updatedAt: Date;      // 更新时间
  publishedAt?: Date;   // 发布时间
  views: number;        // 浏览量
}
```

### 1.2 页面模型 (Page)
```typescript
interface Page {
  id: string;           // 页面唯一标识
  title: string;        // 标题
  slug: string;         // URL友好标识
  content: string;      // Markdown格式内容
  order: number;        // 排序
  status: 'draft' | 'published'; // 状态
  createdAt: Date;      // 创建时间
  updatedAt: Date;      // 更新时间
  publishedAt?: Date;   // 发布时间
}
```

### 1.3 媒体模型 (Media)
```typescript
interface Media {
  id: string;           // 媒体唯一标识
  filename: string;     // 文件名
  url: string;          // 访问URL
  mimeType: string;     // MIME类型
  size: number;         // 文件大小
  altText?: string;     // 替代文本
  caption?: string;     // 说明文字
  uploadedBy: string;   // 上传者
  createdAt: Date;      // 上传时间
}
```

### 1.4 用户模型 (User)
```typescript
interface User {
  id: string;           // 用户唯一标识
  email: string;        // 邮箱
  name: string;         // 姓名
  role: 'admin' | 'editor' | 'author'; // 角色
  avatar?: string;      // 头像URL
  createdAt: Date;      // 创建时间
  lastLoginAt?: Date;   // 最后登录时间
}
```

## 2. API接口设计

### 2.1 文章相关接口
```
GET    /api/articles          // 获取文章列表
GET    /api/articles/:slug    // 获取单篇文章
POST   /api/articles          // 创建文章
PUT    /api/articles/:id      // 更新文章
DELETE /api/articles/:id      // 删除文章
```

### 2.2 页面相关接口
```
GET    /api/pages             // 获取页面列表
GET    /api/pages/:slug       // 获取单个页面
POST   /api/pages             // 创建页面
PUT    /api/pages/:id         // 更新页面
DELETE /api/pages/:id         // 删除页面
```

### 2.3 媒体相关接口
```
GET    /api/media             // 获取媒体列表
POST   /api/media             // 上传媒体
DELETE /api/media/:id         // 删除媒体
```

### 2.4 用户认证接口
```
POST   /api/auth/login        // 用户登录
POST   /api/auth/logout       // 用户登出
GET    /api/auth/me           // 获取当前用户信息
```

## 3. 技术选型建议

### 3.1 后端服务
- **Firebase Firestore**: 作为无服务器数据库存储内容
- **Firebase Authentication**: 用户认证和权限管理
- **Firebase Cloud Functions**: 无服务器函数处理API逻辑
- **Firebase Storage**: 存储媒体文件

### 3.2 前端集成
- **React Query/SWR**: 数据获取和缓存
- **Markdown渲染库**: 如react-markdown渲染文章内容
- **富文本编辑器**: 如Toast UI Editor或Markdown编辑器

### 3.3 部署方案
- **GitHub Actions**: 自动化部署流程
- **Firebase Hosting**: 静态文件托管