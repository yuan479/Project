"use client"
//hooks
import { useChat } from '@ai-sdk/react'
import ChatOutput from '@/components/ChatOutput'
import ChatInput from '@/components/ChatInput'

export default function Home() {
  // chat llm 业务抽离
  const { input, messages, status, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  })
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-100/40 via-purple-100/40 to-blue-100/40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      
      <main className="relative z-10 max-w-4xl mx-auto h-screen flex flex-col">
        {/* 标题区域 */}
        <div className="flex-shrink-0 p-6 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            PhoneGPT
          </h1>
          <p className="text-gray-600 text-sm">智能对话助手</p>
        </div>
        
        {/* 聊天内容区域 */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-4">
          <ChatOutput messages={messages} status={status} />
        </div>
        
        {/* 固定在底部的输入框 */}
        <div className="flex-shrink-0 p-6">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
