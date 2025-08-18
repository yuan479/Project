// Coze API配置
export const COZE_CONFIG = {
  // 你的Coze API Token
  patToken: 'pat_9zK5SZhW5jcDgOA8TAyl0PK2xc8rwyhmGDFSQ7LF4pIRDOJOvG0YPzXsDgY13uH9',
  
  // API端点
  uploadUrl: 'https://api.coze.cn/v1/files/upload',
  workflowUrl: 'https://api.coze.cn/v1/workflow/run',
  
  // 工作流ID - 需要替换为你的漫画生成工作流ID
  workflow_id: '7533134825490792489',
  
  // 漫画风格选项
  styles: {
    anime: '动漫风格',
    realistic: '写实风格', 
    cartoon: '卡通风格',
    chinese: '国漫风格'
  }
};

// 验证配置
export const validateCozeConfig = () => {
  if (!COZE_CONFIG.patToken) {
    console.error('Coze API Token未配置');
    return false;
  }
  
  if (!COZE_CONFIG.workflow_id) {
    console.error('工作流ID未配置');
    return false;
  }
  
  return true;
}; 