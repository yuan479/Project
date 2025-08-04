// search 全局共享状态
import {
    create
} from 'zustand'
import {
    getSuggestList,
    getHotList
} from '../api/search'

const useSearchStore = create((set, get) => {
    // get  读操作
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    return{
        searchHistory,
        suggestList: [], // suggest 返回 list
        hotList: [], // hot 返回 list
        setSuggestList: async (keyword) => {
            // 避免重复调用
            const currentKeyword = get().currentKeyword;
            if (currentKeyword === keyword) {
                return;
            }
            
            // 清空之前的数据，确保重新生成
            set({
                suggestList: [],
                currentKeyword: keyword
            });
            
            const res = await getSuggestList(keyword)
            console.log('生成的小说数据:', res);
            set({
                suggestList: res.data
            })
        },
        setHotList: async () => {
            const res = await getHotList();
            console.log('热门小说:', res);
            set({
                hotList:res.data
            })
        }
    }
})

export default useSearchStore
