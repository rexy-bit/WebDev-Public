
import  { memo } from "react"
import { useOrderContext } from "../Contexts/OrdersContext";
import OrderCard from "../Components/OrderComponents/OrderCard";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContexts";
import Recommendations from "../Components/StoreComponents/Recommendations";
import OrdersValues from "../Components/OrderComponents/OrdersValues";


const Orders = () => {

    const {orders, loadingUserOrders} = useOrderContext();
    const navigate = useNavigate();
    const {recommendations} = useAuthContext();
    return(
        <section className="flex flex-col min-h-screen w-full items-center bg-gray-200">
                
                {orders.length === 0 
                  ?
                  <div className="w-[80%] bg-white flex flex-col justify-center items-center mt-5 shadow-2xl rounded-[5px] px-5 py-10 max-[500px]:w-[90%]">
                             <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1769039978/orders_tjhce3.svg" alt="" 
                             className="w-50"
                             />
                             <h1 className="text-[20px] font-bold mt-10">No Orders</h1>
                             <p className="text-[16px] text-gray-700 mt-2 text-center">Browse our categories and discover our best deals!</p>

                             <button className="bg-amber-500 text-white px-5 py-2 rounded-[5px] mt-5 text-[15px] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                             onClick={()=>navigate('/store')}
                             >Start your shopping now</button>
                         </div>
                         : 
                           loadingUserOrders ?
                             <i className="fa-solid fa-clock fa-flip text-[3em] mt-5"></i>
                             : 
                               
                
                
               <div className="flex flex-col justify-center mt-10">
                  <div className="text-[25px] font-bold flex justify-center">Orders</div>

                 <div className="flex flex-col justify-center items-center gap-10 mb-20 mt-5">
                    {orders.map((order)=>{
                        return(
                            <OrderCard
                            order={order}
                            key={order._id}
                            />
                        )
                    })}
                 </div>
               </div>
              }

               <OrdersValues/>
              {recommendations.length !== 0 && <Recommendations/>}
              

        </section>
    )
}

export default memo(Orders);