import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTitle from '@/hooks/useTitle';
import styles from './comicView.module.css';

const ComicView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [comic, setComic] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useTitle('诸天小说-漫画');
    
    useEffect(() => {
        // 模拟获取漫画数据
        setLoading(true);
        setTimeout(() => {
            const mockComic = {
                id: id,
                title: '萧炎的修炼之路',
                originalText: '萧炎站在修炼室中，感受着体内澎湃的斗气。突然，一道金色的光芒从修炼室冲天而起，萧炎看着眼前的丹药，心中充满了激动。',
                imageUrl: 'https://via.placeholder.com/400x600/667eea/ffffff?text=漫画预览',
                generateTime: new Date().toLocaleString(),
                style: 'anime'
            };
            setComic(mockComic);
            setLoading(false);
        }, 1000);
    }, [id]);
    
    const handleSave = () => {
        // 保存漫画到收藏
        alert('漫画已保存到收藏！');
    };
    
    const handleShare = () => {
        // 分享漫画
        if (navigator.share) {
            navigator.share({
                title: comic.title,
                text: comic.originalText,
                url: window.location.href
            });
        } else {
            // 复制链接
            navigator.clipboard.writeText(window.location.href);
            alert('链接已复制到剪贴板！');
        }
    };
    
    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>加载中...</div>
            </div>
        );
    }
    
    return (
        <div className={styles.container}>
            {/* 顶部导航 */}
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <span>←</span>
                    返回
                </button>
                <h1 className={styles.title}>{comic.title}</h1>
                <div className={styles.headerActions}>
                    <button className={styles.actionBtn} onClick={handleSave}>
                        <span>💾</span>
                    </button>
                    <button className={styles.actionBtn} onClick={handleShare}>
                        <span>📤</span>
                    </button>
                </div>
            </div>
            
            {/* 漫画内容 */}
            <div className={styles.content}>
                <div className={styles.comicSection}>
                    <div className={styles.comicImage}>
                        <img src={comic.imageUrl} alt={comic.title} />
                    </div>
                </div>
                
                <div className={styles.infoSection}>
                    <div className={styles.originalText}>
                        <h3>原文内容</h3>
                        <p>{comic.originalText}</p>
                    </div>
                    
                    <div className={styles.comicInfo}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>生成时间：</span>
                            <span>{comic.generateTime}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>漫画风格：</span>
                            <span>{comic.style === 'anime' ? '动漫风格' : comic.style}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 底部操作 */}
            <div className={styles.footer}>
                <button className={styles.generateBtn} onClick={() => navigate('/read/1/1')}>
                    继续阅读
                </button>
                <button className={styles.generateBtn} onClick={() => navigate('/search')}>
                    生成更多
                </button>
            </div>
        </div>
    );
};

export default ComicView; 