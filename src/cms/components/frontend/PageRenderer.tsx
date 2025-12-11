import React from 'react';
import { Page } from '../../types/page';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PageRendererProps {
  page: Page;
}

const PageRenderer: React.FC<PageRendererProps> = ({ page }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-medium text-slate-100 mb-8">
        {page.title}
      </h1>
      
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
          {page.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PageRenderer;