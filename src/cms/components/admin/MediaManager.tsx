import React, { useState } from 'react';
import { useMedia } from '../../hooks/useMedia';
import { mediaApi } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { PermissionService } from '../../services/permissions';

const MediaManager: React.FC = () => {
  const { media, isLoading, isError, mutate } = useMedia();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 检查用户权限
  const canManageMedia = PermissionService.canManageMedia(user);
  const canDeleteMedia = PermissionService.canDeleteMedia(user);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user) return;

    // 检查权限
    if (!canManageMedia) {
      setError('您没有权限上传文件');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // 逐个上传文件
      for (let i = 0; i < files.length; i++) {
        await mediaApi.upload(files[i], user.id);
      }

      // 重新获取媒体列表
      mutate();
      
      // 清空文件输入
      if (e.target) {
        e.target.value = '';
      }
    } catch (err) {
      console.error('上传失败:', err);
      setError('上传失败，请稍后重试');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要删除这个媒体文件吗？')) return;
    
    // 检查权限
    if (!canDeleteMedia) {
      alert('您没有权限删除文件');
      return;
    }
    
    try {
      await mediaApi.delete(id);
      mutate(); // 重新获取数据
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败，请稍后重试');
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
        <h1 className="text-2xl font-medium text-slate-100">媒体库</h1>
        {canManageMedia && (
          <div className="flex items-center gap-4">
            <label className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-sm text-sm transition-colors cursor-pointer">
              {uploading ? '上传中...' : '上传文件'}
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded-sm mb-6">
          {error}
        </div>
      )}

      {media.length === 0 ? (
        <div className="bg-slate-900/30 border border-white/10 rounded-sm p-12 text-center">
          <p className="text-slate-500">暂无媒体文件</p>
          <p className="text-slate-600 text-sm mt-2">
            点击上方"上传文件"按钮添加图片或其他媒体文件
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {media.map((item) => (
            <div key={item.id} className="bg-slate-900/30 border border-white/10 rounded-sm overflow-hidden group">
              {item.mimeType.startsWith('image/') ? (
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.url} 
                    alt={item.filename} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center bg-slate-800">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📄</div>
                    <div className="text-xs text-slate-400 truncate px-2">
                      {item.filename}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-2">
                <div className="text-xs text-slate-400 truncate" title={item.filename}>
                  {item.filename}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-500">
                    {(item.size / 1024).toFixed(1)}KB
                  </span>
                  {canDeleteMedia && (
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      删除
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaManager;