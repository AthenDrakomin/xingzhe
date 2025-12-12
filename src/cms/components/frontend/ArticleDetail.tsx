import React from 'react';
import { Article } from '../../types/article';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleDetailProps {
  article: Article;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  return (
    <article className="max-w-3xl mx-auto">
      {article.coverImage && (
        <div className="mb-8 rounded-sm overflow-hidden">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
      )}
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
        <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
        {article.author && (
          <span>作者: {article.author.name}</span>
        )}
        <span>{article.views} 次阅读</span>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-medium text-slate-100 mb-6">
        {article.title}
      </h1>
      
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs px-3 py-1 bg-emerald-900/30 text-emerald-400 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-medium text-slate-100 mb-6 mt-8" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-medium text-slate-100 mb-5 mt-7" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-medium text-slate-200 mb-4 mt-6" {...props} />,
            p: ({node, ...props}) => <p className="text-slate-400 mb-4 leading-relaxed" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside text-slate-400 mb-4 ml-4" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside text-slate-400 mb-4 ml-4" {...props} />,
            li: ({node, ...props}) => <li className="mb-2" {...props} />,
            a: ({node, ...props}) => <a className="text-emerald-400 hover:text-emerald-300 underline" {...props} />,
            img: ({node, ...props}) => <img className="rounded-sm my-6" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-emerald-500 pl-4 text-slate-300 italic my-6" {...props} />
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default ArticleDetail;