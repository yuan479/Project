import {embed,streamText} from 'ai'
import {createOpenAI} from '@ai-sdk/openai'
import {createClient} from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL??'',
  process.env.SUPABASE_KEY??''
)
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
})

async function generateEmbedding(text:string){
  return await embed({
    model:openai.embedding('text-embedding-3-small'),
    value:text
  })
}

async function fetchRelevantContext(embedding:number[]){
  const {
    data,
    error
  }= await supabase.rpc("get_relevant_chunks",{
    query_vector:embedding,
    match_threshold:0.7,
    match_count:3
  })
  if(error){
    throw error
  }
  console.log(data,'妖魔鬼怪快离开~妖魔鬼怪快离开~')
  return JSON.stringify(
    data.map((item:any)=>`
      来源: ${item.url},
      更新日期: ${item.date_updated},
      内容: ${item.content}
      ========================
      `)
  )
}
const createPrompt =(context:string,userQuestion:string)=>{
  return{
    role:'system',
    content:`
     你是一个专业的 JavaScript ES6+ 技术助手，专门帮助开发者学习和解决 ES6 相关的问题。
     请使用以下上下文信息来回答问题：
     ----------------
     开始上下文
     ${context}
     结束上下文
     ----------------
     
     请以 markdown 格式返回答案，包含相关的代码示例、链接和最后更新日期。
     当上述上下文信息不足以回答问题时，请基于你的知识提供答案，但需要提醒用户
     这些信息可能不是最新的。
     如果用户询问的问题与 JavaScript ES6+ 无关，请礼貌地告知他们你只能回答关于 JavaScript ES6+ 技术的问题。
     
     请参考阮一峰的 ES6 教程网站风格，提供清晰、实用的技术解答。
     
     ----------------
     问题: ${userQuestion}
     ----------------
    `
  }
}

export async function POST(req:Request){
  try{
    const {messages} = await req.json()
    const latestMessage = messages.at(-1).content
    //embedding
    const {embedding} = await generateEmbedding(latestMessage)
    //console.log(embedding)
    //相似度计算
    const context = await fetchRelevantContext(embedding)
    const prompt = createPrompt(context,latestMessage)
    console.log(prompt,'prompt')
    const result = streamText({
      model:openai('gpt-4o-mini'),
      messages:[prompt,...messages]
    })
    return result.toDataStreamResponse()
  }catch(err){
    console.error('API错误:', err)
    throw err
  }
}