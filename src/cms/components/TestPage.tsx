import React from 'react';
import { Link } from 'react-router-dom';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-medium text-slate-100 mb-8">CMS测试页面</h1>
      
      <div className="bg-slate-900/30 border border-white/10 rounded-sm p-8 max-w-md w-full">
        <h2 className="text-xl font-medium text-slate-100 mb-4">路由测试</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-slate-400 text-sm mb-2">前端页面</h3>
            <div className="flex flex-col gap-2">
              <Link 
                to="/blog" 
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                博客列表
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-slate-400 text-sm mb-2">CMS管理后台</h3>
            <div className="flex flex-col gap-2">
              <Link 
                to="/cms/dashboard" 
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                CMS仪表板
              </Link>
              <Link 
                to="/cms/articles" 
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                文章管理
              </Link>
              <Link 
                to="/cms/pages" 
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                页面管理
              </Link>
              <Link 
                to="/cms/media" 
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                媒体库
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;