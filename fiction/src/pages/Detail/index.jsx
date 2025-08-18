import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import styles from './detail.module.css'
import useDetailStore from '../../store/useDetailStore'
import useBookShelfStore from '../../store/useBookShelfStore'

const Detail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { detail, loading, setDetail } = useDetailStore()
    const { addToShelf, removeFromShelf, isInShelf } = useBookShelfStore()
    const [isFollowed, setIsFollowed] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [isInShelfState, setIsInShelfState] = useState(false)

    useTitle(`${detail.title || '书籍详情'} - 诸天小说`)

    useEffect(() => {
        if (id) {
            setDetail(id).catch(error => {
                console.error('获取书籍详情失败:', error)
            })
        }
    }, [id, setDetail])

    // 检查书籍是否在书架中
    useEffect(() => {
        if (detail.id) {
            setIsInShelfState(isInShelf(detail.id))
        }
    }, [detail.id, isInShelf])

    const handleBack = () => {
        navigate(-1)
    }

    const handleRead = () => {
        navigate(`/read/${id}`)
    }

    const handleChapters = () => {
        navigate(`/chapters/${id}`)
    }

    const handleFollow = () => {
        setIsFollowed(!isFollowed)
        alert(isFollowed ? '已取消关注' : '已关注')
    }

    const handleLike = () => {
        setIsLiked(!isLiked)
        alert(isLiked ? '已取消点赞' : '已点赞')
    }

    const handleShare = () => {
        alert('分享功能开发中...')
    }

    // 添加到书架
    const handleAddToShelf = () => {
        if (isInShelfState) {
            // 如果已在书架中，则移除
            removeFromShelf(detail.id)
            setIsInShelfState(false)
        } else {
            // 添加到书架
            const success = addToShelf(detail)
            if (success) {
                setIsInShelfState(true)
            }
        }
    }

    if (loading) {
        return (
            <div className={styles.loading}>
                <div>加载中...</div>
            </div>
        )
    }

    if (!detail.id) {
        return (
            <div className={styles.error}>
                <div>书籍不存在</div>
                <button onClick={handleBack}>返回</button>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {/* 导航栏 */}
            <div className={styles.nav}>
                <button onClick={handleBack}>← 返回</button>
                <span>书籍详情</span>
                <button onClick={handleShare}>分享</button>
            </div>

            {/* 书籍信息头部 */}
            <div className={styles.header}>
                <div className={styles.bookInfo}>
                    <img 
                        src={detail.cover} 
                        alt={detail.title}
                        className={styles.cover}
                    />
                    <div className={styles.info}>
                        <h1 className={styles.title}>{detail.title}</h1>
                        <p className={styles.author}>作者：{detail.author}</p>
                        <div>
                            <span className={styles.type}>{detail.type}</span>
                            <span className={styles.status}>{detail.status}</span>
                        </div>
                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <div className={styles.statNumber}>{detail.rating}</div>
                                <div className={styles.statLabel}>评分</div>
                            </div>
                            <div className={styles.stat}>
                                <div className={styles.statNumber}>{detail.readCount}</div>
                                <div className={styles.statLabel}>阅读</div>
                            </div>
                            <div className={styles.stat}>
                                <div className={styles.statNumber}>{detail.followCount}</div>
                                <div className={styles.statLabel}>关注</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 操作按钮 */}
                <div className={styles.actions}>
                    <button 
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        onClick={handleRead}
                    >
                        开始阅读
                    </button>
                    <button 
                        className={`${styles.btn} ${styles.btnSecondary}`}
                        onClick={handleChapters}
                    >
                        目录
                    </button>
                    <button 
                        className={`${styles.btn} ${isInShelfState ? styles.btnSuccess : styles.btnSecondary}`}
                        onClick={handleAddToShelf}
                    >
                        {isInShelfState ? '已在书架' : '添加到书架'}
                    </button>
                    <button 
                        className={`${styles.btn} ${styles.btnSecondary}`}
                        onClick={handleFollow}
                    >
                        {isFollowed ? '已关注' : '关注'}
                    </button>
                    <button 
                        className={`${styles.btn} ${styles.btnSecondary}`}
                        onClick={handleLike}
                    >
                        {isLiked ? '已点赞' : '点赞'}
                    </button>
                </div>
            </div>

            {/* 书籍简介 */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>简介</h2>
                <p className={styles.description}>{detail.description}</p>
            </div>

            {/* 标签 */}
            {detail.tags && detail.tags.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>标签</h2>
                    <div className={styles.tags}>
                        {detail.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* 评论 */}
            {detail.reviews && detail.reviews.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>读者评论</h2>
                    <div className={styles.reviewsList}>
                        {detail.reviews.map((review) => (
                            <div key={review.id} className={styles.review}>
                                <div className={styles.reviewHeader}>
                                    <img 
                                        src={review.avatar} 
                                        alt={review.user}
                                        className={styles.avatar}
                                    />
                                    <div className={styles.reviewInfo}>
                                        <div className={styles.reviewUser}>{review.user}</div>
                                        <div className={styles.reviewTime}>{review.time}</div>
                                    </div>
                                    <div className={styles.reviewRating}>
                                        {[...Array(5)].map((_, i) => (
                                            <span 
                                                key={i} 
                                                className={styles.star}
                                                style={{ color: i < review.rating ? '#ffd700' : '#ddd' }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.reviewContent}>{review.content}</div>
                                <div className={styles.reviewActions}>
                                    <span className={styles.reviewAction}>👍 {review.likeCount}</span>
                                    <span className={styles.reviewAction}>回复</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 底部阅读按钮 */}
            <div className={styles.readActions}>
                <button 
                    className={`${styles.readBtn} ${styles.readBtnPrimary}`}
                    onClick={handleRead}
                >
                    开始阅读
                </button>
                <button 
                    className={`${styles.readBtn} ${styles.readBtnSecondary}`}
                    onClick={handleChapters}
                >
                    查看目录
                </button>
            </div>
        </div>
    )
}

export default Detail
