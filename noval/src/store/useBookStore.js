import { getBooks } from '../api/home'
import { create } from 'zustand'

export const useBookStore = create((set, get) => ({
    books: [],
    page: 1,
    loading: false,
    fetchMore: async () => {
        if (get().loading) return; //如果还在请求中，那么则不再请求
        set({ loading: true })
        const res = await getBooks(get().page)
        console.log('获取书籍数据:', res)
        const newBooks = res.data
        
        set((state) => ({ //拿到之前的状态
            books: [...state.books, ...newBooks],
            page: state.page + 1,
            loading: false
        }))
    }
})) 