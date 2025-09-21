import { memo, } from "react";
import { useOrderContext } from "../Contexts/OrderContext";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import type { Orders } from "../Contexts/Types";
import OrderComponent from "../Components/OrderComponents/OrderComponent";






const Orders = () => {

    const {orders, loadingOrders} = useOrderContext();
    const {currentUser} = useAuthContext();
    const navigate = useNavigate();

    if(loadingOrders){
        return(
            <div className="flex justify-center items-center mt-15">
                    <i className="fa-solid fa-spinner fa-spin text-[2em] font-bold text-blue-900"></i>
                </div>
        )
    }

    return(
        <section className="flex flex-col min-h-screen items-center w-full">

            
             {!currentUser
               ?
                  <div className="flex flex-col items-center mt-20 gap-3">
                    <p className="text-[1.1em] font-bold w-[500px] max-[550px]:w-[300px] text-center">Sign in or create an account to add items to your cart and place orders.</p>
                    <button onClick={()=>navigate("/profile")} className="px-3 py-1 bg-blue-900 text-white font-bold rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">Sign In</button>
                    </div>

                :
                  currentUser && orders.length === 0 
                   ?
                   <div className="flex flex-col items-center gap-5 mt-20">
                    <p className="text-[1.1em] font-bold w-[500px] max-[550px]:w-[300px] text-center">Browse Our store add Items to your cart and place orders</p>  
                    <button className="bg-blue-900 text-white font-bold px-3 py-1 rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>navigate("/store")}>Browse Store</button>
                    </div>
                    : 
                      <div className="flex flex-col mt-20">
                         <h1 className="text-[1.5em] font-bold">Your Orders</h1>

                         <div className="flex flex-col items-center gap-5 mb-10">
                            {orders.map((order)=>{
                                return(
                                    <OrderComponent
                                    order={order}
                                    key={order._id}
                                    />
                                )
                            })}
                         </div>
                      </div>
                    

             }
        </section>
    );
}

export default memo(Orders);