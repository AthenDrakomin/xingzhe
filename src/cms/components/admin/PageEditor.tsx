import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePage } from '../../hooks/usePages';
import { pageApi } from '../../services/api';
import { PageFormData } from '../../types/page';
import { useAuth } from '../../hooks/useAuth';
import { PermissionService } from '../../services/permissions';

const PageEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { page, isLoading } = usePage(id || '');
  const isEditing = !!id;

  // 检查用户权限
  const canEdit = isEditing ? 
    PermissionService.canUpdatePage(user) : 
    PermissionService.canCreatePage(user);

  const [formData, setFormData] = useState<PageFormData>({
    title: '',
    content: '',
    order: 0,
    status: 'draft'
  });
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 如果是编辑模式，加载页面数据
  useEffect(() => {
    if (isEditing && page) {
      setFormData({
        title: page.title,
        content: page.content,
        order: page.order,
        status: page.status
      });
    }
  }, [isEditing, page]);

  // 显示加载状态
  if (isEditing && isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('请输入页面标题');
      return;
    }
    
    if (!formData.content.trim()) {
      setError('请输入页面内容');
      return;
    }
    
    if (!canEdit) {
      setError('您没有权限执行此操作');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      
      if (isEditing && id) {
        // 更新页面
        await pageApi.update(id, formData);
      } else {
        // 创建新页面
        await pageApi.create(formData);
      }
      
      navigate('/cms/pages');
    } catch (err) {
      console.error('保存失败:', err);
      setError('保存失败，请稍后重试');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium text-slate-100">
          {isEditing ? '编辑页面' : '新建页面'}
        </h1>
        <button
          onClick={() => navigate('/cms/pages')}
          className="text-slate-400 hover:text-white text-sm"
        >
          返回列表
        </button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900/30 border border-white/10 rounded-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* 标题 */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-400 mb-2">
                标题 *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="输入页面标题"
              />
            </div>

            {/* 内容 */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-400 mb-2">
                内容 *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={20}
                className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm"
                placeholder="输入页面内容（支持Markdown语法）"
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* 路径 */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-slate-400 mb-2">
                路径
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
                readOnly
                className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">
                基于标题自动生成，用于页面URL
              </p>
            </div>

            {/* 排序 */}
            <div>
              <label htmlFor="order" className="block text-sm font-medium text-slate-400 mb-2">
                排序
              </label>
              <input
                id="order"
                name="order"
                type="number"
                value={formData.order}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            {/* 状态 */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-400 mb-2">
                状态
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="draft">草稿</option>
                <option value="published">已发布</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={() => navigate('/cms/pages')}
            className="text-slate-400 hover:text-white px-4 py-2 text-sm"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-2 rounded-sm text-sm transition-colors disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存页面'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageEditor;