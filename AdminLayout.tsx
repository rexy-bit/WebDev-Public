import { memo } from "react"
import { Outlet } from "react-router-dom"



const AdminLayout = () => {

    return(
        <>
           <main>
            <Outlet/>
           </main>
        </>
    )
}

export default memo(AdminLayout);