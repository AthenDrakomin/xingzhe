import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// 懒加载组件
const Login = lazy(() => import('./components/admin/Login'));
const Dashboard = lazy(() => import('./components/admin/Dashboard'));
const ArticleList = lazy(() => import('./components/admin/ArticleList'));
const ArticleEditor = lazy(() => import('./components/admin/ArticleEditor'));
const PageList = lazy(() => import('./components/admin/PageList'));
const PageEditor = lazy(() => import('./components/admin/PageEditor'));
const MediaManager = lazy(() => import('./components/admin/MediaManager'));
const UserManager = lazy(() => import('./components/admin/UserManager'));
const BlogList = lazy(() => import('./components/frontend/BlogList'));
const ArticleDetailWrapper = lazy(() => import('./components/frontend/ArticleDetailWrapper'));
const PageRendererWrapper = lazy(() => import('./components/frontend/PageRendererWrapper'));
const TestPage = lazy(() => import('./components/TestPage'));

// 保护路由组件
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/cms/login" replace />;
  }

  return <>{children}</>;
};

// CMS路由
export const CMSRoutes: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-400">加载中...</div>
      </div>
    }>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/articles" element={
          <ProtectedRoute>
            <ArticleList />
          </ProtectedRoute>
        } />
        <Route path="/articles/new" element={
          <ProtectedRoute>
            <ArticleEditor />
          </ProtectedRoute>
        } />
        <Route path="/articles/edit/:id" element={
          <ProtectedRoute>
            <ArticleEditor />
          </ProtectedRoute>
        } />
        <Route path="/pages" element={
          <ProtectedRoute>
            <PageList />
          </ProtectedRoute>
        } />
        <Route path="/pages/new" element={
          <ProtectedRoute>
            <PageEditor />
          </ProtectedRoute>
        } />
        <Route path="/pages/edit/:id" element={
          <ProtectedRoute>
            <PageEditor />
          </ProtectedRoute>
        } />
        <Route path="/media" element={
          <ProtectedRoute>
            <MediaManager />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute>
            <UserManager />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/cms/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

// 前端路由
export const FrontendRoutes: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-400">加载中...</div>
      </div>
    }>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<ArticleDetailWrapper />} />
        <Route path="/:slug" element={<PageRendererWrapper />} />
      </Routes>
    </Suspense>
  );
};