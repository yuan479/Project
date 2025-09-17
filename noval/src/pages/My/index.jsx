import useTitle from '@/hooks/useTitle'
import { useState, useRef } from 'react'
import styles from './my.module.css'
import { Image, Grid, Card, ActionSheet, Toast } from 'react-vant'
import { ServiceO, FriendsO, StarO, SettingO, UserCircleO, LikeO, EyeO } from '@react-vant/icons'
import { generateAvatar } from '@/llm'

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

    const handleMenuClick = (menu) => {
        console.log('点击菜单:', menu)
    }

    // 图片压缩函数
    const compressImage = (file, maxWidth = 200, quality = 0.8) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const img = document.createElement('img')
            
            img.onload = () => {
                // 计算压缩后的尺寸
                let { width, height } = img
                if (width > maxWidth) {
                    height = (height * maxWidth) / width
                    width = maxWidth
                }
                
                canvas.width = width
                canvas.height = height
                
                // 绘制压缩后的图片
                ctx.drawImage(img, 0, 0, width, height)
                
                // 转换为blob
                canvas.toBlob(resolve, 'image/jpeg', quality)
            }
            
            img.onerror = () => {
                console.error('图片加载失败')
                resolve(file) // 如果压缩失败，返回原文件
            }
            
            img.src = URL.createObjectURL(file)
        })
    }

    // 处理文件上传
    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            Toast.fail('请选择图片文件')
            return
        }

        // 验证文件大小 (5MB)
        if (file.size > 5 * 1024 * 1024) {
            Toast.fail('图片大小不能超过5MB')
            return
        }

        try {
            Toast.loading('正在处理图片...')
            
            // 压缩图片
            const compressedFile = await compressImage(file)
            
            // 转换为base64
            const reader = new FileReader()
            reader.onload = (e) => {
                const base64 = e.target.result
                
                // 更新用户头像
                setUserinfo(prev => ({
                    ...prev,
                    avatar: base64
                }))
                
                // 隐藏操作面板
                setShowActionSheet(false)
                
                Toast.success('头像更新成功')
            }
            
            reader.onerror = () => {
                Toast.fail('图片读取失败，请重试')
            }
            
            reader.readAsDataURL(compressedFile)
            
        } catch (error) {
            console.error('图片处理失败:', error)
            Toast.fail('图片处理失败，请重试')
        } finally {
            // 清空input值，允许重复选择同一文件
            event.target.value = ''
        }
    }
    const [showActionSheet, setShowActionSheet] = useState(false)
    const fileInputRef = useRef(null)

    const handleActions = async (e) => {
        // console.log('点击操作:', e)
        if (e.type === 1) {
            console.log('AI 生成头像')
            const text = `
        昵称：${userinfo.nickname},
        个性签名：${userinfo.slogan}
        `
            const newAvatar = await generateAvatar(text)
        } else if (e.type === 2) {
            console.log('本地修改头像')
            fileInputRef.current?.click()
        }
    }
    const actions = [
        {
            name: 'AI 生成头像',
            type: 1,
            onClick: () => { console.log('AI 生成头像') }
        },
        {
            name: '本地上传头像',
            type: 2,
            onClick: () => { console.log('本地修改头像') }
        },
    ]

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
                            onClick={() => setShowActionSheet(true)}
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
            <ActionSheet
                visible={showActionSheet}
                actions={actions}
                cancelText='取消'
                onCancel={() => setShowActionSheet(false)}
                onSelect={(e) => handleActions(e)}
            ></ActionSheet>

            {/* 隐藏的文件输入 */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />

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