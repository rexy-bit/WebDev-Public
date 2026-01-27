import {motion} from "framer-motion"
import { memo, useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContexts";

const SideBar = ({isOpen, setIsOpen, isMobile} : {isOpen : boolean, setIsOpen : (b : boolean)=>void, isMobile : boolean}) => {


    const navigate = useNavigate();
    const location = useLocation();
    const {signOut} = useAuthContext();
    
    return(
        <motion.div
        initial={false}
        animate={{ width: isOpen ? 300 : isMobile ? 0 : 70 }}
        className="min-h-screen fixed left-0 flex flex-col bg-white shadow-2xl z-50"
        transition={{ duration: 0.4, ease: "easeInOut" }}

        >
            {isOpen ?
            <>
          <div className="flex flex-row justify-between p-4 items-center border-b border-gray-300">
            <div className="flex flex-col gap-1 bg-white  gap-3">
                 <p className="font-bold text-[20px]">ChronoWatch</p>
                      
                 <p className="font-[600] text-[18px]">AdminPanel</p>
            </div>

            <div className="text-[1.7em] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 px-4 rounded-[10px] flex justify-center items-center bg-gray-200 font-[500]"
            onClick={()=>setIsOpen(false)}
            >&times;</div>
          </div>

           <div className="p-4 border-b border-gray-300">

              <p className="text-gray-700 text-[18px]">Menu</p>

              <nav className="mt-7 flex-1 overflow-y-auto space-y-1 h-[180px]">
                <div className="flex flex-row items-center gap-4 p-3 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer font-[500]"
                style={{backgroundColor : location.pathname === "/admin/dashboard" ? "#e5e7eb" : ""}}
                onClick={()=>navigate('/admin/dashboard')}
                >
                      <span className="material-symbols-outlined">analytics</span>
                      <p>Dashboard</p>
                </div>

                <div className="flex flex-row items-center gap-4 p-3 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer font-[500]"
                style={{backgroundColor : location.pathname === "/admin/users" ? "#e5e7eb" : ""}}
                onClick={()=>navigate('/admin/users')}
                >
                    <span className="material-symbols-outlined">
group
</span>
                    <p>Users</p>
                </div>

                <div className="flex flex-row items-center gap-4 p-3 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer font-[500]"
                style={{backgroundColor : location.pathname === "/admin/orders" ? "#e5e7eb" : ""}}
                onClick={()=>navigate('/admin/orders')}
                >
                    <span className="material-symbols-outlined">
orders
</span>
                      <p>Orders</p>
                </div>

                <div className="flex flex-row items-center gap-4 p-3 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer font-[500]"
                style={{backgroundColor : location.pathname === "/admin/items" ? "#e5e7eb" : ""}}
                onClick={()=>navigate('/admin/items')}
                >
                    <span className="material-symbols-outlined">
conveyor_belt
</span>

                     <p>Items</p>
                </div>
              </nav>
           </div>

           <div className="p-4">
            <p className="text-gray-700 text-[18px]">Settings</p>

            <div className="mt-3 flex flex-col gap-1">

                <div className="flex flex-row items-center gap-4 p-3 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer font-[500]"
                style={{backgroundColor : location.pathname === "/admin/profile" ? "#e5e7eb" : ""}}
                onClick={()=>navigate('/admin/profile')}
                >
                    <span className="material-symbols-outlined">
person
</span>
                   <p>Profile</p>
                </div>

                <div className="flex flex-row items-center gap-4 p-3 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer text-red-600 font-[500]"
                onClick={signOut}
                >
                    <span className="material-symbols-outlined">
logout
</span>
                   <p>Logout</p>
                </div>
            </div>

           </div>

             </>
           : 

           <>
             <div className=" max-[600px]:hidden min-h-screen flex flex-col bg-white shadow-2xl">
                 <div className=" flex justify-center items-center p-4 border-b border-gray-300">
                <span className="material-symbols-outlined  "
             
                >
                watch
                </span>
      
                 </div>

                   <nav className="flex p-2 flex-col justify-center gap-1 items-center mt-4 w-full h-full border-b border-gray-300">
                <div className=" p-2 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer font-[500] "
                style={{backgroundColor : location.pathname === "/admin/dashboard" ? "#e5e7eb" : ""}}
                onClick={()=>navigate('/admin/dashboard')}
                >
                      <span className="material-symbols-outlined">analytics</span>
                      
                </div>

                <div className="flex flex-row items-center gap-4 p-3 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer font-[500]"
                style={{backgroundColor : location.pathname === "/admin/users" ? "#e5e7eb" : ""}}
                onClick={()=>navigate('/admin/users')}
                >
                    <span className="material-symbols-outlined">
group
</span>
                  
                </div>

                <div className="flex flex-row items-center gap-4 p-3 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer font-[500]"
                style={{backgroundColor : location.pathname === "/admin/orders" ? "#e5e7eb" : ""}}
                onClick={()=>navigate('/admin/orders')}
                >
                    <span className="material-symbols-outlined">
orders
</span>
                 
                </div>

                <div className="flex flex-row items-center gap-4 p-3 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer font-[500]"
                style={{backgroundColor : location.pathname === "/admin/items" ? "#e5e7eb" : ""}}
                onClick={()=>navigate('/admin/items')}
                >
                    <span className="material-symbols-outlined">
conveyor_belt
</span>

                  
                </div>
              </nav>

              <div className="mt-3 flex flex-col gap-1 p-2 justify-center items-center">

                <div className="flex flex-row items-center gap-4 p-3 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer font-[500]"
                style={{backgroundColor : location.pathname === "/admin/profile" ? "#e5e7eb" : ""}}
                onClick={()=>navigate('/admin/profile')}
                >
                    <span className="material-symbols-outlined">
person
</span>
                   
                </div>

                <div className="flex flex-row items-center gap-4 p-3 rounded-[5px] w-full transition-all duration-200 hover:bg-gray-200 active:opacity-60 cursor-pointer text-red-600 font-[500]"
                onClick={signOut}
                >
                    <span className="material-symbols-outlined">
                                logout
                                </span>
                   
                </div>
            </div>

            
             </div>

             <button className="absolute top-2 left-[80px] w-[40px] h-[40px] bg-gray-200 text-gray-700 font-black cursor-pointer transition-all duration-200 hover:bg-gray-300  rounded-[10px] z-100 max-[600px]:left-[5px]"
            onClick={()=>setIsOpen(true)}
            >
                <i className="fa-solid fa-bars"></i>
            </button>

            </>
         }
             
        </motion.div>
    );


}

export default memo(SideBar);

