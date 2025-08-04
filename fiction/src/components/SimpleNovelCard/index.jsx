import React from 'react';
import styles from './simpleNovelCard.module.css';

const SimpleNovelCard = ({ novel, keyword }) => {
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

  return (
    <div className={styles.card}>
      <span className={styles.title}>
        {highlightKeyword(novel.title, keyword)}
      </span>
    </div>
  );
};

export default SimpleNovelCard; 