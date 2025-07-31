import {Search} from 'react-vant'

const Search =()=>{
    return(
        <div>
            <Search placeholder="请输入搜索内容" />


            <div className={styles.AI_ball} onClick={() => navigate('/ai_chat')}>AI小助手</div>

        </div>
    )
}
export default Search