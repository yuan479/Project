# Coze API 集成说明

## 概述

本项目已集成Coze API，用于生成漫画图片。用户可以选择小说文本内容，然后调用Coze工作流生成对应的漫画图片。

## 配置步骤

### 1. 获取Coze API Token

1. 登录 [Coze平台](https://www.coze.cn/)
2. 进入开发者设置
3. 创建新的API Token
4. 复制Token到配置文件中

### 2. 创建工作流

1. 在Coze平台创建一个新的工作流
2. 配置工作流参数：
   - `text`: 输入的文本内容
   - `style`: 漫画风格（anime, realistic, cartoon, chinese）
3. 复制工作流ID

### 3. 更新配置文件

编辑 `src/config/coze.js` 文件：

```javascript
export const COZE_CONFIG = {
  // 替换为你的API Token
  patToken: 'your_pat_token_here',
  
  // 替换为你的漫画生成工作流ID
  workflow_id: 'your_workflow_id_here',
  
  // 其他配置保持不变
  uploadUrl: 'https://api.coze.cn/v1/files/upload',
  workflowUrl: 'https://api.coze.cn/v1/workflow/run',
  
  styles: {
    anime: '动漫风格',
    realistic: '写实风格', 
    cartoon: '卡通风格',
    chinese: '国漫风格'
  }
};
```

## 功能特点

### 1. 文本选择
- 用户可以在小说卡片和阅读页面选择文本
- 选中的文本会自动显示在弹窗中

### 2. 风格选择
- 支持多种漫画风格：
  - 动漫风格 (anime)
  - 写实风格 (realistic)
  - 卡通风格 (cartoon)
  - 国漫风格 (chinese)

### 3. 生成流程
1. 用户选择文本内容
2. 选择漫画风格
3. 点击生成按钮
4. 调用Coze API生成漫画
5. 显示生成结果

## API调用流程

### 1. 工作流调用
```javascript
const parameters = {
  text: "用户选择的文本内容",
  style: "anime" // 或其他风格
};

const response = await fetch('https://api.coze.cn/v1/workflow/run', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${patToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    workflow_id: 'your_workflow_id',
    parameters
  }),
});
```

### 2. 响应处理
```javascript
const result = await response.json();
if (result.code === 0) {
  // 生成成功
  const imageUrl = result.data;
  return imageUrl;
} else {
  // 生成失败
  throw new Error(result.msg);
}
```

## 错误处理

### 常见错误
1. **Token无效**: 检查API Token是否正确
2. **工作流ID错误**: 确认工作流ID是否正确
3. **网络错误**: 检查网络连接
4. **参数错误**: 确保传递的参数格式正确

### 错误提示
- 在控制台会显示详细的错误信息
- 用户界面会显示友好的错误提示

## 安全注意事项

1. **API Token安全**
   - 不要在客户端代码中硬编码Token
   - 建议使用环境变量或后端代理

2. **请求限制**
   - 注意Coze API的请求频率限制
   - 实现适当的错误重试机制

3. **数据验证**
   - 验证用户输入的文本内容
   - 限制文本长度和内容

## 测试

### 1. 本地测试
```bash
npm run dev
```

### 2. 功能测试
1. 选择小说文本内容
2. 选择漫画风格
3. 点击生成按钮
4. 检查生成结果

### 3. 调试
- 打开浏览器开发者工具
- 查看Network标签页的API请求
- 检查Console标签页的错误信息

## 扩展功能

### 1. 添加更多风格
在 `coze.js` 配置文件中添加新的风格选项：

```javascript
styles: {
  anime: '动漫风格',
  realistic: '写实风格',
  cartoon: '卡通风格',
  chinese: '国漫风格',
  oil: '油画风格', // 新增
  watercolor: '水彩风格' // 新增
}
```

### 2. 添加进度提示
在生成过程中显示进度条或加载动画。

### 3. 添加历史记录
保存用户生成的漫画历史记录。

## 注意事项

1. **API限制**: 注意Coze API的使用限制和配额
2. **性能优化**: 对于大量请求，考虑实现缓存机制
3. **用户体验**: 添加适当的加载状态和错误提示
4. **兼容性**: 确保在不同浏览器中正常工作 