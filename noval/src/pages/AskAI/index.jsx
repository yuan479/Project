import useTitle from '@/hooks/useTitle'
import { doubao_chat, deepseek_chat, moonshot_chat } from '@/llm'
import { useEffect } from 'react'

const AskAI = () => {
    useTitle('智言书城 - 问AI')
    useEffect(() => {
        const fetchChat = async () => {
            const res = await moonshot_chat([
                {
                    role:'user',
                    content:'你是谁'
                }
            ])
            console.log(res)
        }
        fetchChat()
    },[])
    return (
        <>
            <div>问AI</div>
        </>
    )
}

export default AskAI