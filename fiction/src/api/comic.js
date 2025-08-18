import { COZE_CONFIG, validateCozeConfig } from '../config/coze';

// 上传文件到Coze
const uploadFileToCoze = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch(COZE_CONFIG.uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_CONFIG.patToken}`,
      },
      body: formData,
    });

    const ret = await res.json();
    console.log('Upload response:', ret);

    if (ret.code !== 0) {
      throw new Error(`上传失败: ${ret.msg}`);
    }

    return ret.data.id;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// 调用Coze工作流生成漫画
const runCozeWorkflow = async (fileId, text, style = 'anime') => {
  // 验证配置
  if (!validateCozeConfig()) {
    throw new Error('Coze配置无效');
  }

  const parameters = {
    text: text,
    style: style,
    // 可以根据需要添加更多参数
  };

  try {
    const res = await fetch(COZE_CONFIG.workflowUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_CONFIG.patToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workflow_id: COZE_CONFIG.workflow_id,
        parameters
      }),
    });

    const ret = await res.json();
    console.log('Workflow response:', ret);

    if (ret.code !== 0) {
      throw new Error(`生成失败: ${ret.msg}`);
    }

    // 解析返回的数据
    try {
      const data = JSON.parse(ret.data);
      return data.data || ret.data;
    } catch (parseError) {
      console.error('Parse error:', parseError);
      return ret.data; // 直接使用原始数据
    }
  } catch (error) {
    console.error('Workflow error:', error);
    throw error;
  }
};

// 生成漫画的API
export const generateComic = async (text, style = 'anime') => {
  try {
    console.log('开始生成漫画，文本:', text, '风格:', style);
    
    // 直接调用工作流，不需要上传文件
    const result = await runCozeWorkflow(null, text, style);
    
    console.log('漫画生成成功:', result);
    return {
      success: true,
      data: result,
      message: '漫画生成成功'
    };
  } catch (error) {
    console.error('生成漫画失败:', error);
    throw error;
  }
};

// 获取生成历史
export const getComicHistory = async () => {
  try {
    // 这里可以调用Coze的历史记录API
    const response = await fetch('https://api.coze.cn/v1/workflow/history', {
      headers: {
        'Authorization': `Bearer ${COZE_CONFIG.patToken}`,
      }
    });
    return response.json();
  } catch (error) {
    console.error('获取漫画历史失败:', error);
    throw error;
  }
};

// 保存漫画到收藏
export const saveComic = async (comicData) => {
  try {
    // 这里可以调用Coze的保存API
    const response = await fetch('https://api.coze.cn/v1/workflow/save', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_CONFIG.patToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comicData)
    });
    return response.json();
  } catch (error) {
    console.error('保存漫画失败:', error);
    throw error;
  }
}; 