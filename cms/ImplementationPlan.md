# 无服务器CMS核心功能模块实现计划

## 1. 项目结构规划

```
src/
├── cms/
│   ├── components/          # CMS组件
│   │   ├── admin/           # 管理后台组件
│   │   │   ├── ArticleList.tsx
│   │   │   ├── ArticleEditor.tsx
│   │   │   ├── PageList.tsx
│   │   │   ├── PageEditor.tsx
│   │   │   └── MediaManager.tsx
│   │   └── frontend/        # 前端展示组件
│   │       ├── ArticlePreview.tsx
│   │       ├── ArticleDetail.tsx
│   │       └── PageRenderer.tsx
│   ├── hooks/               # 自定义Hooks
│   │   ├── useArticles.ts
│   │   ├── usePages.ts
│   │   └── useMedia.ts
│   ├── services/            # 服务层
│   │   ├── firebase.ts      # Firebase配置和初始化
│   │   ├── api.ts          # API服务封装
│   │   └── auth.ts         # 认证服务
│   ├── utils/               # 工具函数
│   │   ├── markdown.ts     # Markdown处理工具
│   │   └── validators.ts   # 数据验证工具
│   ├── types/              # TypeScript类型定义
│   │   ├── article.ts
│   │   ├── page.ts
│   │   ├── media.ts
│   │   └── user.ts
│   └── styles/             # CMS样式
│       └── admin.css
└── components/             # 现有组件（保持不变）
```

## 2. 核心模块实现顺序

### 2.1 Firebase集成模块
1. 创建Firebase项目配置
2. 初始化Firebase SDK
3. 配置Firestore安全规则
4. 设置Authentication认证

### 2.2 数据模型和服务层
1. 实现Article数据模型
2. 实现Page数据模型
3. 实现Media数据模型
4. 创建对应的API服务

### 2.3 自定义Hooks
1. useArticles Hook（获取文章列表、单篇文章）
2. usePages Hook（获取页面列表、单个页面）
3. useMedia Hook（获取媒体列表）

### 2.4 前端展示组件
1. ArticlePreview组件（文章预览）
2. ArticleDetail组件（文章详情）
3. PageRenderer组件（页面渲染）

### 2.5 管理后台组件
1. ArticleList组件（文章列表管理）
2. ArticleEditor组件（文章编辑器）
3. PageList组件（页面列表管理）
4. PageEditor组件（页面编辑器）
5. MediaManager组件（媒体管理）

### 2.6 认证和权限模块
1. 登录/登出功能
2. 权限检查机制
3. 用户角色管理

## 3. 关键技术实现要点

### 3.1 Firebase集成
```typescript
// services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Firebase配置
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 3.2 数据获取Hook示例
```typescript
// hooks/useArticles.ts
import useSWR from 'swr';
import { getArticles, getArticleBySlug } from '../services/api';

export const useArticles = () => {
  const { data, error, isLoading } = useSWR('articles', getArticles);
  return {
    articles: data,
    isLoading,
    isError: error
  };
};

export const useArticle = (slug: string) => {
  const { data, error, isLoading } = useSWR(`article-${slug}`, () => getArticleBySlug(slug));
  return {
    article: data,
    isLoading,
    isError: error
  };
};
```

### 3.3 Markdown渲染组件
```tsx
// components/frontend/ArticleDetail.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ArticleDetail = ({ article }) => {
  return (
    <div className="article-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {article.content}
      </ReactMarkdown>
    </div>
  );
};
```

### 3.4 文章编辑器组件
```tsx
// components/admin/ArticleEditor.tsx
import { Editor } from '@toast-ui/react-editor';

const ArticleEditor = ({ initialValue, onChange }) => {
  return (
    <Editor
      initialValue={initialValue}
      onChange={onChange}
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
    />
  );
};
```

## 4. 安全性和性能优化

### 4.1 Firestore安全规则
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 文章集合规则
    match /articles/{document} {
      // 所有人可读
      allow read: if true;
      // 仅认证用户可写
      allow write: if request.auth != null;
    }
    
    // 页面集合规则
    match /pages/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // 媒体集合规则
    match /media/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4.2 性能优化策略
1. 使用SWR进行数据缓存和重新验证
2. 实现分页加载大数据集
3. 图片懒加载和响应式处理
4. 使用React.memo优化组件渲染
5. 代码分割和动态导入

## 5. 测试策略

### 5.1 单元测试
- 数据模型验证测试
- API服务函数测试
- 工具函数测试

### 5.2 集成测试
- Firebase集成测试
- 组件渲染测试
- 用户交互测试

### 5.3 端到端测试
- 内容创建和发布流程
- 用户权限验证
- 数据一致性检查

## 6. 部署和监控

### 6.1 GitHub Actions工作流
```yaml
name: Deploy CMS
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
```

### 6.2 监控和日志
- Firebase Analytics集成
- 错误跟踪和报告
- 性能监控
- 用户行为分析