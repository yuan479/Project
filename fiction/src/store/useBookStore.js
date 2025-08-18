import { getBooks } from '../api/home'
import { create } from 'zustand'

// 固定的推荐小说数据
const featuredBooks = [
    {
        id: 'featured_1',
        title: '斗破苍穹',
        author: '天蚕土豆',
        cover: 'https://img1.baidu.com/it/u=1835195614,131501638&fm=253&app=138&f=JPEG?w=800&h=800',
        type: '玄幻',
        description: '这里是属于斗气的世界，没有花俏艳丽的魔法，有的，仅仅是繁衍到巅峰的斗气！',
        wordCount: 5000000,
        status: '已完结',
        rating: 4.8,
        readCount: 5000000,
        height: 350
    },
    {
        id: 'featured_2',
        title: '遮天',
        author: '辰东',
        cover: 'https://img2.baidu.com/it/u=2048194672,703560066&fm=253&app=138&f=JPEG?w=800&h=800',
        type: '玄幻',
        description: '冰冷与黑暗并存的宇宙深处，九具庞大的龙尸拉着一口青铜古棺，亘古长存。',
        wordCount: 6000000,
        status: '已完结',
        rating: 4.9,
        readCount: 8000000,
        height: 350
    }
];

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
            books: state.page === 1 ? [...featuredBooks, ...newBooks] : [...state.books, ...newBooks],
            page: state.page + 1,
            loading: false
        }))
    }
})) 