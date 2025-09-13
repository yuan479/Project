// 占位图片工具函数
// 提供可靠的占位图片URL，避免依赖外部服务

// 使用 Picsum Photos 作为主要占位图片服务
const PICSUM_BASE = 'https://picsum.photos';

/**
 * 生成占位图片URL
 * @param {number|string} width - 图片宽度
 * @param {number|string} height - 图片高度
 * @param {string} text - 图片上的文字（可选）
 * @param {string} bgColor - 背景颜色（可选，十六进制格式）
 * @param {string} textColor - 文字颜色（可选，十六进制格式）
 * @returns {string} 占位图片URL
 */
export const getPlaceholderImage = (width, height, text = '', bgColor = 'f0f0f0', textColor = '666666') => {
  try {
    // 主要使用 Picsum Photos，它更稳定
    if (!text) {
      return `${PICSUM_BASE}/${width}/${height}?random=${Date.now()}`;
    }
    
    // 如果有文字，使用 via.placeholder.com
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
  } catch (error) {
    console.warn('占位图片生成失败，使用备用方案:', error);
    
    // 备用方案：返回一个简单的SVG占位图
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#${bgColor}"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
              fill="#${textColor}" text-anchor="middle" dy=".3em">
          ${text || `${width}x${height}`}
        </text>
      </svg>
    `)}`;
  }
};

/**
 * 生成小说封面占位图
 * @param {number|string} width - 宽度
 * @param {number|string} height - 高度
 * @returns {string} 封面占位图URL
 */
export const getNovelCover = (width = 200, height = 300) => {
  return getPlaceholderImage(width, height, '小说封面', 'e8f4fd', '2c5aa0');
};

/**
 * 生成头像占位图
 * @param {number|string} size - 尺寸（正方形）
 * @returns {string} 头像占位图URL
 */
export const getImagePlaceholder = (width, height, label = '') => {
  return getPlaceholderImage(width, height, label, 'f5f5f5', '999999');
};

// 默认导出
export default {
  getPlaceholderImage,
  getNovelCover,
  getAvatar,
  getImagePlaceholder
};

