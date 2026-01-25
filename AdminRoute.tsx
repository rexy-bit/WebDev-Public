import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContexts"
import { memo } from "react";



const AdminRoute = ({children} : {children : React.ReactNode}) => {


    const {currentUser} = useAuthContext();

    if(!currentUser || currentUser.role !== "admin"){
        return <Navigate to="/" replace />
    }

    return <>{children}</>


}

export default memo(AdminRoute);