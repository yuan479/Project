import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTitle from '@/hooks/useTitle'
import { useBookShelfStore } from '@/store/useBookShelfStore'
import styles from './bookshelf.module.css'

const BookShelf = () => {
    const navigate = useNavigate()
    const { books, removeFromShelf, clearShelf, getShelfCount } = useBookShelfStore()
    const [showConfirm, setShowConfirm] = useState(false)

    useTitle('诸天小说-书架')

    const handleRead = (bookId) => {
        navigate(`/read/${bookId}`)
    }

    const handleDetail = (bookId) => {
        navigate(`/detail/${bookId}`)
    }

    const handleRemove = (bookId, event) => {
        event.stopPropagation()
        removeFromShelf(bookId)
    }

    const handleClearShelf = () => {
        setShowConfirm(true)
    }

    const confirmClearShelf = () => {
        clearShelf()
        setShowConfirm(false)
    }

    const cancelClearShelf = () => {
        setShowConfirm(false)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('zh-CN')
    }

    return (
        <div className={styles.container}>
            {/* 头部 */}
            <div className={styles.header}>
                <h1 className={styles.title}>我的书架</h1>
                <div className={styles.headerActions}>
                    <span className={styles.bookCount}>{getShelfCount()} 本书</span>
                    {books.length > 0 && (
                        <button 
                            className={styles.clearBtn}
                            onClick={handleClearShelf}
                        >
                            清空书架
                        </button>
                    )}
                </div>
            </div>

            {/* 书架内容 */}
            {books.length === 0 ? (
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>📚</div>
                    <h3>书架空空如也</h3>
                    <p>快去添加一些喜欢的书籍吧！</p>
                    <button 
                        className={styles.browseBtn}
                        onClick={() => navigate('/home')}
                    >
                        去浏览书籍
                    </button>
                </div>
            ) : (
                <div className={styles.booksGrid}>
                    {books.map((book) => (
                        <div 
                            key={book.id} 
                            className={styles.bookCard}
                            onClick={() => handleDetail(book.id)}
                        >
                            <div className={styles.bookCover}>
                                <img 
                                    src={book.cover} 
                                    alt={book.title}
                                    className={styles.cover}
                                />
                                <div className={styles.bookActions}>
                                    <button 
                                        className={styles.readBtn}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRead(book.id)
                                        }}
                                    >
                                        阅读
                                    </button>
                                    <button 
                                        className={styles.removeBtn}
                                        onClick={(e) => handleRemove(book.id, e)}
                                    >
                                        移除
                                    </button>
                                </div>
                            </div>
                            <div className={styles.bookInfo}>
                                <h3 className={styles.bookTitle}>{book.title}</h3>
                                <p className={styles.bookAuthor}>{book.author}</p>
                                <div className={styles.bookMeta}>
                                    <span className={styles.bookType}>{book.type}</span>
                                    <span className={styles.bookStatus}>{book.status}</span>
                                </div>
                                {book.readProgress > 0 && (
                                    <div className={styles.progress}>
                                        <div className={styles.progressBar}>
                                            <div 
                                                className={styles.progressFill}
                                                style={{ width: `${book.readProgress}%` }}
                                            ></div>
                                        </div>
                                        <span className={styles.progressText}>
                                            {book.readProgress}%
                                        </span>
                                    </div>
                                )}
                                <div className={styles.bookTime}>
                                    添加于 {formatDate(book.addedTime)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 确认清空弹窗 */}
            {showConfirm && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>确认清空书架</h3>
                        <p>确定要清空所有书籍吗？此操作不可恢复。</p>
                        <div className={styles.modalActions}>
                            <button 
                                className={styles.cancelBtn}
                                onClick={cancelClearShelf}
                            >
                                取消
                            </button>
                            <button 
                                className={styles.confirmBtn}
                                onClick={confirmClearShelf}
                            >
                                确认清空
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BookShelf