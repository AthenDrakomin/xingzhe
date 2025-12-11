import React from 'react';

const BroBadge: React.FC = () => {
  return (
    <div className="fixed top-4 right-4 z-50 group">
      <a 
        href="https://www.patreon.com/cw/borderlessrelief" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-emerald-900/80 hover:bg-emerald-800/90 backdrop-blur-sm border border-emerald-700/50 rounded-full px-3 py-2 transition-all duration-300 shadow-lg hover:shadow-emerald-900/30"
        aria-label="支持无国界援助组织"
      >
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-900 text-[6px] font-bold px-1 py-0.5 rounded-full border border-emerald-900">
            BRO
          </div>
        </div>
        <span className="text-xs font-medium text-slate-100 hidden sm:block group-hover:text-white transition-colors">
          无国界援助组织
        </span>
      </a>
    </div>
  );
};

export default BroBadge;