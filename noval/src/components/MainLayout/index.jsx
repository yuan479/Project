import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Tabbar } from 'react-vant'
import { useState, useEffect } from 'react'
import { WapHomeO, SmileCommentO, AppsO, UserO } from '@react-vant/icons'

const tabs = [
    { title: '首页', path: '/home', icon: <WapHomeO /> },
    { title: '问AI', path: '/askai', icon: <SmileCommentO /> },
    { title: '书架', path: '/bookshelf', icon: <AppsO /> },
    { title: '我的', path: '/my', icon: <UserO /> },
]
const MainLayout = () => {

    const [active, setActive] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        console.log('当前地址：', location.pathname)
        const index = tabs.findIndex(
            tab => location.pathname.startsWith(tab.path)
        )
        setActive(index)
    },[location.pathname])
    return (
        <>
            <Outlet />
            <Tabbar value={active} onChange={
                (key) => {
                    setActive(key)
                    navigate(tabs[key].path)
                }
            }>
                {tabs.map((tab, index) => (
                    <Tabbar.Item key={index} icon={tab.icon}>{tab.title}</Tabbar.Item>
                ))}
            </Tabbar>
        </>
    )
}

export default MainLayout