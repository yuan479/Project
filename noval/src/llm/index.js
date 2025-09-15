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
    },
    doubao_image:{
        api_url:'https://ark.cn-beijing.volces.com/api/v3',
        api_key:'bb1a84e9-4d48-4712-a4fd-914e433d6156',
        model: 'doubaoseedream-3-0-t2i-250415'
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
            msg: '(っ °Д °;)っ，AI好像出错了...',
        }
    }
}

export const generateAvatar = async (text) => {
    const prompt = `
    你是一个专业的头像设计师，根据用户提供的个人信息，生成一个符合用户需求的头像。
    用户提供的个人信息：${text}
    头像要求：
    1. 头像风格：卡通风格
    2. 头像尺寸：80x80
    `
  
}

// 导出函数
export const deepseek_chat = (messages) => chat(messages, 'deepseek')
export const doubao_chat = (messages) => chat(messages, 'doubao')
export const moonshot_chat = (messages) => chat(messages, 'moonshot')
export { chat }