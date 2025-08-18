import { Search } from 'react-vant'
import useTitle from '../../hooks/useTitle'
import styles from './home.module.css'
import { useNavigate } from 'react-router-dom'

import { useBookStore } from '../../store/useBookStore'
import { useEffect } from 'react'
import Waterfall from '../../components/Waterfall'

const Home = () => {
    const navigate = useNavigate()
    const { loading, books, fetchMore } = useBookStore();
    
    useTitle('诸天小说-首页')
    
    useEffect(() => {
        fetchMore()
    }, [fetchMore])
    
    // 获取推荐小说（前两本）
    const featuredBooks = books.filter(book => book.id.startsWith('featured_'));
    const regularBooks = books.filter(book => !book.id.startsWith('featured_'));
    
    const handleBookClick = (bookId) => {
        navigate(`/detail/${bookId}`);
    };
    
    return (
        <div>
            <Search placeholder="请输入搜索内容" onClickInput={()=>{navigate('/search')}} action={
                <span onClick={() => navigate('/sort')} style={{ marginLeft: '10px', fontSize: '20px' }}>📱</span>
            } />

            {/* 推荐小说区域 */}
            {featuredBooks.length > 0 && (
                <div className={styles.featuredSection}>
                    <h2 className={styles.featuredTitle}>
                        <span style={{ color: '#ffd700', marginRight: '8px' }}>★</span>
                        推荐小说
                    </h2>
                    <div className={styles.featuredBooks}>
                        {featuredBooks.map((book) => (
                            <div 
                                key={book.id} 
                                className={styles.featuredBook}
                                onClick={() => handleBookClick(book.id)}
                            >
                                <img 
                                    src={book.cover} 
                                    alt={book.title}
                                    className={styles.featuredCover}
                                />
                                <div className={styles.featuredInfo}>
                                    <h3 className={styles.featuredTitle}>{book.title}</h3>
                                    <p className={styles.featuredAuthor}>{book.author}</p>
                                    <p className={styles.featuredDesc}>{book.description}</p>
                                    <div className={styles.featuredStats}>
                                        <span className={styles.featuredType}>{book.type}</span>
                                        <span className={styles.featuredStatus}>{book.status}</span>
                                        <span className={styles.featuredRating}>★ {book.rating}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.AI_ball} onClick={() => navigate('/ai_chat')}>AI小助手</div>

            <Waterfall books={regularBooks} fetchMore={fetchMore} loading={loading}/>
        </div>
    )
}

export default Home