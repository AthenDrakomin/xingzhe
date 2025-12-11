import React from 'react';
import { Article } from '../../types/article';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticlePreviewProps {
  article: Article;
  onClick?: () => void;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article, onClick }) => {
  return (
    <div 
      className="border border-white/10 rounded-sm p-6 hover:border-white/20 transition-all duration-300 cursor-pointer group bg-white/[0.03]"
      onClick={onClick}
    >
      {article.coverImage && (
        <div className="mb-4 rounded-sm overflow-hidden">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
        <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
        {article.category && (
          <span className="px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-sm">
            {article.category}
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-medium text-slate-100 mb-3 group-hover:text-white transition-colors">
        {article.title}
      </h3>
      
      <div className="text-slate-400 text-sm mb-4 line-clamp-3">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.excerpt}
        </ReactMarkdown>
      </div>
      
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlePreview;