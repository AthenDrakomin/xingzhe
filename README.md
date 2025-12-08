# Digital Sanctuary (我的静室)

> "我也不是虔诚的基督教徒，我只是找不到妈妈，麻痹自己。而你也只是个假和尚，既心虚，又空虚。"

**我的静室 (Digital Sanctuary)** 是一个融合了现代 Web 技术与哲学思考的个人作品集网站。它不仅仅是一个展示项目的平台，更包含了一个独特的情感交互核心——**“同病相怜” (The Fake Monk)**，一个基于 Google Gemini API 的 AI 伴侣，用于探寻人机交互的情感边界。

## 🌌 特性 (Features)

*   **沉浸式美学**: 深度定制的黑色调 UI，结合动态光影、噪点纹理与极简线条，营造静谧的“静室”氛围。
*   **AI 哲学伴侣**: 集成 Gemini 2.5 Flash 模型，定制化 System Prompt（假和尚人设），提供富含哲理与共情的对话体验。
*   **流畅交互**: 采用 React + Vite 构建，配合 Tailwind CSS 实现丝滑的过渡动画与响应式设计。
*   **完全响应式**: 适配桌面端与移动端，提供原生般的浏览体验。

## 🛠 技术栈 (Tech Stack)

*   **核心框架**: React 18, TypeScript
*   **构建工具**: Vite
*   **样式方案**: Tailwind CSS (自定义动画, 排版)
*   **AI 模型**: Google Gemini API (`@google/genai`)
*   **部署环境**: GitHub Pages (GitHub Actions CI/CD)

## 🚀 本地开发 (Local Development)

### 1. 克隆仓库
```bash
git clone <repository-url>
cd digital-sanctuary
```

### 2. 安装依赖
确保本地安装了 Node.js (推荐 v18+)。
```bash
npm install
```

### 3. 配置环境变量
在项目根目录创建一个 `.env` 文件。你需要一个 Google Gemini API Key。

```env
# .env
VITE_API_KEY=your_actual_api_key_here
```

### 4. 启动开发服务器
```bash
npm run dev
```
打开浏览器访问 `http://localhost:5173`。

## 📦 部署指南 (GitHub Pages)

本项目内置了 GitHub Actions 工作流，可自动构建并部署到 GitHub Pages。

1.  **提交代码**到 GitHub 仓库。
2.  **配置密钥**:
    *   进入仓库 **Settings** -> **Secrets and variables** -> **Actions**。
    *   点击 **New repository secret**。
    *   Name: `VITE_API_KEY`
    *   Value: 你的 Google Gemini API Key。
3.  **配置 Pages**:
    *   进入仓库 **Settings** -> **Pages**。
    *   在 **Build and deployment** 部分，将 **Source** 设置为 **GitHub Actions**。
4.  **触发部署**:
    *   推送代码到 `main` 分支，或者在 Actions 标签页手动触发 "Deploy to GitHub Pages" 工作流。

## 📄 许可证

MIT License