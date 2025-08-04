import {
    memo,
    useRef,
    useState,
    useEffect,
    useMemo
} from 'react';
import {
    debounce
} from '../../utils'
import {
    ArrowLeft,
    Close
} from '@react-vant/icons'
import styles from './search.module.css'

const SearchBox = (props) => {
    // /api 
    // 单项数据流
    // 子父通信
    const [query, setQuery] = useState("");
    const { handleQuery} = props
    // 非受控组件
    const queryRef = useRef(null);
    const handleChange = (e) => {
        let val = e.currentTarget.value;
        setQuery(val);
    }
    const clearQuery = () => {
        setQuery("");
        queryRef.current.value = "";
        queryRef.current.focus();
    }
    
    // 使用useMemo缓存防抖函数，避免重复创建
    const handleQueryDebounce = useMemo(() => {
        return debounce(handleQuery, 300);
    }, [handleQuery])
    
    const displayStyle = query?{display: 'block'}:{display:'none'};
    
    useEffect(() => {
        console.log('搜索关键词:', query, '/////');
        if (query !== undefined) {
            handleQueryDebounce(query);
        }
    }, [query, handleQueryDebounce])

    return (
        <div className={styles.wrapper}>
            <ArrowLeft onClick={() => history.go(-1)}/> 
            <div className={styles.inputContainer}>
                <input 
                    type="text" 
                    className={styles.ipt}
                    placeholder='输入关键词生成相关小说'
                    ref={queryRef}
                    onChange={handleChange}
                />
                {/* 移动端用户体验 */}
                <Close 
                    onClick={clearQuery} 
                    style={displayStyle}
                    className={styles.clearButton}
                />
            </div>
        </div>
    )
}

export default memo(SearchBox)
