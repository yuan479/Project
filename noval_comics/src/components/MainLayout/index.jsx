import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { Tabbar, HomeO, ShopO, FriendsO, UserO } from "react-vant"
import { useState, useEffect } from "react"

const tabs = [
  { title: "首页", icon: <HomeO />, path: '/home' },
  { title: "书城", icon: <ShopO />, path: '/bookstore' },
  { title: "漫画", icon: <FriendsO />, path: '/comics' },
  { title: "我的", icon: <UserO />, path: '/my' }
]
const MainLayout = () => {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    console.log(location.pathname)
    const index = tabs.findIndex(
      tab => location.pathname.startsWith(tab.path)
    )
    setActive(index)
  }, [location.pathname])

  return (

    <div className="flex flex-col h-screen"
    style={{paddingBottom:'50px'}}>
      <div className="flex-1">
        <Outlet />
      </div>

      <Tabbar value={active} onChange={
        (key) => {
          setActive(key)
          navigate(tabs[key].path)
        }}>
        {tabs.map((tab, index) => (
          <Tabbar.Item key={index} icon={tab.icon}>{tab.title}</Tabbar.Item>
        ))}
      </Tabbar>
    </div>

  )
}
export default MainLayout