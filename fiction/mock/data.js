import Mock from 'mockjs';

// 生成图片数据的函数
const getImages = (page) => {
    const pageSize = 10;
    const images = [];
    
    for (let i = 0; i < pageSize; i++) {
        const image = Mock.mock({
            id: `image_${page}_${i}`,
            url: Mock.Random.image('200x300', Mock.Random.color(), Mock.Random.color(), 'png', '小说'),
            height: Mock.Random.integer(200, 400)
        });
        images.push(image);
    }
    
    return images;
};

// 生成书籍数据的函数
const getBooks = (page) => {
    const pageSize = 10;
    const books = [];
    
    for (let i = 0; i < pageSize; i++) {
        const book = Mock.mock({
            id: `book_${page}_${i}`,
            title: '@ctitle(3, 8)',
            author: '@cname',
            cover: Mock.Random.image('200x300', Mock.Random.color(), Mock.Random.color(), 'png', '小说'),
            type: '@pick(["玄幻", "都市", "历史", "科幻", "仙侠", "游戏", "军事", "悬疑", "言情", "轻小说"])',
            description: '@cparagraph(1, 2)',
            wordCount: '@integer(1000, 50000)',
            status: '@pick(["连载中", "已完结"])',
            rating: '@float(1, 5, 1, 1)',
            readCount: '@integer(1000, 100000)',
            height: '@integer(300, 400)'
        });
        books.push(book);
    }
    
    return books;
};

export default [{
    url: '/api/search',
    method: 'get',
    timeout: 1000,
    response: (req, res) => {
        // ?keyword=玄幻
        const keyword = req.query.keyword;
        let num = Math.min(Math.floor(Math.random() * 8) + 3, 10); // 3-10本小说，最多10条
        let list = [];
        
        for (let i = 0; i < num; i++) {
            // 只生成包含关键词的小说名
            const randomData = Mock.mock({
                id: '@increment',
                title: () => {
                    // 生成包含关键词的标题
                    const titlePrefix = Mock.Random.ctitle(2, 4);
                    const titleSuffix = Mock.Random.ctitle(1, 3);
                    return `${titlePrefix}${keyword}${titleSuffix}`;
                }
            });
            
            list.push(randomData);
        }

        return {
            code: 0,
            data: list
        }
    }
},
{
    url: '/api/hotlist',
    method: 'get',
    timeout: 1000,
    response: (req, res) => {
        return {
            code: 0,
            data: [{
                id: '101',
                title: "斗破苍穹",
                type: "玄幻"
            }, {
                id: '102',
                title: "遮天",
                type: "玄幻"
            }, {
                id: '103',
                title: "完美世界",
                type: "玄幻"
            }, {
                id: '104',
                title: "武动乾坤",
                type: "玄幻"
            }, {
                id: '105',
                title: "大主宰",
                type: "玄幻"
            }]
        }
    }
},
{
    url: '/api/images',
    method: 'get',
    response: ({ query }) => {
        const page = Number(query.page) || 1;
        return {
            code: 0,
            data: getImages(page)
        };
    }
},
{
    // ?page=1 queryString
    url: '/api/books',
    method: 'get',
    response: ({ query }) => {
        const page = Number(query.page) || 1;
        return {
            code: 0,
            data: getBooks(page)
        };
    }
},
{
    url: '/api/detail/:id',
    method: 'get',
    timeout: 1000,
    response: (req) => {
        const id = req.params?.id || req.query?.id || '1';
        
        // 生成书籍详情数据
        const detail = Mock.mock({
            id: id,
            title: '@ctitle(5, 15)',
            author: '@cname',
            cover: Mock.Random.image('300x400', Mock.Random.color(), Mock.Random.color(), 'png', '小说封面'),
            type: '@pick(["玄幻", "都市", "历史", "科幻", "仙侠", "游戏", "军事", "悬疑", "言情", "轻小说"])',
            status: '@pick(["连载中", "已完结"])',
            description: '@cparagraph(3, 6)',
            summary: '@cparagraph(2, 4)',
            wordCount: '@integer(10000, 500000)',
            rating: '@float(1, 5, 1, 1)',
            readCount: '@integer(10000, 1000000)',
            likeCount: '@integer(1000, 50000)',
            followCount: '@integer(500, 20000)',
            fansCount: '@integer(2000, 100000)',
            chapters: '@integer(100, 2000)',
            updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
            publishTime: '@datetime("yyyy-MM-dd")',
            tags: ['@pick(["热门", "推荐", "新书", "完结"])', '@pick(["玄幻", "都市", "历史"])'],
            images: [
                {
                    alt: '书籍封面',
                    url: Mock.Random.image('300x400', Mock.Random.color(), Mock.Random.color(), 'png', '小说封面')
                },
                {
                    alt: '书籍内页',
                    url: Mock.Random.image('300x400', Mock.Random.color(), Mock.Random.color(), 'png', '小说内页')
                },
                {
                    alt: '书籍详情',
                    url: Mock.Random.image('300x400', Mock.Random.color(), Mock.Random.color(), 'png', '小说详情')
                }
            ],
            reviews: () => {
                const reviews = [];
                const count = Mock.Random.integer(5, 15);
                for (let i = 0; i < count; i++) {
                    reviews.push(Mock.mock({
                        id: `review_${i}`,
                        user: '@cname',
                        avatar: Mock.Random.image('50x50', Mock.Random.color(), Mock.Random.color(), 'png', '头像'),
                        content: '@cparagraph(1, 3)',
                        rating: '@integer(1, 5)',
                        time: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        likeCount: '@integer(0, 100)'
                    }));
                }
                return reviews;
            },
            publisher: '@ctitle(3, 8)',
            isbn: '@string("number", 13)',
            language: '中文',
            format: '@pick(["电子书", "实体书", "有声书"])',
            fileSize: '@integer(1, 50)',
            downloadCount: '@integer(1000, 50000)'
        });

        return {
            code: 0,
            data: detail
        }
    }
}]
