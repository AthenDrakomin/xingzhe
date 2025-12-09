import React, { useState } from 'react';
import { Page } from './types';
import Home from './components/Home';
import Dynamics from './components/Dynamics';
import SimplePage from './components/SimplePage';
import SideChannel from './components/SideChannel';

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
    <div className="flex flex-col h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans relative selection:bg-emerald-800 selection:text-white antialiased">
      {/* 1. Main Background Gradient: Simulating a dim light from top-center */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_#1e293b_0%,_#020617_50%,_#000000_100%)] z-0 pointer-events-none" />
      
      {/* 2. Texture Layer: Subtle noise/stardust */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0 mix-blend-screen"></div>
      
      {/* 3. Vignette Layer: Deepens the corners for a "shadowy" feel */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_30%,_#000000_100%)] opacity-80 z-0"></div>

      {/* Side Channel Navigation */}
      <SideChannel />

      {/* Navigation Bar (Only show if not on home) */}
      {currentPage !== 'home' && (
        <nav className="flex-none h-16 border-b border-white/5 bg-[#020617]/50 backdrop-blur-md z-50 flex items-center justify-between px-6 pl-16 md:pl-6">
          <button 
            onClick={() => handlePageChange('home')}
            className="serif text-lg tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <span className="text-emerald-900 group-hover:text-emerald-500 transition-colors text-xs">●</span> 
            <span>首页</span>
          </button>
          
          <div className="flex gap-6 text-xs tracking-widest text-slate-500 font-medium">
             <button onClick={() => handlePageChange('blog')} className={`hover:text-slate-200 transition-colors ${currentPage === 'blog' ? 'text-emerald-500' : ''}`}>博客</button>
             <button onClick={() => handlePageChange('projects')} className={`hover:text-slate-200 transition-colors ${currentPage === 'projects' ? 'text-emerald-500' : ''}`}>项目</button>
             <button onClick={() => handlePageChange('dynamics')} className={`hover:text-slate-200 transition-colors ${currentPage === 'dynamics' ? 'text-emerald-500' : ''}`}>动态</button>
             <button onClick={() => handlePageChange('about')} className={`hover:text-slate-200 transition-colors ${currentPage === 'about' ? 'text-emerald-500' : ''}`}>关于</button>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 overflow-hidden relative z-10 transition-all duration-500 ease-out ${transitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'} pl-14 md:pl-0`}>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;