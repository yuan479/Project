import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useTitle from '@/hooks/useTitle'
import SelectionModal from '@/components/SelectionModal'
import { generateComic } from '@/api/comic'

import styles from './read.module.css'

const Read = () => {
    const { id, chapterId = '1' } = useParams()
    const navigate = useNavigate()
    const [chapter, setChapter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [fontSize, setFontSize] = useState(16)
    const [showSettings, setShowSettings] = useState(false)
    const [showChapters, setShowChapters] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    
    useTitle('诸天小说-阅读')
    
    useEffect(() => {
        // 模拟获取章节内容
        setLoading(true)
        setTimeout(() => {
            const mockChapter = {
                id: chapterId,
                title: `第${chapterId}章 ${generateChapterTitle()}`,
                content: generateChapterContent(),
                wordCount: Math.floor(Math.random() * 2000) + 1000,
                updateTime: new Date().toLocaleString()
            }
            setChapter(mockChapter)
            setLoading(false)
        }, 500)
    }, [chapterId])
    
    const generateChapterTitle = () => {
        const titles = [
            '初入修炼界',
            '神秘传承',
            '强者之路',
            '惊天一战',
            '突破瓶颈',
            '意外发现',
            '危机四伏',
            '绝地反击',
            '新的开始',
            '巅峰对决'
        ]
        return titles[Math.floor(Math.random() * titles.length)]
    }
    
    const generateChapterContent = () => {
        const paragraphs = []
        for (let i = 0; i < 15; i++) {
            paragraphs.push(generateParagraph())
        }
        return paragraphs.join('\n\n')
    }
    
    const generateParagraph = () => {
        const sentences = []
        for (let i = 0; i < 3; i++) {
            sentences.push(generateSentence())
        }
        return sentences.join('。') + '。'
    }
    
    const generateSentence = () => {
        const templates = [
            '萧炎站在{location}，感受着体内澎湃的斗气',
            '突然，一道{color}的光芒从{location}冲天而起',
            '{name}看着眼前的{object}，心中充满了{emotion}',
            '在这片{location}中，{name}开始了他的修炼之路',
            '随着{action}的进行，{name}的实力不断提升'
        ]
        
        const template = templates[Math.floor(Math.random() * templates.length)]
        return template
            .replace('{location}', ['修炼室', '广场', '森林', '山洞', '山顶'][Math.floor(Math.random() * 5)])
            .replace('{color}', ['金色', '银色', '紫色', '蓝色', '红色'][Math.floor(Math.random() * 5)])
            .replace('{name}', ['萧炎', '叶凡', '林动', '牧尘', '石昊'][Math.floor(Math.random() * 5)])
            .replace('{object}', ['丹药', '功法', '武器', '灵药', '传承'][Math.floor(Math.random() * 5)])
            .replace('{emotion}', ['激动', '兴奋', '紧张', '期待', '兴奋'][Math.floor(Math.random() * 5)])
            .replace('{action}', ['修炼', '战斗', '炼丹', '探索', '突破'][Math.floor(Math.random() * 5)])
    }
    
    const handlePrevChapter = () => {
        const prevChapter = Math.max(1, parseInt(chapterId) - 1)
        navigate(`/read/${id}/${prevChapter}`)
    }
    
    const handleNextChapter = () => {
        const nextChapter = parseInt(chapterId) + 1
        navigate(`/read/${id}/${nextChapter}`)
    }
    
    const handleFontSizeChange = (size) => {
        setFontSize(size)
    }

    // 处理文本选择
    const handleTextSelection = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        
        if (selectedText) {
            setIsModalVisible(true);
        }
    };

    // 生成漫画
    const handleGenerateComic = async (text, style) => {
        try {
            const result = await generateComic(text, style);
            console.log('漫画生成成功:', result);
            return result;
        } catch (error) {
            console.error('生成漫画失败:', error);
            throw error;
        }
    };

    // 关闭弹窗
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };
    
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
                <button className={styles.navBtn} onClick={() => navigate('/home')}>
                    <span>←</span>
                    返回
                </button>
                <h1 className={styles.chapterTitle}>{chapter.title}</h1>
                <div className={styles.headerActions}>
                    <button 
                        className={styles.navBtn}
                        onClick={() => setShowChapters(!showChapters)}
                    >
                        <span>📋</span>
                    </button>
                    <button 
                        className={styles.navBtn}
                        onClick={() => setShowSettings(!showSettings)}
                    >
                        <span>⚙️</span>
                    </button>
                </div>
            </div>
            
            {/* 阅读设置面板 */}
            {showSettings && (
                <div className={styles.settingsPanel}>
                    <h3>阅读设置</h3>
                    <div className={styles.fontSizeControl}>
                        <span>字体大小：</span>
                        <button 
                            className={styles.fontBtn}
                            onClick={() => handleFontSizeChange(fontSize - 1)}
                            disabled={fontSize <= 12}
                        >
                            A-
                        </button>
                        <span className={styles.fontSize}>{fontSize}px</span>
                        <button 
                            className={styles.fontBtn}
                            onClick={() => handleFontSizeChange(fontSize + 1)}
                            disabled={fontSize >= 24}
                        >
                            A+
                        </button>
                    </div>
                    <div className={styles.comicTip}>
                        💡 提示：选择文本内容可以生成漫画
                    </div>
                </div>
            )}
            
            {/* 章节列表 */}
            {showChapters && (
                <div className={styles.chaptersPanel}>
                    <h3>章节列表</h3>
                    <div className={styles.chaptersList}>
                        {Array.from({ length: 20 }, (_, i) => (
                            <div 
                                key={i + 1}
                                className={`${styles.chapterItem} ${parseInt(chapterId) === i + 1 ? styles.active : ''}`}
                                onClick={() => navigate(`/read/${id}/${i + 1}`)}
                            >
                                第{i + 1}章
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* 阅读内容 */}
            <div 
                className={styles.content} 
                style={{ fontSize: `${fontSize}px` }}
                onMouseUp={handleTextSelection}
            >
                {chapter.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className={styles.paragraph}>
                        {paragraph}
                    </p>
                ))}
            </div>
            
            {/* 底部导航 */}
            <div className={styles.footer}>
                <button 
                    className={styles.chapterBtn}
                    onClick={handlePrevChapter}
                    disabled={parseInt(chapterId) <= 1}
                >
                    <span>←</span>
                    上一章
                </button>
                <div className={styles.chapterInfo}>
                    <span>第{chapterId}章</span>
                    <span>{chapter.wordCount}字</span>
                </div>
                <button 
                    className={styles.chapterBtn}
                    onClick={handleNextChapter}
                >
                    下一章
                    <span>→</span>
                </button>
            </div>

            {/* 选择弹窗 */}
            <SelectionModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                onGenerateComic={handleGenerateComic}
            />
        </div>
    )
}

export default Read 