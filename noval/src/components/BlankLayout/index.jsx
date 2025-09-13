import { Outlet } from 'react-router-dom'

const BlankLayout =()=>{
    return(
        <>
        <Outlet />
        <div>BlankLayout</div>
        
        </>
    )
}

export default BlankLayout