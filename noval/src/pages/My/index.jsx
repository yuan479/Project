import useTitle from '@/hooks/useTitle'
import { useState } from 'react'
import styles from './my.module.css'
import { Image, Grid, CellGroup, Cell, Card, Space, Divider, Button } from 'react-vant'
import { ServiceO, FriendsO, StarO, SettingO, UserCircleO, LikeO, EyeO, Edit } from '@react-vant/icons'

const My = () => {
    useTitle('智言书城 - 我的')
    const [userinfo, setUserinfo] = useState({
        nickname: '小圆',
        slogan: '纵使身处刀尖上，亦如木偶般起舞',
        avatar: 'https://img1.baidu.com/it/u=1835195614,131501638&fm=253&app=138&f=JPEG?w=800&h=800',
        like: 100,
        fans: 150,
        readTime: 120
    })

    const handleEditProfile = () => {
        console.log('编辑个人资料')
    }

    const handleMenuClick = (menu) => {
        console.log('点击菜单:', menu)
    }

    return (
        <div className={styles.container}>
            {/* 用户信息卡片 */}
            <Card className={styles.userCard}>
                <div className={styles.userInfo}>
                    <div className={styles.avatarSection}>
                        <Image
                            src={userinfo.avatar}
                            alt="用户头像"
                            className={styles.avatar}
                            round
                            width={80}
                            height={80}
                        />
                    </div>
                    <div className={styles.userDetails}>
                        <div className={styles.nickname}>{userinfo.nickname}</div>
                        <div className={styles.slogan}>{userinfo.slogan}</div>
                        <div className={styles.stats}>
                            <span className={styles.statText}>获赞 {userinfo.like}</span>
                            <span className={styles.statText}>粉丝 {userinfo.fans}</span>
                            <span className={styles.statText}>阅读时长 {userinfo.readTime}h</span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* 功能宫格 */}
            <Card className={styles.gridCard}>
                <div className={styles.gridTitle}>功能中心</div>
                <Grid columnNum={4} border={false}>
                    <Grid.Item 
                        icon={<UserCircleO />} 
                        text="个人资料" 
                        onClick={() => handleMenuClick('profile')}
                    />
                    <Grid.Item 
                        icon={<StarO />} 
                        text="我的收藏" 
                        onClick={() => handleMenuClick('favorites')}
                    />
                    <Grid.Item 
                        icon={<EyeO />} 
                        text="阅读历史" 
                        onClick={() => handleMenuClick('history')}
                    />
                    <Grid.Item 
                        icon={<LikeO />} 
                        text="我的点赞" 
                        onClick={() => handleMenuClick('likes')}
                    />
                    <Grid.Item 
                        icon={<ServiceO />} 
                        text="客服中心" 
                        onClick={() => handleMenuClick('service')}
                    />
                    <Grid.Item 
                        icon={<FriendsO />} 
                        text="好友动态" 
                        onClick={() => handleMenuClick('friends')}
                    />
                    <Grid.Item 
                        icon={<SettingO />} 
                        text="设置" 
                        onClick={() => handleMenuClick('settings')}
                    />
                </Grid>
            </Card>
        </div>
    )
}

export default My