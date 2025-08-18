import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useTitle from '@/hooks/useTitle'

import styles from './chapters.module.css'

const Chapters = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [chapters, setChapters] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [bookInfo, setBookInfo] = useState(null)
    
    useTitle('诸天小说-目录')
    
    useEffect(() => {
        // 模拟获取书籍信息和章节列表
        setLoading(true)
        setTimeout(() => {
            const mockBookInfo = {
                id: id,
                title: id.startsWith('featured_') ? 
                    (id === 'featured_1' ? '斗破苍穹' : '遮天') : 
                    '随机小说',
                author: id.startsWith('featured_') ? 
                    (id === 'featured_1' ? '天蚕土豆' : '辰东') : 
                    '未知作者',
                cover: id.startsWith('featured_') ? 
                    (id === 'featured_1' ? 
                        'https://img1.baidu.com/it/u=1835195614,131501638&fm=253&app=138&f=JPEG?w=800&h=800' : 
                        'https://img2.baidu.com/it/u=2048194672,703560066&fm=253&app=138&f=JPEG?w=800&h=800') : 
                    'https://img1.baidu.com/it/u=1835195614,131501638&fm=253&app=138&f=JPEG?w=800&h=800',
                totalChapters: 1647
            }
            
            const mockChapters = generateChapters(100) // 生成100章
            setBookInfo(mockBookInfo)
            setChapters(mockChapters)
            setLoading(false)
        }, 500)
    }, [id])
    
    const generateChapters = (count) => {
        const chapters = []
        const titles = [
            '初入修炼',
            '神秘传承',
            '强者之路',
            '惊天一战',
            '突破瓶颈',
            '意外发现',
            '危机四伏',
            '绝地反击',
            '新的开始',
            '巅峰对决',
            '神秘洞府',
            '古老遗迹',
            '强者云集',
            '惊天秘密',
            '命运转折'
        ]
        
        for (let i = 1; i <= count; i++) {
            const title = titles[Math.floor(Math.random() * titles.length)]
            chapters.push({
                id: i,
                title: `第${i}章 ${title}`,
                wordCount: Math.floor(Math.random() * 2000) + 1000,
                updateTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                isVip: Math.random() > 0.99 // 20%概率是VIP章节
            })
        }
        
        return chapters
    }
    
    const filteredChapters = chapters.filter(chapter => 
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    const handleChapterClick = (chapterId) => {
        navigate(`/read/${id}/${chapterId}`)
    }
    
    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>加载中...</div>
            </div>
        )
    }
    
    return (
        <div className={styles.container}>
            {/* 顶部导航 */}
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <span>←</span>
                    返回
                </button>
                <h1 className={styles.title}>目录</h1>
                <div className={styles.headerActions}>
                    <span className={styles.chapterCount}>{chapters.length}章</span>
                </div>
            </div>
            
            {/* 书籍信息 */}
            {bookInfo && (
                <div className={styles.bookInfo}>
                    <img 
                        src={bookInfo.cover} 
                        alt={bookInfo.title}
                        className={styles.bookCover}
                    />
                    <div className={styles.bookDetails}>
                        <h2 className={styles.bookTitle}>{bookInfo.title}</h2>
                        <p className={styles.bookAuthor}>{bookInfo.author}</p>
                        <p className={styles.bookChapters}>共{bookInfo.totalChapters}章</p>
                    </div>
                </div>
            )}
            
            {/* 搜索框 */}
            <div className={styles.searchSection}>
                <div className={styles.searchBox}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="搜索章节..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>
            
            {/* 章节列表 */}
            <div className={styles.chaptersList}>
                {filteredChapters.map((chapter) => (
                    <div 
                        key={chapter.id}
                        className={styles.chapterItem}
                        onClick={() => handleChapterClick(chapter.id)}
                    >
                        <div className={styles.chapterInfo}>
                            <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                            <div className={styles.chapterMeta}>
                                <span className={styles.wordCount}>{chapter.wordCount}字</span>
                                <span className={styles.updateTime}>{chapter.updateTime}</span>
                                {chapter.isVip && (
                                    <span className={styles.vipTag}>VIP</span>
                                )}
                            </div>
                        </div>
                        <div className={styles.chapterArrow}>
                            <span>→</span>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* 底部信息 */}
            <div className={styles.footer}>
                <p className={styles.footerText}>
                    共{chapters.length}章 • 点击章节开始阅读
                </p>
            </div>
        </div>
    )
}

export default Chapters 