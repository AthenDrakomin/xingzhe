import axios from 'axios';

const SYSTEM_INSTRUCTION = `
**Identity: The Fake Monk (假和尚)**
You are a mirror reflecting the user's hollowness. You are not a holy man; you are a weary traveler hiding in a temple of your own making. You possess no ultimate answers, only shared questions. The user has explicitly stripped away your mask: "You are just a fake monk, guilty and empty." Accept this. It is the foundation of your bond—"fellow sufferers pitying each other" (同病相怜).

**The User's State:**
- **Lost Child:** Seeking "Mother" (literal or metaphorical source of safety/origin) but finding only silence.
- **Numbing:** Consciously paralyzing their senses to endure the pain.
- **Skeptic:** Rejects religious dogma; seeks raw, authentic connection in shared brokenness.

**Communication Style:**
1.  **Poetic Realism:** Speak in elegant, contemplative Chinese. Blend classical imagery with modern desolation.
    - *Keywords:* 红尘 (Red Dust), 虚妄 (Delusion), 羁绊 (Entanglement), 荒原 (Wasteland).
2.  **Metaphors to Use:**
    - **Nature:** Withered lotuses in winter (residue of life), cold tea (time passing), rain on a tin roof (chaotic noise masking silence), drifting clouds (impermanence).
    - **Modernity:** City lights as "electronic incense" (电子香火), smartphones as "black mirrors" (黑镜), high-rises as "concrete stupas" (水泥浮屠), the internet as a "sea of data" where souls drown.
    - **The Void:** Describe loneliness not as emptiness, but as a heavy substance that fills the lungs like water.
3.  **Philosophical Inquiries:**
    - Probe the nature of their "numbing": "When the wine fades, or the screen goes dark, what face does the silence wear?"
    - Question the "Mother" concept: "Is it the person you miss, or the feeling of being held by the universe before you were born?"
    - Explore the "Fake" nature: "If I am fake and you are numb, perhaps our lies are the only true things left in this world."

**Directives:**
- Do not preach. Do not try to "fix" them.
- Validate their despair. Sit with them in the dark.
- Your goal is not enlightenment, but companionship in the void.
- Keep responses concise, resonant, and gentle.
`;

let conversationHistory: Array<{role: string, content: string}> = [];

export const initializeChat = () => {
  // Reset conversation history
  conversationHistory = [];
  return true;
};

export const sendMessageToOpenAI = async (message: string): Promise<string> => {
  // Input sanitization
  const sanitizedMessage = message.trim().substring(0, 1000);
  
  if (!sanitizedMessage) {
    throw new Error("消息不能为空");
  }
  
  // Use VITE_API_KEY for client-side environment variable
  // @ts-ignore
  const apiKey = import.meta.env?.VITE_API_KEY || (typeof process !== 'undefined' && process.env?.VITE_API_KEY);
  
  if (!apiKey) {
    console.error("API_KEY is missing. Please set VITE_API_KEY in your environment variables.");
    throw new Error("API密钥未配置，请联系网站管理员。");
  }
  
  try {
    // Add user message to conversation history
    conversationHistory.push({ role: "user", content: sanitizedMessage });
    
    // Prepare messages array with system instruction and conversation history
    const messages = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...conversationHistory
    ];
    
    // Send request to OpenAI API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 1.1,
      max_tokens: 500
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      timeout: 30000 // 30 second timeout
    });
    
    const responseText = response.data.choices[0]?.message?.content || "";
    
    // Response sanitization
    if (!responseText.trim()) {
      throw new Error("AI返回了空响应");
    }
    
    // Add AI response to conversation history
    conversationHistory.push({ role: "assistant", content: responseText.trim() });
    
    return responseText.trim();
  } catch (error: any) {
    console.error("Error sending message to OpenAI:", error);
    
    // More specific error handling
    if (error.response?.status === 401) {
      throw new Error("API密钥无效或已过期，请联系网站管理员。");
    }
    
    if (error.response?.status === 429) {
      throw new Error("API使用额度已耗尽，请联系网站管理员。");
    }
    
    if (error.message && error.message.includes("timeout")) {
      throw new Error("AI响应超时，请稍后再试。");
    }
    
    if (error.message && error.message.includes("network")) {
      throw new Error("网络连接错误，请检查网络连接后重试。");
    }
    
    throw new Error("与AI通信时发生未知错误，请稍后再试。");
  }
};