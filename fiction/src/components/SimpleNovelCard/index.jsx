import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectionModal from '../SelectionModal';
import { generateComic } from '../../api/comic';
import styles from './simpleNovelCard.module.css';

const SimpleNovelCard = ({ novel, keyword }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // 高亮关键词的函数
  const highlightKeyword = (text, keyword) => {
    if (!keyword) return text;
    
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === keyword.toLowerCase()) {
        return <span key={index} className={styles.highlight}>{part}</span>;
      }
      return part;
    });
  };

  // 点击跳转到详情页
  const handleClick = () => {
    navigate(`/detail/${novel.id}`);
  };

  // 处理文本选择
  const handleTextSelection = (e) => {
    e.stopPropagation(); // 阻止事件冒泡，避免触发跳转
    
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

  return (
    <>
      <div 
        className={styles.card} 
        onClick={handleClick}
        onMouseUp={handleTextSelection}
        style={{ userSelect: 'text' }} // 允许文本选择
      >
        <span className={styles.title}>
          {highlightKeyword(novel.title, keyword)}
        </span>
        {novel.description && (
          <div className={styles.description}>
            {highlightKeyword(novel.description, keyword)}
          </div>
        )}
      </div>
      
      <SelectionModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onGenerateComic={handleGenerateComic}
      />
    </>
  );
};

export default SimpleNovelCard; 