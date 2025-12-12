# 无服务器CMS使用说明

## 目录结构

```
src/cms/
├── components/          # CMS组件
│   ├── admin/          # 管理后台组件
│   └── frontend/       # 前端展示组件
├── hooks/              # 自定义Hooks
├── services/           # 服务层
├── types/              # TypeScript类型定义
├── utils/              # 工具函数
├── styles/             # 样式文件
├── routes.tsx          # 路由配置
└── README.md           # 说明文档
```

## 快速开始

### 1. Firebase项目设置

1. 访问[Firebase控制台](https://console.firebase.google.com/)
2. 创建新项目或使用现有项目
3. 启用以下服务：
   - Firestore Database
   - Authentication (启用邮箱/密码登录)
   - Cloud Storage

### 2. 环境变量配置

复制 `.env.example` 文件并重命名为 `.env`，然后填入您的Firebase配置：

```bash
cp .env.example .env
```

在 `.env` 文件中填入从Firebase项目设置中获得的配置信息。

### 3. 数据库规则设置

将 `cms/firestore.rules` 和 `cms/storage.rules` 中的规则部署到Firebase。

## 功能特性

### 管理后台

- **文章管理**: 创建、编辑、删除博客文章
- **页面管理**: 管理静态页面内容
- **媒体库**: 上传和管理图片等媒体文件
- **用户认证**: 基于角色的访问控制

系统实现了基于角色的权限管理，详见 [权限系统说明](PERMISSIONS.md)。

### 前端展示

- **博客列表**: 显示所有已发布的文章
- **文章详情**: 展示单篇文章内容
- **页面渲染**: 动态渲染静态页面

## 开发指南

### 添加新内容类型

1. 在 `src/cms/types/` 中创建新的类型定义
2. 在 `src/cms/services/api.ts` 中添加相应的API方法
3. 创建对应的自定义Hook
4. 开发管理界面和前端展示组件

### 自定义样式

所有CMS组件使用与主应用一致的设计语言，可以在 `src/cms/styles/` 中添加自定义样式。

## 部署

### Firebase部署

```bash
# 安装Firebase CLI
npm install -g firebase-tools

# 登录Firebase
firebase login

# 部署到Firebase Hosting
firebase deploy
```

### GitHub Actions部署

项目包含GitHub Actions工作流，推送到main分支时会自动部署。

#### 配置密钥

为了安全地部署CMS，您需要在GitHub仓库设置中配置以下密钥：

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

这些密钥将用于构建过程中的环境变量。

#### 部署触发

当以下路径的文件发生更改时，将自动触发部署：

- `src/cms/**`
- `src/components/**`
- `index.html`
- `package.json`
- `vite.config.ts`

## 故障排除

### 常见问题

1. **无法加载内容**: 检查Firebase配置和网络连接
2. **权限错误**: 确认用户已正确登录并具有相应权限
3. **上传失败**: 检查文件大小限制和存储空间

### 支持

如有问题，请查看Firebase文档或联系项目维护者。