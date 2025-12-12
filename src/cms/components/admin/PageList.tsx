import React, { useState } from 'react';
import { usePages } from '../../hooks/usePages';
import { pageApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PermissionService } from '../../services/permissions';

const PageList: React.FC = () => {
  const { pages, isLoading, isError, mutate } = usePages();
  const { user } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  // 检查用户权限
  const canCreatePage = PermissionService.canCreatePage(user);
  const canDeletePage = PermissionService.canDeletePage(user);

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要删除这个页面吗？')) return;
    
    // 检查权限
    if (!canDeletePage) {
      alert('您没有权限删除页面');
      return;
    }
    
    try {
      setDeletingId(id);
      await pageApi.delete(id);
      mutate(); // 重新获取数据
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败，请稍后重试');
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">加载失败，请稍后重试</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium text-slate-100">页面管理</h1>
        {canCreatePage && (
          <button
            onClick={() => navigate('/cms/pages/new')}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-sm text-sm transition-colors"
          >
            新建页面
          </button>
        )}
      </div>

      {pages.length === 0 ? (
        <div className="bg-slate-900/30 border border-white/10 rounded-sm p-12 text-center">
          <p className="text-slate-500">暂无页面</p>
          <button
            onClick={() => navigate('/cms/pages/new')}
            className="mt-4 text-emerald-400 hover:text-emerald-300 text-sm"
          >
            创建第一个页面
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/30 border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">标题</th>
                <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">路径</th>
                <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">状态</th>
                <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">排序</th>
                <th className="text-right py-4 px-6 text-slate-400 font-medium text-sm">操作</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-4 px-6 text-slate-300">
                    <div className="font-medium">{page.title}</div>
                    <div className="text-sm text-slate-500 mt-1">{page.slug}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    /{page.slug}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs rounded-sm ${
                      page.status === 'published' 
                        ? 'bg-emerald-900/30 text-emerald-400' 
                        : 'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {page.status === 'published' ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    {page.order}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/cms/pages/edit/${page.id}`)}
                        className="text-slate-400 hover:text-white text-sm"
                      >
                        编辑
                      </button>
                      {canDeletePage && (
                        <button
                          onClick={() => handleDelete(page.id)}
                          disabled={deletingId === page.id}
                          className="text-red-400 hover:text-red-300 text-sm disabled:opacity-50"
                        >
                          {deletingId === page.id ? '删除中...' : '删除'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PageList;