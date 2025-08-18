import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBookShelfStore = create(
  persist(
    (set, get) => ({
      // 书架中的书籍列表
      books: [],
      
      // 添加书籍到书架
      addToShelf: (book) => {
        const { books } = get()
        // 检查是否已经在书架中
        const existingBook = books.find(b => b.id === book.id)
        if (existingBook) {
          alert('该书籍已在书架中')
          return false
        }
        
        // 添加书籍到书架
        set((state) => ({
          books: [...state.books, {
            ...book,
            addedTime: new Date().toISOString(),
            lastReadTime: null,
            readProgress: 0 // 阅读进度 0-100
          }]
        }))
        
        alert('已添加到书架')
        return true
      },
      
      // 从书架移除书籍
      removeFromShelf: (bookId) => {
        set((state) => ({
          books: state.books.filter(book => book.id !== bookId)
        }))
        alert('已从书架移除')
      },
      
      // 更新阅读进度
      updateReadProgress: (bookId, progress) => {
        set((state) => ({
          books: state.books.map(book => 
            book.id === bookId 
              ? { 
                  ...book, 
                  readProgress: progress,
                  lastReadTime: new Date().toISOString()
                }
              : book
          )
        }))
      },
      
      // 检查书籍是否在书架中
      isInShelf: (bookId) => {
        const { books } = get()
        return books.some(book => book.id === bookId)
      },
      
      // 获取书架中的书籍数量
      getShelfCount: () => {
        const { books } = get()
        return books.length
      },
      
      // 清空书架
      clearShelf: () => {
        set({ books: [] })
        alert('书架已清空')
      }
    }),
    {
      name: 'book-shelf-storage', // 本地存储的key
      partialize: (state) => ({ books: state.books }) // 只持久化books数据
    }
  )
) 