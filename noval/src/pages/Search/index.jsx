import React, { useState, useEffect, useCallback } from 'react';
import SearchBox from '../../components/SearchBox';
import SimpleNovelCard from '../../components/SimpleNovelCard';
import useSearchStore from '../../store/useSearchStore';
import styles from './search.module.css';

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentKeyword, setCurrentKeyword] = useState('');
    
    const { suggestList, setSuggestList, hotList, setHotList } = useSearchStore();
    
    // 使用useCallback缓存handleQuery函数，避免重复创建
    const handleQuery = useCallback(async (query) => {
        if (!query || query.trim() === '') {
            setSearchResults([]);
            setHasSearched(false);
            setCurrentKeyword('');
            return;
        }
        
        setLoading(true);
        setHasSearched(true);
        setCurrentKeyword(query);
        
        try {
            // 每次搜索都重新调用API生成新数据
            await setSuggestList(query);
        } catch (error) {
            console.error('搜索失败:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    }, [setSuggestList]);
    
    // 初始化热门列表
    useEffect(() => {
        setHotList();
    }, [setHotList]);
    
    // 监听suggestList变化，实时更新搜索结果
    useEffect(() => {
        if (suggestList && suggestList.length > 0) {
            setSearchResults(suggestList);
        } else if (hasSearched) {
            setSearchResults([]);
        }
    }, [suggestList, hasSearched]);

    return (
        <div className={styles.container}>
            <SearchBox handleQuery={handleQuery} />
            
            <div className={styles.content}>
                {loading && (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>正在查找相关小说...</p>
                    </div>
                )}
                
                {!loading && hasSearched && searchResults.length === 0 && (
                    <div className={styles.empty}>
                        <p>没有找到相关小说</p>
                        <p>请尝试其他关键词</p>
                    </div>
                )}
                
                {!loading && searchResults.length > 0 && (
                    <div className={styles.results}>
                        <div className={styles.resultCount}>
                            为您找到了 {searchResults.length} 本相关小说
                        </div>
                        {searchResults.map((novel, index) => (
                            <SimpleNovelCard 
                                key={`${novel.id}-${index}`} 
                                novel={novel} 
                                keyword={currentKeyword}
                            />
                        ))}
                    </div>
                )}
                
                {!hasSearched && !loading && (
                    <div className={styles.placeholder}>
                        <div className={styles.hotList}>
                            <h3>热门小说</h3>
                            <div className={styles.hotItems}>
                                {hotList.map(item => (
                                    <div key={item.id} className={styles.hotItem}>
                                        <span className={styles.hotTitle}>{item.title}</span>
                                        <span className={styles.hotType}>{item.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p>输入关键词开始搜索</p>
                        <p>系统会根据关键词查找相关小说</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
