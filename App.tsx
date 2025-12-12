import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Page } from './types';
import Home from './components/Home';
import SideChannel from './components/SideChannel';
import BroBadge from './components/BroBadge';
import ErrorBoundary from './src/components/ErrorBoundary';
import { CMSRoutes } from './src/cms/routes';
// Lazy load components
const Dynamics = lazy(() => import('./components/Dynamics'));
const SimplePage = lazy(() => import('./components/SimplePage'));

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [transitioning, setTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePageChange = (newPage: Page) => {
    if (newPage === currentPage) return;
    setTransitioning(true);
    setMobileMenuOpen(false);
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
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <Dynamics />
          </Suspense>
        );
      case 'blog':
      case 'projects':
      case 'about':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <SimplePage type={currentPage} />
          </Suspense>
        );
      default:
        return <Home setPage={handlePageChange} />;
    }
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col h-screen bg-[#020617] text-slate-300 overflow-hidden font-sans relative selection:bg-emerald-900 selection:text-white antialiased">
          {/* 1. Main Background Gradient: Simulating a dim light from top-center */}
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_#1e293b_0%,_#020617_50%,_#000000_100%)] z-0 pointer-events-none" />
          
          {/* 2. Texture Layer: Subtle noise/stardust */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0 mix-blend-screen" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)' }}></div>
          
          {/* 3. Vignette Layer: Deepens the corners for a "shadowy" feel */}
          <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_30%,_#000000_100%)] opacity-80 z-0"></div>

          <Routes>
            {/* CMS Routes */}
            <Route path="/cms/*" element={<CMSRoutes />} />
            
            {/* Main App Routes */}
            <Route path="/*" element={(
              <>
                {/* Side Channel Navigation */}
                <SideChannel />
                
                {/* Mobile Menu Button */}
                {currentPage !== 'home' && (
                  <button 
                    className="fixed top-4 left-4 z-50 md:hidden bg-slate-900/50 border border-white/10 rounded-sm p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
                    aria-expanded={mobileMenuOpen}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                )}
                
                {/* Mobile Menu */}
                {currentPage !== 'home' && mobileMenuOpen && (
                  <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
                    <div className="absolute left-0 top-0 h-full w-64 bg-[#020617] border-r border-white/10 p-4">
                      <div className="flex items-center justify-between mb-8 mt-4">
                        <button 
                          onClick={() => handlePageChange('home')}
                          className="serif text-lg tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                        >
                          <span className="text-emerald-900 group-hover:text-emerald-500 transition-colors text-xs">●</span> 
                          <span>首页</span>
                        </button>
                        <button 
                          className="text-slate-400 hover:text-white"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <button 
                          onClick={() => handlePageChange('blog')} 
                          className={`text-left px-4 py-2 rounded-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors ${currentPage === 'blog' ? 'text-emerald-500 bg-white/5' : ''}`}
                        >
                          博客
                        </button>
                        <button 
                          onClick={() => handlePageChange('projects')} 
                          className={`text-left px-4 py-2 rounded-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors ${currentPage === 'projects' ? 'text-emerald-500 bg-white/5' : ''}`}
                        >
                          项目
                        </button>
                        <button 
                          onClick={() => handlePageChange('dynamics')} 
                          className={`text-left px-4 py-2 rounded-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors ${currentPage === 'dynamics' ? 'text-emerald-500 bg-white/5' : ''}`}
                        >
                          动态
                        </button>
                        <button 
                          onClick={() => handlePageChange('about')} 
                          className={`text-left px-4 py-2 rounded-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors ${currentPage === 'about' ? 'text-emerald-500 bg-white/5' : ''}`}
                        >
                          关于
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Navigation Bar (Only show if not on home) */}
                {currentPage !== 'home' && (
                  <nav className="flex-none h-16 border-b border-white/5 bg-[#020617]/50 backdrop-blur-md z-30 flex items-center justify-between px-6 pl-16 md:pl-6">
                    <button 
                      onClick={() => handlePageChange('home')}
                      className="serif text-lg tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2 group md:flex hidden"
                    >
                      <span className="text-emerald-900 group-hover:text-emerald-500 transition-colors text-xs">●</span> 
                      <span>首页</span>
                    </button>
                    
                    <div className="hidden md:flex gap-6 text-xs tracking-widest text-slate-500 font-medium">
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
                
                {/* BRO Badge */}
                <BroBadge />
              </>
            )} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;