import React, { useEffect, useState } from 'react';
import { Message, Role } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;
  const [displayedText, setDisplayedText] = useState(isUser ? message.text : '');

  useEffect(() => {
    if (isUser) return;
    if (displayedText === message.text) return;

    const speed = message.text.length > 100 ? 15 : 30; 
    
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => {
        if (prev.length >= message.text.length) {
          clearInterval(intervalId);
          return message.text;
        }
        return message.text.slice(0, prev.length + 1);
      });
    }, speed);

    return () => clearInterval(intervalId);
  }, [message.text, isUser]);

  return (
    <div className={`flex w-full mb-10 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
      <div className={`max-w-[85%] md:max-w-[70%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        
        <span className="text-[9px] uppercase tracking-widest text-slate-600 mb-3 opacity-80">
          {isUser ? 'You' : 'The Monk'}
        </span>

        <div 
          className={`
            relative p-6 rounded-sm leading-relaxed text-base md:text-lg serif min-w-[60px] backdrop-blur-sm transition-all duration-300
            ${isUser 
              ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 text-slate-200 border border-white/10 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]' 
              : 'bg-black/40 text-slate-300 border border-white/5 shadow-none'
            }
          `}
        >
          {displayedText.split('\n').map((line, i) => (
            <p key={i} className="mb-2 last:mb-0 min-h-[1.5em] drop-shadow-sm font-light">
              {line}
            </p>
          ))}
          {!isUser && displayedText.length < message.text.length && (
            <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-slate-600 animate-pulse"></span>
          )}
          
          {/* Decorative corner accent - refined lines */}
          <div className={`absolute w-1.5 h-1.5 opacity-50 ${isUser ? 'bottom-0 right-0 border-b border-r border-slate-400' : 'top-0 left-0 border-t border-l border-slate-500'}`}></div>
        </div>

        <span className="text-[9px] text-slate-700 mt-2 font-mono opacity-50">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>

      </div>
    </div>
  );
};

export default ChatMessage;