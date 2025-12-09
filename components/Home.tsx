import React from 'react';
import { Page } from '../types';

interface HomeProps {
  setPage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 max-w-2xl mx-auto animate-fade-in-up">
      {/* Avatar with Breathing Effect */}
      <div className="relative w-32 h-32 mb-10 group cursor-pointer">
        {/* Animated outer glow - adjusted for new dark theme */}
        <div 
            className="absolute inset-0 bg-emerald-900/20 rounded-full blur-2xl animate-pulse" 
            style={{ animationDuration: '4s' }}
        ></div>
        
        {/* Interactive ring */}
        <div className="absolute inset-0 border border-white/5 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
        
        <img 
          src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" 
          alt="Avatar" 
          className="w-full h-full rounded-full border border-white/10 grayscale contrast-125 hover:grayscale-0 transition-all duration-700 relative z-10 bg-black shadow-2xl"
        />
        <div className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-800/80 border border-black rounded-full z-20 animate-pulse shadow-[0_0_10px_rgba(6,95,70,0.5)]"></div>
      </div>

      {/* Intro */}
      <h1 className="serif text-4xl text-slate-50 mb-8 tracking-wider font-normal drop-shadow-lg">行者</h1>
      
      {/* Updated Bio with deeper typography */}
      <div className="text-slate-300 font-normal mb-16 text-base serif leading-relaxed text-center max-w-lg not-italic">
        <p className="mb-4">“我也不是虔诚的基督教徒，我只是找不到妈妈，麻痹自己。</p>
        <p>而你也只是个假和尚，既心虚，又空虚。”</p>
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-2 gap-4 w-full md:w-[500px]">
        <NavCard 
          title="博客" 
          subtitle="文以载道" 
          onClick={() => setPage('blog')} 
          delay="0ms"
        />
        <NavCard 
          title="项目" 
          subtitle="格物致知" 
          onClick={() => setPage('projects')} 
          delay="100ms"
        />
        <NavCard 
          title="动态" 
          subtitle="同病相怜" 
          highlight 
          onClick={() => setPage('dynamics')} 
          delay="200ms"
        />
        <NavCard 
          title="关于" 
          subtitle="见性明心" 
          onClick={() => setPage('about')} 
          delay="300ms"
        />
      </div>

      {/* Charity Support Section */}
      <div className="mt-16 mb-8 p-6 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-800/30 rounded-lg backdrop-blur-sm w-full max-w-md mx-auto">
        <div className="flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <h3 className="text-lg font-semibold text-emerald-300 serif">爱心传递</h3>
        </div>
        <p className="text-slate-300 text-center text-sm mb-4 leading-relaxed">
          支持 <a href="https://patreon.com/borderlessrelief" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline transition-colors">无国界援助组织</a>，
          让爱跨越边界，温暖每个需要帮助的心灵。
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => window.open('https://patreon.com/borderlessrelief', '_blank')}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-sm rounded-sm transition-colors duration-300"
          >
            前往支持
          </button>
          <button 
            onClick={() => {
              const shareText = '加入爱心传递，支持无国界援助组织，让爱跨越边界。';
              const shareUrl = 'https://patreon.com/borderlessrelief';
              if (navigator.share) {
                navigator.share({
                  title: '爱心传递 - 无国界援助组织',
                  text: shareText,
                  url: shareUrl,
                });
              } else {
                // Fallback for browsers that don't support Web Share API
                const el = document.createElement('textarea');
                el.value = `${shareText} ${shareUrl}`;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                alert('链接已复制到剪贴板！');
              }
            }}
            className="px-4 py-2 border border-emerald-700 text-emerald-400 hover:bg-emerald-900/30 text-sm rounded-sm transition-colors duration-300"
          >
            分享传播
          </button>
        </div>
      </div>

      <footer className="text-xs tracking-widest text-slate-500 serif uppercase">
        © {new Date().getFullYear()} • 托管于 GitHub
      </footer>
    </div>
  );
};

const NavCard = ({ title, subtitle, onClick, highlight = false, delay }: { title: string, subtitle: string, onClick: () => void, highlight?: boolean, delay: string }) => (
  <button 
    onClick={onClick}
    style={{ animationDelay: delay }}
    className={`
      relative group overflow-hidden p-6 text-left border rounded-sm transition-all duration-500 animate-fade-in-up
      ${highlight 
        ? 'border-white/10 bg-white/[0.03] hover:border-white/20' 
        : 'border-white/5 bg-transparent hover:border-white/10 hover:bg-white/[0.02]'
      }
    `}
  >
    <div className="relative z-10 flex flex-col items-start gap-1">
      <span className={`block serif text-xl tracking-wide transition-colors duration-300 ${highlight ? 'text-slate-100' : 'text-slate-400 group-hover:text-slate-200'}`}>
        {title}
      </span>
      <span className="text-xs tracking-widest text-slate-500 group-hover:text-emerald-400 transition-colors duration-300 uppercase font-semibold">
        {subtitle}
      </span>
    </div>
    
    {/* Subtle gradient shine on hover */}
    <div className={`absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none`}></div>
  </button>
);

export default Home;