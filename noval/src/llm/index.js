const DEEPSEEK_CHAT_API_URL = import.meta.env.VITE_DEEPSEEK_CHAT_URL
const VITE_DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY
/* deepseek-chat */
const DOUBAO_CHAT_API_URL = import.meta.env.VITE_DOUBAO_CHAT_URL
const VITE_DOUBAO_API_KEY = import.meta.env.VITE_DOUBAO_API_KEY
/* doubao-seed-1-6-flash-250615 */
export const chat = async (
    messages,
    api_url = DOUBAO_CHAT_API_URL,
    api_key = VITE_DOUBAO_API_KEY,
    model = 'doubao-seed-1-6-flash-250615'
) => {
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model: model,
                messages,
                stream: false,
            })
        })
        const data = await response.json()
        return {
            code: 0,
            content: data.choices[0].message.content
        }
    } catch (error) {
        return {
            code: 0,
            msg: 'AI回答失败了...(っ °Д °;)っ',
        }
    }
}