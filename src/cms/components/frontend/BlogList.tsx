import React from 'react';
import { useArticles } from '../../hooks/useArticles';
import ArticlePreview from './ArticlePreview';
import { useNavigate } from 'react-router-dom';

const BlogList: React.FC = () => {
  const { articles, isLoading, isError } = useArticles();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-400">加载失败，请稍后重试</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-medium text-slate-100 mb-8">博客</h1>
      
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">暂无文章</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <ArticlePreview 
              key={article.id} 
              article={article}
              onClick={() => navigate(`/blog/${article.slug}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;