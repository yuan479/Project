// 模型配置
const MODEL_CONFIG = {
    deepseek: {
        api_url: import.meta.env.VITE_DEEPSEEK_CHAT_URL,
        api_key: import.meta.env.VITE_DEEPSEEK_API_KEY,
        model: 'deepseek-chat'
    },
    doubao: {
        api_url: import.meta.env.VITE_DOUBAO_CHAT_URL,
        api_key: import.meta.env.VITE_DOUBAO_API_KEY,
        model: 'doubao-seed-1-6-flash-250615'
    },
    moonshot:{
        api_url: import.meta.env.VITE_MOONSHOT_CHAT_URL,
        api_key: import.meta.env.VITE_MOONSHOT_API_KEY,
        model: 'moonshot-v1-8k'
    }
}

// 通用聊天函数
const chat = async (messages, modelType = 'deepseek') => {
    try {
        const config = MODEL_CONFIG[modelType]
        if (!config) {
            return {
                code: 0,
                msg: `不支持的模型类型: ${modelType}`
            }
        }

        const response = await fetch(config.api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.api_key}`
            },
            body: JSON.stringify({
                model: config.model,
                messages,
                stream: false,
            })
        })
        
        const data = await response.json()
        return {
            code: 1,
            content: data.choices[0].message.content
        }
    } catch (error) {
        return {
            code: 0,
            msg: 'AI回答失败了...(っ °Д °;)っ',
        }
    }
}

// 导出函数
export const deepseek_chat = (messages) => chat(messages, 'deepseek')
export const doubao_chat = (messages) => chat(messages, 'doubao')
export const moonshot_chat = (messages) => chat(messages, 'moonshot')
export { chat }