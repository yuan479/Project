import {Search } from 'react-vant'
import useTitle  from '@/hooks/useTitle'

const Home =()=>{
    useTitle('诸天小说-首页')
    return(
       <div>
       <Search placeholder="请输入搜索内容"/>
       </div>
    )
}

export default Home