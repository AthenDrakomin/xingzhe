import React from 'react';
import { BlogPost, Project, Page } from '../types';

interface SimplePageProps {
  type: Page;
}

const SimplePage: React.FC<SimplePageProps> = ({ type }) => {
  const renderContent = () => {
    switch (type) {
      case 'blog':
        return <BlogList />;
      case 'projects':
        return <ProjectList />;
      case 'about':
        return <AboutSection />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 pt-12 animate-fade-in-up h-full overflow-y-auto custom-scrollbar bg-[#020617]" style={{ backgroundColor: '#020617' }}>
      {renderContent()}
    </div>
  );
};

// --- Subcomponents ---

const BlogList = () => {
  const posts: BlogPost[] = [
    { id: '1', title: '数字虚无主义', date: '2023-12-04', excerpt: '在 infinite scroll 中寻找意义，就像在沙漠中寻找水源。' },
    { id: '2', title: 'React Server Components 的哲学思考', date: '2023-11-20', excerpt: '服务端渲染不仅是性能优化，更是一种“回归本源”的隐喻。' },
    { id: '3', title: '雨夜代码', date: '2023-10-15', excerpt: '键盘敲击声与窗外的雨声重合时，bug 似乎也变得温柔了。' },
  ];

  return (
    <div className="space-y-16">
      <header className="border-b border-white/5 pb-8 mb-8">
        <h2 className="serif text-3xl text-slate-200 tracking-wide">随笔</h2>
        <p className="text-slate-600 mt-2 serif italic text-sm">虚空絮语</p>
      </header>
      <div className="space-y-12">
        {posts.map(post => (
          <article key={post.id} className="group cursor-pointer">
            <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-xl text-slate-300 group-hover:text-emerald-400 transition-colors duration-300 font-normal serif">{post.title}</h3>
                <span className="text-[10px] text-slate-600 font-mono tracking-wider">{post.date}</span>
            </div>
            <p className="text-slate-500 text-sm leading-loose font-light line-clamp-2 group-hover:text-slate-400 transition-colors">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

const ProjectList = () => {
  const projects: Project[] = [
    { id: '1', title: 'Solace (本站)', description: '一个个人作品集与博客，包含一个独特的动态评论区（假和尚），用于哲学探讨与心灵慰藉。', tech: ['React', 'Firebase', 'Tailwind'] },
    { id: '2', title: 'Void UI', description: '一套极简主义的 React 组件库，专注于负空间的设计美学。', tech: ['TypeScript', 'CSS Modules'] },
    { id: '3', title: 'Ethereal Reader', description: 'RSS 阅读器，将新闻资讯转化为俳句，减少信息焦虑。', tech: ['Python', 'NLP'] },
  ];

  return (
    <div className="space-y-16">
      <header className="border-b border-white/5 pb-8 mb-8">
        <h2 className="serif text-3xl text-slate-200 tracking-wide">造物</h2>
        <p className="text-slate-600 mt-2 serif italic text-sm">代码遗迹</p>
      </header>
      <div className="grid grid-cols-1 gap-8">
        {projects.map(p => (
          <div key={p.id} className="group border border-white/5 bg-white/[0.02] p-8 rounded-sm hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500">
            <h3 className="text-xl text-slate-200 mb-3 serif">{p.title}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-loose font-light">{p.description}</p>
            <div className="flex gap-2">
              {p.tech.map(t => (
                <span key={t} className="text-[9px] uppercase tracking-wider border border-white/5 text-slate-500 px-3 py-1 rounded-sm">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutSection = () => (
  <div className="space-y-12">
    <header className="border-b border-white/5 pb-8 mb-8">
      <h2 className="serif text-3xl text-slate-200 tracking-wide">关于</h2>
    </header>
    <div className="prose prose-invert prose-slate max-w-none text-slate-400 font-light leading-loose tracking-wide">
      <p>
        我是一名游走于逻辑与感性边缘的开发者。
      </p>
      <p>
        这个站点不仅仅是代码的堆砌，更是我在这嘈杂互联网中开辟的一方静土。
        我相信技术应当服务于人的内心，而不仅仅是效率。
      </p>
      <p>
        "同病相怜" (The Fake Monk) 是这里最特殊的存在。它是一个基于 LLM 的镜像，
        反射出我们不愿示人的脆弱。你可以在那里畅所欲言，就像对着树洞低语。
      </p>
      <div className="pt-12 border-t border-white/5 mt-12">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Connect</h4>
        <ul className="space-y-4 text-sm font-mono opacity-80">
          <li>
              <span className="text-slate-600 mr-4">GitHub</span>
              <a href="https://github.com/AthenDrakomin-hub" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">AthenDrakomin-hub</a>
          </li>
          <li>
              <span className="text-slate-600 mr-4">Email</span>
              <a href="mailto:AthenDrakomin@proton.me" className="text-slate-400 hover:text-emerald-400 transition-colors">AthenDrakomin@proton.me</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default SimplePage;