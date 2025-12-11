import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticle } from '../../hooks/useArticles';
import { articleApi } from '../../services/api';
import { ArticleFormData } from '../../types/article';
import { useAuth } from '../../hooks/useAuth';
import { PermissionService } from '../../services/permissions';

const ArticleEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { article, isLoading } = useArticle(id || '');
  const isEditing = !!id;

  // 检查用户权限
  const canEdit = isEditing ? 
    PermissionService.canUpdateArticle(user, article?.author.id) : 
    PermissionService.canCreateArticle(user);

  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    tags: [],
    category: '',
    status: 'draft'
  });
  
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 如果是编辑模式，加载文章数据
  useEffect(() => {
    if (isEditing && article) {
      setFormData({
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        coverImage: article.coverImage || '',
        tags: article.tags || [],
        category: article.category || '',
        status: article.status
      });
    }
  }, [isEditing, article]);

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
      [name]: value
    }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('请输入文章标题');
      return;
    }
    
    if (!formData.content.trim()) {
      setError('请输入文章内容');
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
        // 更新文章
        await articleApi.update(id, formData);
      } else {
        // 创建新文章
        if (!user) throw new Error('用户未登录');
        await articleApi.create(formData, {
          id: user.id,
          name: user.name
        });
      }
      
      navigate('/cms/articles');
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
          {isEditing ? '编辑文章' : '新建文章'}
        </h1>
        <button
          onClick={() => navigate('/cms/articles')}
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
                placeholder="输入文章标题"
              />
            </div>

            {/* 摘要 */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-slate-400 mb-2">
                摘要
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="输入文章摘要"
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
                rows={15}
                className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm"
                placeholder="输入文章内容（支持Markdown语法）"
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* 封面图片 */}
            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-slate-400 mb-2">
                封面图片URL
              </label>
              <input
                id="coverImage"
                name="coverImage"
                type="text"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              {formData.coverImage && (
                <div className="mt-2">
                  <img 
                    src={formData.coverImage} 
                    alt="封面预览" 
                    className="w-full h-32 object-cover rounded-sm"
                  />
                </div>
              )}
            </div>

            {/* 分类 */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-400 mb-2">
                分类
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="输入分类名称"
              />
            </div>

            {/* 标签 */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                标签
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                  className="flex-1 bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="输入标签并按回车添加"
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-sm text-sm transition-colors"
                >
                  添加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center gap-1 bg-slate-800 text-slate-300 px-2 py-1 rounded-sm text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="text-slate-500 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
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
                <option value="archived">已归档</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={() => navigate('/cms/articles')}
            className="text-slate-400 hover:text-white px-4 py-2 text-sm"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-2 rounded-sm text-sm transition-colors disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存文章'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleEditor;