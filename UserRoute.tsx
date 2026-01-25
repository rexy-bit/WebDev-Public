import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContexts"
import { memo } from "react";


const UserRoute = ({children} : {children : React.ReactNode}) => {

    const {currentUser} = useAuthContext();

    if(currentUser && currentUser.role === "admin"){
        return <Navigate to="/admin/dashboard"/>
    }


    return <>{children}</>

}


export default memo(UserRoute);