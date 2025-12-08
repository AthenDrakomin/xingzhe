import React, { useState } from 'react';
import { Page } from '../types';
import Home from './Home';
import Dynamics from './Dynamics';
import SimplePage from './SimplePage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [transitioning, setTransitioning] = useState(false);

  const handlePageChange = (newPage: Page) => {
    if (newPage === currentPage) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setTransitioning(false);
    }, 300); // Allow fade out
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setPage={handlePageChange} />;
      case 'dynamics':
        return <Dynamics />;
      case 'blog':
      case 'projects':
      case 'about':
        return <SimplePage type={currentPage} />;
      default:
        return <Home setPage={handlePageChange} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans relative selection:bg-emerald-900 selection:text-white">
      {/* Global Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>

      {/* Navigation Bar (Only show if not on home) */}
      {currentPage !== 'home' && (
        <nav className="flex-none h-16 border-b border-slate-900 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-between px-6">
          <button 
            onClick={() => handlePageChange('home')}
            className="serif text-lg tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span className="text-emerald-900 text-xs">●</span> 
            <span>首页</span>
          </button>
          
          <div className="flex gap-4 text-xs tracking-widest text-slate-500">
             <button onClick={() => handlePageChange('blog')} className={`hover:text-emerald-500 transition-colors ${currentPage === 'blog' ? 'text-emerald-600' : ''}`}>博客</button>
             <button onClick={() => handlePageChange('projects')} className={`hover:text-emerald-500 transition-colors ${currentPage === 'projects' ? 'text-emerald-600' : ''}`}>项目</button>
             <button onClick={() => handlePageChange('dynamics')} className={`hover:text-emerald-500 transition-colors ${currentPage === 'dynamics' ? 'text-emerald-600' : ''}`}>动态</button>
             <button onClick={() => handlePageChange('about')} className={`hover:text-emerald-500 transition-colors ${currentPage === 'about' ? 'text-emerald-600' : ''}`}>关于</button>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 overflow-hidden relative z-10 transition-opacity duration-300 ${transitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;