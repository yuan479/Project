import { Outlet } from 'react-router-dom'

const MainLayout =()=>{
    return(
        <>
         <Outlet />
        <div>MainLayout</div>
        </>
    )
}

export default MainLayout