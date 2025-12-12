import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';

const BorderlessReliefOrg: React.FC = () => {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* BRO Icon Button */}
      <button
        onClick={() => setShowCard(!showCard)}
        className="flex items-center gap-2 bg-emerald-900/80 hover:bg-emerald-800/90 backdrop-blur-sm border border-emerald-700/50 rounded-full px-3 py-2 transition-all duration-300 shadow-lg hover:shadow-emerald-900/30"
        aria-label="Support Borderless Relief Organization"
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
          Borderless Relief Organization
        </span>
      </button>

      {/* BRO Card - Show when clicked */}
      {showCard && (
        <div className="absolute top-full right-0 mt-2 w-80 z-60">
          <Card className="p-6 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-800/30 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              {/* Love Relay Badge */}
              <div className="relative inline-flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <div className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-[8px] font-bold px-1.5 py-0.5 rounded-full border-2 border-emerald-900">
                  BRO
                </div>
              </div>
              <h3 className="text-lg font-semibold text-emerald-300 serif">Borderless Relief Organization</h3>
            </div>
            <p className="text-slate-300 text-center text-sm mb-4 leading-relaxed">
              Support <a href="https://www.patreon.com/cw/borderlessrelief" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline transition-colors">Borderless Relief Organization (BRO)</a>,
              where love transcends borders and warms every heart in need.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="primary"
                size="sm"
                onClick={() => window.open('https://www.patreon.com/cw/borderlessrelief', '_blank')}
              >
                前往支持
              </Button>
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => {
                  const shareText = '🌟 Join the Love Relay! Support Borderless Relief Organization (BRO) - where compassion knows no boundaries. Be part of something bigger! 💙';
                  const shareUrl = 'https://www.patreon.com/cw/borderlessrelief';
                  if (navigator.share) {
                    navigator.share({
                      title: '❤️ Love Relay - Borderless Relief Organization (BRO)',
                      text: shareText,
                      url: shareUrl,
                    });
                  } else {
                    // Fallback for browsers that don't support Web Share API
                    const el = document.createElement('textarea');
                    el.value = `${shareText}\n\n${shareUrl}`;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);
                    alert('🔗 Link copied to clipboard! Share the love! ❤️');
                  }
                }}
              >
                分享传播
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BorderlessReliefOrg;