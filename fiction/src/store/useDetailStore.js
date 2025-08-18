import { create } from 'zustand';
import { getDetail } from '@/api/detail'

// 推荐小说的详情数据
const featuredBookDetails = {
    'featured_1': {
        id: 'featured_1',
        title: '斗破苍穹',
        author: '天蚕土豆',
        cover: 'https://img1.baidu.com/it/u=1835195614,131501638&fm=253&app=138&f=JPEG?w=800&h=800',
        type: '玄幻',
        status: '已完结',
        description: '这里是属于斗气的世界，没有花俏艳丽的魔法，有的，仅仅是繁衍到巅峰的斗气！在斗气大陆上，真正的强者都是用拳头说话的！',
        summary: '这里是属于斗气的世界，没有花俏艳丽的魔法，有的，仅仅是繁衍到巅峰的斗气！',
        wordCount: 5000000,
        rating: 4.8,
        readCount: 5000000,
        likeCount: 250000,
        followCount: 150000,
        fansCount: 800000,
        chapters: 1647,
        updateTime: '2023-12-31 23:59:59',
        publishTime: '2009-04-14',
        tags: ['热门', '推荐', '完结', '玄幻'],
        images: [
            {
                alt: '书籍封面',
                url: 'https://img1.baidu.com/it/u=1835195614,131501638&fm=253&app=138&f=JPEG?w=800&h=800'
            }
        ],
        reviews: [
            {
                id: 'review_1',
                user: '书友123456',
                avatar: 'https://img1.baidu.com/it/u=1835195614,131501638&fm=253&app=138&f=JPEG?w=50&h=50',
                content: '经典之作，斗气大陆的设定非常精彩，主角萧炎的成长历程令人热血沸腾！',
                rating: 5,
                time: '2024-01-15 10:30:00',
                likeCount: 1250
            },
            {
                id: 'review_2',
                user: '玄幻迷',
                avatar: 'https://img2.baidu.com/it/u=2048194672,703560066&fm=253&app=138&f=JPEG?w=50&h=50',
                content: '天蚕土豆的巅峰之作，情节紧凑，人物塑造深刻，值得反复阅读。',
                rating: 5,
                time: '2024-01-10 14:20:00',
                likeCount: 890
            }
        ],
        publisher: '起点中文网',
        isbn: '9787544253994',
        language: '中文',
        format: '电子书',
        fileSize: 25,
        downloadCount: 45000
    },
    'featured_2': {
        id: 'featured_2',
        title: '遮天',
        author: '辰东',
        cover: 'https://img2.baidu.com/it/u=2048194672,703560066&fm=253&app=138&f=JPEG?w=800&h=800',
        type: '玄幻',
        status: '已完结',
        description: '冰冷与黑暗并存的宇宙深处，九具庞大的龙尸拉着一口青铜古棺，亘古长存。这是太空探测器在枯寂的宇宙中捕捉到的一幅极其震撼的画面。',
        summary: '冰冷与黑暗并存的宇宙深处，九具庞大的龙尸拉着一口青铜古棺，亘古长存。',
        wordCount: 6000000,
        rating: 4.9,
        readCount: 8000000,
        likeCount: 350000,
        followCount: 200000,
        fansCount: 1200000,
        chapters: 1821,
        updateTime: '2023-12-31 23:59:59',
        publishTime: '2010-05-01',
        tags: ['热门', '推荐', '完结', '玄幻'],
        images: [
            {
                alt: '书籍封面',
                url: 'https://img2.baidu.com/it/u=2048194672,703560066&fm=253&app=138&f=JPEG?w=800&h=800'
            }
        ],
        reviews: [
            {
                id: 'review_3',
                user: '遮天迷',
                avatar: 'https://img1.baidu.com/it/u=1835195614,131501638&fm=253&app=138&f=JPEG?w=50&h=50',
                content: '辰东的经典之作，世界观宏大，叶凡的成长历程令人震撼，绝对的神作！',
                rating: 5,
                time: '2024-01-20 09:15:00',
                likeCount: 2100
            },
            {
                id: 'review_4',
                user: '玄幻书虫',
                avatar: 'https://img2.baidu.com/it/u=2048194672,703560066&fm=253&app=138&f=JPEG?w=50&h=50',
                content: '遮天是我看过的最好的玄幻小说之一，情节设计巧妙，人物形象鲜明。',
                rating: 5,
                time: '2024-01-18 16:45:00',
                likeCount: 1560
            }
        ],
        publisher: '起点中文网',
        isbn: '9787544253995',
        language: '中文',
        format: '电子书',
        fileSize: 30,
        downloadCount: 68000
    }
};

const useDetailStore = create((set) => ({
    detail: {
        id: '',
        title: '',
        author: '',
        cover: '',
        type: '',
        status: '',
        description: '',
        summary: '',
        wordCount: 0,
        rating: 0,
        readCount: 0,
        likeCount: 0,
        followCount: 0,
        fansCount: 0,
        chapters: 0,
        updateTime: '',
        publishTime: '',
        tags: [],
        images: [],
        reviews: []
    },
    loading: false,
    setDetail: async (id) => {
        set({loading: true})
        
        try {
            // 检查是否是推荐小说
            if (featuredBookDetails[id]) {
                set({
                    loading: false,
                    detail: featuredBookDetails[id]
                });
                return;
            }
            
            // 普通小说调用API
            const res = await getDetail(id);
            set({
                loading: false,
                detail: res.data
            });
        } catch (error) {
            console.error('获取书籍详情失败:', error);
            set({
                loading: false,
                detail: {
                    id: '',
                    title: '',
                    author: '',
                    cover: '',
                    type: '',
                    status: '',
                    description: '',
                    summary: '',
                    wordCount: 0,
                    rating: 0,
                    readCount: 0,
                    likeCount: 0,
                    followCount: 0,
                    fansCount: 0,
                    chapters: 0,
                    updateTime: '',
                    publishTime: '',
                    tags: [],
                    images: [],
                    reviews: []
                }
            });
        }
    }
}))

export default useDetailStore 