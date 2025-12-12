import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PermissionService } from '../../services/permissions';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/cms/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#020617]/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-medium text-slate-100">内容管理系统</h1>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              欢迎, {user?.name || '管理员'}
            </span>
            
            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              登出
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-4">
            <button 
              onClick={() => navigate('/cms/articles')}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              文章管理
            </button>
            <button 
              onClick={() => navigate('/cms/pages')}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              页面管理
            </button>
            <button 
              onClick={() => navigate('/cms/media')}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              媒体库
            </button>
            {PermissionService.isAdmin(user) && (
              <button 
                onClick={() => navigate('/cms/users')}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                用户管理
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-slate-900/30 border border-white/10 rounded-sm p-8 text-center">
          <h2 className="text-2xl font-medium text-slate-100 mb-4">欢迎使用内容管理系统</h2>
          <p className="text-slate-400 mb-6">
            请选择左侧导航菜单开始管理您的内容
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div 
              className="border border-white/10 rounded-sm p-6 hover:border-white/20 transition-colors cursor-pointer"
              onClick={() => navigate('/cms/articles')}
            >
              <h3 className="text-lg font-medium text-slate-100 mb-2">文章管理</h3>
              <p className="text-sm text-slate-400">创建和管理博客文章</p>
            </div>
            
            <div 
              className="border border-white/10 rounded-sm p-6 hover:border-white/20 transition-colors cursor-pointer"
              onClick={() => navigate('/cms/pages')}
            >
              <h3 className="text-lg font-medium text-slate-100 mb-2">页面管理</h3>
              <p className="text-sm text-slate-400">创建和管理静态页面</p>
            </div>
            
            <div 
              className="border border-white/10 rounded-sm p-6 hover:border-white/20 transition-colors cursor-pointer"
              onClick={() => navigate('/cms/media')}
            >
              <h3 className="text-lg font-medium text-slate-100 mb-2">媒体库</h3>
              <p className="text-sm text-slate-400">上传和管理媒体文件</p>
            </div>
          </div>
          
          {PermissionService.isAdmin(user) && (
            <div 
              className="border border-white/10 rounded-sm p-6 hover:border-white/20 transition-colors cursor-pointer mt-6"
              onClick={() => navigate('/cms/users')}
            >
              <h3 className="text-lg font-medium text-slate-100 mb-2">用户管理</h3>
              <p className="text-sm text-slate-400">管理用户账户和权限</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;