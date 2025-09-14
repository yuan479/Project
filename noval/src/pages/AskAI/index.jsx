import useTitle from '@/hooks/useTitle'
import { chat } from '@/llm'
import { useEffect } from 'react'

const AskAI = () => {
    useTitle('智言书城 - 问AI')
    useEffect(() => {
        const fetchChat = async () => {
            const res = await chat([
                {
                    role:'user',
                    content:'有什么推荐的悬疑小说'
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