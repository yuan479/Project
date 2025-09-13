"use client"
import type { Message } from 'ai'
import ReactMarkdown from 'react-markdown'

interface ChatOutputProps {
    messages: Message[];
    status: string
}

export default function ChatOutput({
    messages,
    status
}: ChatOutputProps) {
    return (
        <>
            {
                messages.map((message, index) =>
                    message.role === 'user' ? (
                        <UserChat key={index} content={message.content} />
                    ) : (
                        <AssistantChat key={index} content={message.content} />
                    )
                )
            }
            {
                status ==="submitted"&&(
                    <div className='text-muted-foreground'>Generating...</div>
                )
            }
            {
                status ==="error"&&(
                    <div className="text-red-500">Error</div>
                )
            }
        </>
    )
}

const UserChat = ({ content }: { content: string }) => {
    return (
        <div className="bg-gradient-to-r from-pink-200 to-blue-200 rounded-2xl ml-auto max-w-[80%] w-fit px-4 py-3 mb-6 text-white shadow-md">
            {content}
        </div>

    )
}
const AssistantChat = ({ content }: { content: string }) => {
    return (
        <div className='pr-8 w-full mb-6'>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-gray-800 border border-gray-200 shadow-md">
                <ReactMarkdown
                    components={{
                        a: ({ href, children }) => (
                            <a target='_blank' href={href} className="text-blue-600 hover:text-blue-500 underline">{children}</a>
                        ),
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        code: ({ children }) => <code className="bg-gray-100 px-2 py-1 rounded text-pink-600">{children}</code>
                    }}
                >{content}</ReactMarkdown>
            </div>
        </div>
    )
}