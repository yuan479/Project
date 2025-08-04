# 组件使用说明

## BookCard 组件
用于显示书籍信息的卡片组件。

### 属性
- `title`: 书籍标题
- `author`: 作者
- `cover`: 封面图片URL
- `description`: 书籍描述
- `rating`: 评分
- `category`: 分类
- `wordCount`: 字数
- `status`: 状态（连载中/已完结）

### 使用示例
```jsx
import BookCard from '@/components/BookCard'

<BookCard 
    title="斗破苍穹"
    author="天蚕土豆"
    cover="https://example.com/cover.jpg"
    description="这是一个精彩的小说..."
    rating={4.5}
    category="玄幻"
    wordCount="300万字"
    status="连载中"
/>
```

## Waterfall 组件
瀑布流布局组件，用于展示书籍卡片列表。

### 属性
- `books`: 书籍数组
- `loading`: 加载状态
- `fetchMore`: 加载更多数据的函数

### 使用示例
```jsx
import Waterfall from '@/components/Waterfall'

<Waterfall 
    books={books}
    loading={loading}
    fetchMore={fetchMore}
/>
```

## useBooks Hook
用于管理书籍数据状态的自定义Hook。

### 参数
- `initialPageSize`: 初始页面大小（默认10）
- `maxPages`: 最大页数（默认10）

### 返回值
- `books`: 书籍数组
- `loading`: 加载状态
- `hasMore`: 是否还有更多数据
- `fetchMore`: 加载更多数据的函数
- `reset`: 重置数据的函数

### 使用示例
```jsx
import useBooks from '@/hooks/useBooks'

const { books, loading, hasMore, fetchMore } = useBooks(6, 5)
```

## Mock 数据
使用 `@/mock/bookData` 生成虚拟书籍数据。

### 使用示例
```jsx
import getBooks from '@/mock/bookData'

const books = getBooks(1, 10) // 第1页，10本书
``` 