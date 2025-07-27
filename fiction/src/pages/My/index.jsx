import useTitle from '@/hooks/useTitle'
import { Image, Grid } from 'react-vant'
import styles from './my.module.css'
import { ClockO, EnvelopO, Edit, SettingO } from '@react-vant/icons'

const src = 'https://img1.baidu.com/it/u=1835195614,131501638&fm=253&app=138&f=JPEG?w=800&h=800'
const My = () => {
    useTitle('诸天小说-我的')

    return (
        <div>
            <div className={styles.user}>
                <Image round width='64px' height='64px' src={src} style={{ margin: '20px' }} />
                <div className={styles.user_info}>
                    <div className={styles.info_name}>小圆</div>
                    <div className={styles.info_like}>点赞:100</div>
                    <div className={styles.info_attention}>关注:20</div>
                    <div className={styles.info_signature}>签名:我的愿望你怎可偷换</div>
                </div>
            </div>
            <div className={styles.grid}>
                <Grid>
                    <Grid.Item icon={<ClockO />} text="浏览历史" />
                    <Grid.Item icon={<EnvelopO />} text="我的消息" />
                    <Grid.Item icon={<Edit />} text="成为作家" />
                    <Grid.Item icon={<SettingO />} text="我的设置" />

                </Grid>

            </div>


        </div>
    )
}

export default My