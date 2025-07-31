import { Search } from 'react-vant'
import useTitle from '@/hooks/useTitle'
import styles from './home.module.css'
import { useNavigate } from 'react-router-dom'
import { AppsO } from '@react-vant/icons'



const Home = () => {
    const navigate = useNavigate()
    useTitle('诸天小说-首页')
    return (
        <div>
            <Search placeholder="请输入搜索内容" onClickInput={()=>{navigate('/search')}} action={
                <AppsO onClick={
                    () => navigate('/sort')} fontSize={30} style={{ marginLeft: '10px' }
                    } />
            } />


            <div className={styles.AI_ball} onClick={() => navigate('/ai_chat')}>AI小助手</div>

        </div>
    )
}

export default Home