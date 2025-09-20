# 低代码编辑器
  - npx create-vite lowcode_editor
    react + ts
  - editor 组件
  - json 数据是低代码编辑的本质

*依赖*
  - pnpm i tailwindcss @tailwindcss/vite  原子样式
  - pnpm i allotment  可调整大小的分栏布局
  - pnpm i zustand  状态管理
  - pnpm i --save-dev antd  实现拖拽的组件库
  - pnpm i react-dnd react-dnd-html5-backend 拖拽功能

*tailwindcss*
  - 官方文档：https://tailwindcss.com/docs/installation/using-vite

*模块化开发*
  - 顶部 顶部区域 Header
  - 左侧 物料区域 Material
  - 中间 编辑区域 EditArea
  - 右侧 配置区域 Setting

*物料区 Material*
  可拓展的组件库
  - Container
  - Botton
  - Page

*拖拽功能*
