# 智慧小说 App
- 移动端 app

 *技术栈*
- React 全家桶
    React 组件开发
    组件的封装
    第三方组件库
    hooks 编程  内置+自定义hooks
    React-Router-DOM
      路由守卫
      懒加载
      SPA
    Zustand
- mock接口模拟
- axios请求拦截、代理
- jwt登录
- module css
- vite 配置
- 性能优化
    防抖节流
    useCallback useMemo ...
- css预处理器 stylus
    flex transition transform...
- LLM
    chat 聊天助手
    文生图
    文生语音
    coze 工作流调用
    流式输出
- 移动端适配
    rem
- 单例模式 （对设计模式的理解）
- git 提交

*项目架构*
- components
- pages
- store
- hooks
- api
- mock

*开发前的准备*
- 安装的包
    react-touter-dom
    zustand
    axios
    react-vant        UI 组件库
    lib-flexible      解决移动端适配
- 开发期间的依赖
    jwt
    vite-plugin-mock
    postcss
    postcss-pxtorem
- vite 配置
  - alias
  - mock
  - .env.local
  - llm apiKey
  - user-scalable= no
  - css 预处理
      index.css -> 功能
        font-family:-apply-system
      App.css -> 全局
      module.css -> 模块
  - 移动端适配 rem
      不能用px -> 用相对单位rem 对html相对计算
      不同设备上体验要一致 -> 不同尺寸手机等比缩放
      设计稿设计750px = iphone4 尺寸 = 375pt*2
      layout

*项目亮点*
- 移动端适配
    lib-flexible 还原设计稿，但是需要频繁的计算 -> 安装postcss和postcss-pxtorem自动化
