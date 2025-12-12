import React from 'react';

const SideChannel: React.FC = () => {
  return (
    <div className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 md:gap-6 animate-fade-in-up md:flex hidden" style={{ animationDelay: '500ms' }}>
      <ChannelItem href="mailto:AthenDrakomin@proton.me" label="Email Me">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      </ChannelItem>
      
      <ChannelItem href="https://zhengyutouzi.com" label="zhengyutouzi.com">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" />
        </svg>
      </ChannelItem>

      <ChannelItem href="https://jiuzhougroup.vip" label="jiuzhougroup.vip">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      </ChannelItem>

      <ChannelItem href="https://athendrakomin-56034895-157be.web.app/" label="My Web App">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 18" />
        </svg>
      </ChannelItem>
    </div>
  );
};

interface ChannelItemProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

const ChannelItem: React.FC<ChannelItemProps> = ({ href, label, children }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-slate-950/30 text-slate-500 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-300 hover:scale-110"
    aria-label={label}
  >
    {children}
    <div className="hidden md:block absolute left-full ml-4 px-3 py-1.5 bg-slate-900/90 backdrop-blur-sm border border-slate-800 text-xs text-slate-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl translate-x-[-10px] group-hover:translate-x-0">
      {label}
    </div>
  </a>
);

export default SideChannel;