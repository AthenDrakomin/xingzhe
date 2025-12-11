import { sendMessageToGemini } from './gemini';
import { sendMessageToOllama } from './ollama';

// AI提供商枚举
export enum AIProvider {
  GEMINI = 'gemini',
  OLLAMA = 'ollama'
}

// 当前使用的AI提供商
let currentProvider: AIProvider = (() => {
  // 从环境变量读取AI提供商设置
  // @ts-ignore
  const provider = import.meta.env?.VITE_AI_PROVIDER || (typeof process !== 'undefined' && process.env?.VITE_AI_PROVIDER);
  
  if (provider === 'ollama') {
    return AIProvider.OLLAMA;
  }
  
  // 默认使用Gemini
  return AIProvider.GEMINI;
})();

// 设置AI提供商
export const setAIProvider = (provider: AIProvider) => {
  currentProvider = provider;
};

// 获取当前AI提供商
export const getCurrentAIProvider = (): AIProvider => {
  return currentProvider;
};

// 发送消息到当前AI提供商
export const sendMessageToAI = async (message: string): Promise<string> => {
  switch (currentProvider) {
    case AIProvider.GEMINI:
      return sendMessageToGemini(message);
    case AIProvider.OLLAMA:
      return sendMessageToOllama(message);
    default:
      throw new Error(`不支持的AI提供商: ${currentProvider}`);
  }
};

// 初始化AI服务
export const initializeAI = () => {
  // Gemini需要初始化
  if (currentProvider === AIProvider.GEMINI) {
    // 这里可以添加Gemini的初始化逻辑
    console.log('Gemini AI service initialized');
  }
  
  // Ollama不需要特殊的初始化
  if (currentProvider === AIProvider.OLLAMA) {
    console.log('Ollama AI service ready');
  }
};