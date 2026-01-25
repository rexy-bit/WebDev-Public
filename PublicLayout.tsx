import { Outlet } from "react-router-dom"
import Header from "../Components/HomeComponents/Header"
import  { memo } from "react"



const PublicLayout = () => {

    return(
        <>
          <Header/>

          <main>
            <Outlet/>
          </main>
        </>
    )
}

export default memo(PublicLayout);