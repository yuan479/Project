import { useState } from 'react'
import useTitle from '@/hooks/useTitle'
import { Image, Grid, ActionSheet } from 'react-vant'
import styles from './my.module.css'
import { ClockO, EnvelopO, Edit, SettingO } from '@react-vant/icons'

const My = () => {
    useTitle('诸天小说-我的')
    const [userinfo, setUserinfo] = useState({
        username: '小圆',
        like: 100,
        attention: 20,
        signature: '纵使身处刀尖上，亦如木偶般起舞',
        picture: 'https://img1.baidu.com/it/u=1835195614,131501638&fm=253&app=138&f=JPEG?w=800&h=800'
    })
    const [isShow, setIsShow] = useState(false)
    const actions = [
        { name: 'AI 生成头像', type: 1, onClick: () => { console.log('AI 生成头像') } },
        { name: '本地修改头像', type: 2, onClick: () => { console.log('本地修改头像') } },
    ]
    const handleActions = () => {
        
    }


    return (
        <div>
            <div className={styles.user}>
                <Image round
                    width='64px'
                    height='64px'
                    src={userinfo.picture}
                    style={{ margin: '20px' }}
                    onClick={() => { setIsShow(true) }}
                />
                <div className={styles.user_info}>
                    <div className={styles.info_name}>{userinfo.username}</div>
                    <div className={styles.info_like}>点赞:{userinfo.like}</div>
                    <div className={styles.info_attention}>关注:{userinfo.attention}</div>
                    <div className={styles.info_signature}>签名:{userinfo.signature}</div>
                </div>
            </div>
            <div className={styles.grid}>
                <Grid>
                    <Grid.Item icon={<ClockO />} text="浏览历史" />
                    <Grid.Item icon={<EnvelopO />} text="我的消息" />
                    <Grid.Item icon={<Edit />} text="成为作家" />
                    <Grid.Item icon={<SettingO />} text="我的设置" />

                </Grid>
                <ActionSheet
                    visible={isShow}
                    actions={actions}
                    cancelText='取消'
                    onCancel={() => setIsShow(false)}
                    onSelect={(e) => handleActions(e)}
                >

                </ActionSheet>
            </div>


        </div>
    )
}

export default My