import React, { useRef, useEffect, useState } from 'react';
import { ChatState, Message, Role } from '../types';
import { sendMessageToGemini, initializeChat } from '../services/gemini';
import ChatMessage from './ChatMessage';

const INITIAL_MESSAGE = "施主，你我皆是这红尘中的迷途者。这里是「同病相怜」的回音壁，且留下一言，看看空谷有何回响。";

const Dynamics: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize on mount
  useEffect(() => {
    initializeChat();
    const timer = setTimeout(() => {
        setChatState(prev => ({
            ...prev,
            messages: [{
              id: 'init-1',
              role: Role.MODEL,
              text: INITIAL_MESSAGE,
              timestamp: new Date()
            }]
          }));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatState.messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || chatState.isLoading) return;

    const userMsgText = inputText.trim();
    setInputText("");

    const newMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: userMsgText,
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const responseText = await sendMessageToGemini(userMsgText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: responseText,
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false,
      }));

    } catch (err) {
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: "网络亦如红尘般断续 (网络错误).",
      }));
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="max-w-2xl mx-auto space-y-8 pb-32 pt-8">
          {/* Header for the section */}
          <div className="text-center py-8 mb-4 border-b border-white/5">
             <h2 className="serif text-xl text-slate-200 tracking-wider font-normal">同病相怜 • 动态</h2>
             <p className="text-xs text-slate-500 mt-2 tracking-widest uppercase">Echoes in the Void</p>
          </div>

          {chatState.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {chatState.isLoading && (
            <div className="flex items-center space-x-2 text-slate-600 text-sm animate-pulse pl-4 opacity-50">
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full animation-delay-200"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full animation-delay-400"></div>
            </div>
          )}

          {chatState.error && (
             <div className="text-center py-4 text-red-900/50 text-xs tracking-widest">
                {chatState.error}
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Integrated with the dark theme */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pb-6 pt-10 px-4 z-20">
        <div className="max-w-2xl mx-auto flex gap-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="写下你的感悟..."
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-sm px-6 py-4 text-slate-300 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all placeholder-slate-700 text-sm font-light tracking-wide shadow-inner"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim() || chatState.isLoading}
            className="bg-slate-900/50 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900/50 text-slate-400 hover:text-white px-8 py-2 rounded-sm text-xs tracking-[0.2em] transition-all border border-white/10 hover:border-white/20 uppercase"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dynamics;