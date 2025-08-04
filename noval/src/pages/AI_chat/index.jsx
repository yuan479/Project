import useTitle from '@/hooks/useTitle'
import { Input, Button, Toast, NavBar, Loading } from 'react-vant'
import { useState } from 'react'
import styles from './ai_chat.module.css'
import { ChatO, UserO } from '@react-vant/icons'
import { chat } from '@/llm'
import { useNavigate } from 'react-router-dom'

const AI_chat = () => {
    useTitle('诸天小说-AI助手')
    const [text, setText] = useState('')
    const [isSending, setIsSending] = useState(false)
    const navigate = useNavigate()
    const [messages, setMessages] = useState([
        {
            role: 'user',
            content: '你好'
        },
        {
            role: 'assistant',
            content: '你好，我是AI助手，你可以和我聊天'
        },
      
    ]
    )
    const handleChat = async () => {
        if (text.trim() === '') {
            Toast.info({ message: '聊天内容不能为空' });
            return;
        }
        setIsSending(true);

        // 先加上用户消息
        const newMessages = [
            ...messages,
            {
                role: 'user',
                content: text
            }
        ];
        setMessages(newMessages);
        setText('');

        // 请求 AI 回复，传递全部历史消息
        const newMessage = await chat(newMessages);
        setMessages([
            ...newMessages,
            newMessage.data
        ]);
        setIsSending(false);

    }


    return (

        <div className={styles.ai_chat}>
            <NavBar title='AI 小助手' leftText='' onClickLeft={() => navigate('/home')} />

            <div className={styles.chatArea}>
                {isSending && (<div className="flexd-loading"><Loading style={{ textAlign: 'center', innerWidth: '100%' }} type="ball" /></div>)}
                {
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={styles.prechat}
                            style={{
                                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                            }}
                        >
                            <div className={msg.role === 'user' ? styles.imgRight : styles.imgLeft}>
                                {msg.role === 'user' ? <UserO /> : <ChatO />}
                            </div>
                            <div className={msg.role === 'user' ? styles.msgRight : styles.msgLeft}>
                                {msg.content.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={styles.inputArea}>
                <Input
                    value={text}
                    placeholder="请输入聊天内容"
                    onChange={(e) => { setText(e) }}
                    className={styles.input}
                />
                <Button disabled={isSending} type='primary' onClick={handleChat}>发送</Button>
            </div>
        </div>
    )
}

export default AI_chat