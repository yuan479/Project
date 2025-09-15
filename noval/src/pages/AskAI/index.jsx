import useTitle from '@/hooks/useTitle'
import { doubao_chat, deepseek_chat, moonshot_chat } from '@/llm'
import { useState, useEffect, useRef } from 'react'
import styles from './askai.module.css'

const AskAI = () => {
    useTitle('智言书城 - 问AI')
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const chatAreaRef = useRef(null)
    const inputRef = useRef(null)

    // 自动滚动到底部
    const scrollToBottom = () => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // 发送消息
    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return

        const userMessage = {
            role: 'user',
            content: inputValue.trim()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsLoading(true)

        try {
            const res = await moonshot_chat([...messages, userMessage])
            
            if (res.code === 1) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: res.content
                }])
            } else {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `抱歉，AI回答失败了：${res.msg}`
                }])
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '抱歉，发生了网络错误，请稍后重试。'
            }])
        } finally {
            setIsLoading(false)
        }
    }

    // 处理键盘事件
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    // 处理输入框变化
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }


    return (
        <div className='flex flex-col h-all'>
            <div ref={chatAreaRef} className={styles.chatArea}>
                {messages.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyStateIcon}>🤖</div>
                        <div className={styles.emptyStateText}>你好！我是你的AI助手</div>
                        <div className={styles.emptyStateSubtext}>有什么想看的书尽管问我吧～</div>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div key={index} className={`${styles.message} ${styles[message.role]}`}>
                            <div className={styles.messageBubble}>
                                <div className={styles.messageContent}>
                                    {message.content}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                
                {isLoading && (
                    <div className={`${styles.message} ${styles.assistant}`}>
                        <div className={styles.typingIndicator}>
                            <div className={styles.typingDot}></div>
                            <div className={styles.typingDot}></div>
                            <div className={styles.typingDot}></div>
                        </div>
                    </div>
                )}
            </div>
            
            <div className={styles.inputArea}>
                <div className={styles.inputContainer}>
                    <textarea
                        ref={inputRef}
                        className={styles.messageInput}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="输入你的问题..."
                        disabled={isLoading}
                        rows={1}
                    />
                </div>
                <button
                    className={styles.sendButton}
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                >
                    {isLoading ? '⏳' : '📤'}
                </button>
            </div>
        </div>
    )
}

export default AskAI