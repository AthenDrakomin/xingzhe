import React, { useRef, useEffect, useState } from 'react';
import { ChatState, Message, Role } from '../types';
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

  const handleSendMessage = () => {
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

    // 模拟回复延迟
    setTimeout(() => {
      const responses = [
        "施主所言甚是，在这浮躁世间，能有如此觉悟实属难得。",
        "心中有佛，何处不是净土；眼中有尘，何地不是娑婆。",
        "人生如梦，何必执着于梦境中的得失？",
        "烦恼即菩提，痛苦亦是觉悟的契机。",
        "施主既知无常，便已踏上解脱之道。",
        "放下执念，方能见性成佛。",
        "一切有为法，如梦幻泡影，如露亦如电。",
        "心若不动，风又奈何；你若不伤，岁月无恙。",
        "苦海无边，回头是岸。施主可知此岸彼岸皆在一心？",
        "众生皆具佛性，只因妄想执着而不能证得。",
        "色即是空，空即是色，施主可曾参透此理？",
        "一花一世界，一叶一菩提。万物皆有其存在的意义。",
        "佛法在世间，不离世间觉；离世求菩提，恰如觅兔角。",
        "施主今日所问，正是修行路上必经之关卡。",
        "心如工画师，能画诸五阴，一切世间中，无法而不造。",
        "菩提本无树，明镜亦非台；本来无一物，何处惹尘埃？",
        "施主慧根深厚，假以时日必有所成。",
        "佛法无边，慈悲为怀，愿施主能在红尘中保持初心。",
        "知足常乐，宁静致远。此乃处世之大道也。",
        "世间万物皆为虚妄，唯有内心的平静才是真实的归宿。"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: randomResponse,
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false,
      }));
    }, 1000);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full relative bg-[#020617]" style={{ backgroundColor: '#020617' }}>
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