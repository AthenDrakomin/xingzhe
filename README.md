# Digital Sanctuary (我的静室)

> "我也不是虔诚的基督教徒，我只是找不到妈妈，麻痹自己。而你也只是个假和尚，既心虚，又空虚。"

**我的静室 (Digital Sanctuary)** 是一个融合了现代 Web 技术与哲学思考的个人作品集网站。它不仅仅是一个展示项目的平台，更包含了一个独特的情感交互核心——**“同病相怜” (The Fake Monk)**，一个基于 Google Gemini API 的 AI 伴侣，用于探寻人机交互的情感边界。

## 🌌 特性 (Features)

*   **沉浸式美学**: 深度定制的黑色调 UI，结合动态光影、噪点纹理与极简线条，营造静谧的“静室”氛围。
*   **AI 哲学伴侣**: 集成 Gemini 2.5 Flash 模型，定制化 System Prompt（假和尚人设），提供富含哲理与共情的对话体验。
*   **流畅交互**: 采用 React + Vite 构建，配合 Tailwind CSS 实现丝滑的过渡动画与响应式设计。
*   **完全响应式**: 适配桌面端与移动端，提供原生般的浏览体验。
*   **无服务器CMS**: 内置基于Firebase的无服务器内容管理系统，支持文章、页面和媒体管理。
*   **基于角色的权限控制**: 支持管理员、编辑者和作者三种角色，提供细粒度的权限管理。
*   **现代化架构**: 采用React 18 + TypeScript技术栈，具有良好的类型安全和开发体验。

## 🛠 技术栈 (Tech Stack)

*   **核心框架**: React 18, TypeScript
*   **构建工具**: Vite
*   **样式方案**: Tailwind CSS (自定义动画, 排版)
*   **AI 模型**: Google Gemini API (`@google/genai`)
*   **CMS后端**: Firebase (Firestore, Authentication, Storage)
*   **状态管理**: React Hooks, SWR (数据获取和缓存)
*   **路由管理**: React Router v7
*   **部署环境**: GitHub Pages (GitHub Actions CI/CD)

## 🚀 本地开发 (Local Development)

### 1. 克隆仓库
```bash
git clone https://github.com/AthenDrakomin/xingzhe.git
cd xingzhe
```

### 2. 安装依赖
确保本地安装了 Node.js (推荐 v18+)。
```bash
npm install
```

### 3. 配置环境变量
在项目根目录创建一个 `.env` 文件。参考 `.env.example` 文件创建您的配置。

```bash
# 复制示例配置文件
 cp .env.example .env
```

然后在 `.env` 文件中填入您的实际配置：

```env
# .env
# Firebase配置
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

# Gemini API密钥
VITE_API_KEY=your_gemini_api_key

# AI提供商选择 (gemini 或 ollama)
VITE_AI_PROVIDER=gemini
```

### 4. 启动开发服务器
```bash
npm run dev
```
打开浏览器访问 `http://localhost:5173`。

### 5. AI提供商切换

本项目支持两种AI提供商：

1. **Google Gemini** (默认)
   - 需要Google API密钥
   - 在线服务，需要网络连接
   - 在 `.env` 文件中设置 `VITE_AI_PROVIDER=gemini`

2. **Ollama** (本地免费方案)
   - 完全免费，本地运行
   - 不需要网络连接
   - 在 `.env` 文件中设置 `VITE_AI_PROVIDER=ollama`

#### 使用Ollama的步骤：
1. 访问 https://ollama.com/ 下载并安装Ollama
2. 安装完成后，在终端运行：
   ```bash
   ollama run llama2-chinese
   ```
3. 在 `.env` 文件中设置 `VITE_AI_PROVIDER=ollama`

### 6. 常见问题排查

#### Firebase配置错误
如果您遇到 `Firebase: Error (auth/invalid-api-key)` 错误，请检查：
1. 确保 `.env` 文件已正确创建并包含有效的Firebase配置
2. 确保环境变量名称与 `.env.example` 文件中的名称完全一致
3. 重启开发服务器以使环境变量生效

#### 白屏问题
如果页面显示空白但控制台没有错误，请检查：
1. 确保所有必需的环境变量都已正确配置
2. 检查浏览器控制台是否有其他错误信息
3. 清除浏览器缓存并重新加载页面

### 6. 访问CMS管理后台
CMS管理后台可通过 `/cms` 路径访问。首次使用需要创建管理员账户并登录。

### 7. CMS开发

#### 目录结构
```bash
src/cms/
├── components/          # CMS组件
│   ├── admin/          # 管理后台组件
│   └── frontend/       # 前端展示组件
├── hooks/              # 自定义Hooks
├── services/           # 服务层
├── types/              # TypeScript类型定义
├── routes.tsx          # 路由配置
└── README.md           # CMS详细说明文档
```

#### 功能模块
- **文章管理**: 创建、编辑、删除博客文章，支持分类和标签
- **页面管理**: 管理静态页面内容，支持自定义路径
- **媒体库**: 上传和管理图片等媒体文件
- **用户管理**: 基于角色的用户权限管理（管理员、编辑者、作者）

#### 开发指南
1. 在 `src/cms/types/` 中创建新的类型定义
2. 在 `src/cms/services/api.ts` 中添加相应的API方法
3. 创建对应的自定义Hook
4. 开发管理界面和前端展示组件

## 📦 部署指南 (GitHub Pages)

本项目使用 GitHub Actions 工作流进行构建和部署到 GitHub Pages。

1.  **提交代码**到 GitHub 仓库。
2.  **配置密钥**:
    *   进入仓库 **Settings** -> **Secrets and variables** -> **Actions**。
    *   点击 **New repository secret**。
    *   Name: `VITE_API_KEY`
    *   Value: 你的 Google Gemini API Key。
    *   对于CMS功能，还需要配置Firebase密钥：
        - `FIREBASE_API_KEY`
        - `FIREBASE_AUTH_DOMAIN`
        - `FIREBASE_PROJECT_ID`
        - `FIREBASE_STORAGE_BUCKET`
        - `FIREBASE_MESSAGING_SENDER_ID`
        - `FIREBASE_APP_ID`
3.  **禁用自动部署**:
    *   进入仓库 **Settings** -> **Pages**。
    *   在 **Build and deployment** 部分，将 **Source** 设置为 **GitHub Actions**。
    *   要禁用任何旧的部署源（如 pages-build-deployment）以避免冲突。
4.  **配置 Pages**:
    *   在 **Settings** -> **Pages** 中，将 **Source** 设置为 **GitHub Actions**。
5.  **触发部署**:
    *   推送代码到 `main` 分支，或者在 Actions 标签页手动触发 "Clean Deploy to GitHub Pages" 工作流。

### 8. CMS部署注意事项

1. **Firebase项目设置**:
   - 访问[Firebase控制台](https://console.firebase.google.com/)
   - 创建新项目或使用现有项目
   - 启用以下服务：
     - Firestore Database
     - Authentication (启用邮箱/密码登录)
     - Cloud Storage

2. **数据库规则设置**:
   - 将 `firebase.rules` 文件中的规则部署到Firebase Firestore
   - 将 `cms/storage.rules` 文件中的规则部署到Firebase Storage

3. **自动部署触发**:
   当以下路径的文件发生更改时，将自动触发部署：
   - `src/cms/**`
   - `src/components/**`
   - `index.html`
   - `package.json`
   - `vite.config.ts`

## 9. 🔐 权限系统

本CMS系统实现了基于角色的访问控制(RBAC)，支持三种用户角色：

1. **管理员 (admin)**:
   - 拥有系统的最高权限
   - 可以管理所有内容（文章、页面、媒体）
   - 可以管理用户账户和权限
   - 可以删除任何内容

2. **编辑者 (editor)**:
   - 可以创建、编辑和删除文章
   - 可以创建、编辑和删除页面
   - 可以上传和管理媒体文件
   - 不能管理用户账户

3. **作者 (author)**:
   - 可以创建文章
   - 只能编辑自己创建的文章
   - 可以上传和管理媒体文件
   - 不能删除文章或页面
   - 不能管理用户账户

详细的权限矩阵和实现细节请参阅 [CMS权限系统说明](src/cms/PERMISSIONS.md)。

## 10. 🧪 测试

本项目包含完整的测试套件，确保系统的稳定性和可靠性：

### 测试类型

1. **路由测试**: 验证所有路由配置正确性
2. **API服务测试**: 验证API服务结构完整性
3. **权限验证测试**: 验证权限控制逻辑正确性
4. **单元测试**: 使用Jest框架进行核心逻辑测试

### 运行测试

```bash
# 运行所有测试
npm run test

# 运行单元测试
npm run test:unit
```

详细的测试计划和执行步骤请参阅 [CMS测试计划](src/cms/TESTING.md) 和 [测试总结报告](src/cms/TEST_SUMMARY.md)。

## 11. 🤝 开源贡献

欢迎任何形式的贡献！如果你有任何想法或建议，请提交 Issue 或 Pull Request。

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 12. 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解更多详情。