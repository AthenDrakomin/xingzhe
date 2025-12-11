import React from 'react';
import { useParams } from 'react-router-dom';
import { usePage } from '../../hooks/usePages';
import PageRenderer from './PageRenderer';

const PageRendererWrapper: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { page, isLoading, isError } = usePage(slug || '');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  if (isError || !page) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-400">页面未找到</div>
      </div>
    );
  }

  return <PageRenderer page={page} />;
};

export default PageRendererWrapper;