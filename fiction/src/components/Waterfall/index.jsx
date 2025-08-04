import styles from './waterfall.module.css';
import { useEffect, useRef, useMemo } from 'react';
import BookCard from '../BookCard'

const Waterfall = (props) => {
    const loader = useRef(null)
    const {
        loading,
        fetchMore,
        books
    } = props

    // 计算瀑布流布局
    const waterfallLayout = useMemo(() => {
        if (!books || books.length === 0) return { leftColumn: [], rightColumn: [] };
        
        const leftColumn = [];
        const rightColumn = [];
        let leftHeight = 0;
        let rightHeight = 0;
        
        books.forEach((book) => {
            // 更准确的高度计算：封面200px + 内容区域约140px + 间距16px
            const estimatedHeight = 200 + 140 + 16; // 356px
            
            if (leftHeight <= rightHeight) {
                leftColumn.push(book);
                leftHeight += estimatedHeight;
            } else {
                rightColumn.push(book);
                rightHeight += estimatedHeight;
            }
        });
        
        return { leftColumn, rightColumn };
    }, [books]);

    useEffect(() => {
        //判断ref出现在了视窗  intersetctionObserver
        //观察者模式 
        const observer = new IntersectionObserver(([entry]) => {
            console.log(entry)
            if (entry.isIntersecting) {
                fetchMore()
            }
            // observer.unobserve(entry.target)
        })
        if (loader.current) observer.observe(loader.current)
        return () => observer.disconnect()
    }, [fetchMore])

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.column}>
                    {
                        waterfallLayout.leftColumn.map((book) => (
                            <BookCard key={`left-${book.id}`} {...book} />
                        ))
                    }
                </div>
                <div className={styles.column}>
                    {
                        waterfallLayout.rightColumn.map((book) => (
                            <BookCard key={`right-${book.id}`} {...book} />
                        ))
                    }
                </div>
            </div>
            <div ref={loader} className={styles.loader}> 
                {loading ? '玩命加载中...' : '滚动加载更多'}
            </div>
        </>
    )
}

export default Waterfall
