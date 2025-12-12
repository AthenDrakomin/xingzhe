import React from 'react';
import { useParams } from 'react-router-dom';
import { useArticle } from '../../hooks/useArticles';
import ArticleDetail from './ArticleDetail';

const ArticleDetailWrapper: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, isLoading, isError } = useArticle(slug || '');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-400">文章未找到</div>
      </div>
    );
  }

  return <ArticleDetail article={article} />;
};

export default ArticleDetailWrapper;