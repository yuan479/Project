const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions'

export const chat = async (
  messages,
  api_url = DEEPSEEK_CHAT_API_URL,
  api_key = import.meta.env.VITE_DEEPSEEK_API_KEY,
  model= 'deepseek-chat'

) => {
  try {
      const response = await fetch(api_url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${api_key}`, // 替换为你的 DeepSeek API 密钥
          },
          body: JSON.stringify({
              model, // 使用 DeepSeek 的聊天模型
              messages, // 用户的消息
              stream: false, // 不使用流式响应
          })
      })
      const data = await response.json()
      return {
          code: 0,
          data: {
              role: 'assistant',
              content: data.choices[0].message.content,
          }

      }
  } catch (err) {
      return {
          code: 0,
          msg: "失败",

      }
  }
}


