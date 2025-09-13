"use client"
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {ArrowUp} from 'lucide-react'
interface ChatInputProps{
    input:string;
    handleInputChange:(e:any)=>void;
    handleSubmit:(e:any)=>void;
}
//const ChatInput:React.FC<ChatInputProps> = ({})

export default function ChatInput({
    input,
    handleInputChange,
    handleSubmit
}:ChatInputProps){
    return(
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
        onChange={handleInputChange}
        value={input}
        placeholder="输入您的问题..."
        className="flex-1 bg-white/70 border-gray-200 text-gray-800 placeholder:text-gray-500 focus:bg-white focus:border-pink-300 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm"
        />
        <Button 
          type="submit"
          className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-2xl px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300"
        >
            <ArrowUp className="w-5 h-5"/>
            <span className="sr-only">发送</span>
        </Button>
       
      </form>
    )
}