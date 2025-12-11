import React, { useRef, useEffect, useState } from 'react';
import { ChatState, Message, Role } from '../types';
import { sendMessageToGemini, initializeChat } from '../services/gemini';
import ChatMessage from './ChatMessage';
import Button from './Button';

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
    
    // Input validation
    if (userMsgText.length > 1000) {
      setChatState((prev) => ({
        ...prev,
        error: "消息太长了，请保持在1000字符以内。",
      }));
      return;
    }
    
    if (userMsgText.length < 1) {
      setChatState((prev) => ({
        ...prev,
        error: "请输入一些内容再发送。",
      }));
      return;
    }

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
      
      // Validate AI response
      if (!responseText || responseText.trim().length === 0) {
        throw new Error("AI返回了空响应");
      }
      
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
      console.error("Error sending message to Gemini:", err);
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: "网络亦如红尘般断续 (网络错误)，请稍后再试。",
      }));
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="max-w-2xl mx-auto space-y-8 pb-32 pt-8">
          {/* Header for the section */}
          <div className="text-center py-8 mb-4 border-b border-white/5">
             <h2 className="serif text-xl text-slate-300 tracking-wider">同病相怜 • 动态</h2>
             <p className="text-[10px] text-slate-600 mt-2 tracking-[0.3em] uppercase">Echoes in the Void</p>
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
             <div className="text-center py-4 text-red-900/50 text-xs tracking-widest" role="alert" aria-live="polite">
                {chatState.error}
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Integrated with the dark theme */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pb-6 pt-8 px-4 z-20">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="写下你的感悟..."
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-sm px-4 py-3 sm:px-6 sm:py-4 text-slate-300 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all placeholder-slate-700 text-sm font-light tracking-wide shadow-inner min-h-[48px]"
            aria-label="输入消息"
          />
          <Button
            variant="ghost"
            size="lg"
            onClick={handleSendMessage}
            disabled={!inputText.trim() || chatState.isLoading}
            aria-label="发送消息"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dynamics;