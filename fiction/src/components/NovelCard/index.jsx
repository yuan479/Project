import React from 'react';
import styles from './novelCard.module.css';

const NovelCard = ({ novel }) => {
  return (
    <div className={styles.card}>
      <div className={styles.coverContainer}>
        <img src={novel.cover} alt={novel.title} className={styles.cover} />
        <div className={styles.status}>{novel.status}</div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{novel.title}</h3>
        <p className={styles.author}>{novel.author}</p>
        <p className={styles.description}>{novel.description}</p>
        <div className={styles.tags}>
          {novel.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.info}>
            <span className={styles.type}>{novel.type}</span>
            <span className={styles.wordCount}>{Math.floor(novel.wordCount / 1000)}万字</span>
          </div>
          <div className={styles.rating}>
            <span className={styles.star}>★</span>
            <span>{novel.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelCard; 