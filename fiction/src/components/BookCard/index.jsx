import { useNavigate } from 'react-router-dom';
import styles from './bookCard.module.css'

const BookCard = (props) => {
    const { cover, title, author, type, description, wordCount, status, rating, id } = props;
    const navigate = useNavigate();
    
    // 图片加载失败时的处理
    const handleImageError = (e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
    };
    
    // 点击跳转到详情页
    const handleClick = () => {
        navigate(`/detail/${id}`);
    };
    
    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.coverContainer}>
                <img 
                    src={cover} 
                    className={styles.cover} 
                    alt={title}
                    onError={handleImageError}
                />
                <div className={styles.placeholder}>
                    <span>小说</span>
                </div>
                <div className={styles.status}>{status}</div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.author}>{author}</p>
                <p className={styles.description}>{description}</p>
                <div className={styles.footer}>
                    <span className={styles.type}>{type}</span>
                    <span className={styles.wordCount}>{Math.floor(wordCount / 1000)}万字</span>
                    <div className={styles.rating}>
                        <span className={styles.star}>★</span>
                        <span>{rating}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookCard;
