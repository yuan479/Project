import { Outlet, useNavigate, } from "react-router-dom"
import { Tabbar, } from "react-vant"
import { useState,useEffect } from "react"


const tabList = [
  { title: "书城", path: "/home" },
  { title: "分类", path: "/sort" },
  { title: "书店", path: "/bookstore" },
  { title: "书架", path: "/bookshelf" },
  { title: "我的", path: "/my" },
]

const MainLayout = () => {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()

  useEffect(()=>{
    const index = tabList.findIndex(tab =>location.pathname.startsWith(tab.path))
    setActive(index)
  },[])


  return (

    <div className="flex flex-col h-screen"
      style={{ paddingBottom: '50px' }}>
      <div className="flex-1">
        <Outlet />
      </div>

      <Tabbar value={active} onChange={
        (key) => {
          setActive(key)
          navigate(tabList[key].path)
        }} >
        {tabList.map((tab, index) => (
          <Tabbar.Item key={index} icon={tab.icon}>{tab.title}</Tabbar.Item>
        ))}
      </Tabbar>
    </div>

  )
}
export default MainLayout;