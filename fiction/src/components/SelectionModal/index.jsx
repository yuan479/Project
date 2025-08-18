import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './selectionModal.module.css';

const SelectionModal = ({ isVisible, onClose, onGenerateComic }) => {
  const [selectedText, setSelectedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('anime');
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // 获取选中的文本
  const getSelectedText = () => {
    const selection = window.getSelection();
    if (selection.toString().trim()) {
      setSelectedText(selection.toString().trim());
    }
  };

  // 生成漫画
  const handleGenerateComic = async () => {
    if (!selectedText) return;
    
    setIsGenerating(true);
    try {
      const result = await onGenerateComic(selectedText, selectedStyle);
      
      if (result && result.success) {
        // 模拟生成漫画ID
        const comicId = Date.now().toString();
        
        // 显示成功消息
        alert('漫画生成成功！');
        
        // 跳转到漫画展示页面
        navigate(`/comic/${comicId}`);
        
        // 关闭弹窗
        onClose();
      } else {
        alert('生成失败，请重试');
      }
    } catch (error) {
      console.error('生成漫画失败:', error);
      alert('生成漫画失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 点击外部关闭弹窗
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('mouseup', getSelectedText);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mouseup', getSelectedText);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.header}>
          <h3>生成漫画</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.textSection}>
            <label>选中的文本内容：</label>
            <div className={styles.selectedText}>
              {selectedText || '请选择要生成漫画的文本内容'}
            </div>
          </div>
          
          <div className={styles.styleSection}>
            <label>漫画风格：</label>
            <select 
              value={selectedStyle} 
              onChange={(e) => setSelectedStyle(e.target.value)}
              className={styles.styleSelect}
            >
              <option value="anime">动漫风格</option>
              <option value="realistic">写实风格</option>
              <option value="cartoon">卡通风格</option>
              <option value="chinese">国漫风格</option>
            </select>
          </div>
          
          <div className={styles.actions}>
            <button 
              className={styles.generateBtn}
              onClick={handleGenerateComic}
              disabled={!selectedText || isGenerating}
            >
              {isGenerating ? '生成中...' : '生成漫画'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionModal; 