
import { memo } from "react"
import { useCartContext } from "../Contexts/CartContext";
import CartItemCard from "../Components/CartComponents/CartItemCard";
import DeliveryComponent from "../Components/CartComponents/DeliveryComponent";
import { useNavigate } from "react-router-dom";
import Resume from "../Components/CartComponents/Resume";
import { useAuthContext } from "../Contexts/AuthContexts";
import Recommendations from "../Components/StoreComponents/Recommendations";
import OrdersValues from "../Components/OrderComponents/OrdersValues";

const Cart = () => {

    const {cart, totalItems} = useCartContext();
    const navigate = useNavigate();
    const {recommendations} = useAuthContext();

    return(
         <>
           <section className="flex flex-col items-center min-h-screen w-full bg-gray-200">
              
               
                    {cart.items.length === 0 ?
                         <div className="w-[80%] bg-white flex flex-col justify-center items-center mt-5 shadow-2xl rounded-[5px] px-5 py-10 max-[500px]:w-[90%]">
                             <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1768908344/a6743671-4509-4bdb-8340-c9b65927a155.png" alt="" 
                             className="w-50"
                             />
                             <h1 className="text-[20px] font-bold">Your cart is empty!</h1>
                             <p className="text-[16px] text-gray-700 mt-2 text-center">Browse our categories and discover our best deals!</p>

                             <button className="bg-amber-500 text-white px-5 py-2 rounded-[5px] mt-5 text-[15px] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                             onClick={()=>navigate('/store')}
                             >Start your shopping now</button>
                         </div>

                         :
                            <div className="mt-10 flex flex-row gap-5  justify-center items-start  max-[760px]:flex-col max-[760px]:items-center">
                                 <div className="flex flex-col bg-white  rounded-[2px] shadow-2xs w-[800px] max-[1100px]:w-[600px] max-[950px]:w-[400px] max-[500px]:w-[350px] order-1 max-[760px]:order-2 h-full">
                                     <div className="w-full border-b-1 border-gray-300">
                                        <p className="px-3 p-2 text-[1.2em] font-[500]">
                                       Cart ({totalItems()})    
                                         </p>
                                    </div>   

                                    <div className="flex flex-col">
                                      {cart.items.map((it)=>{

                                        return(
                                            <CartItemCard
                                            item={it}
                                            key={it._id}
                                            />
                                        )
                                      })}    
                                    </div> 
                                 </div>

                                 <div className="order-2 max-[760px]:order-1 flex flex-col justify-center items-center gap-5">
                                  <Resume/>
                                   <DeliveryComponent/>
                                 </div>
                                 
                                
                            </div>
                      }

                      <OrdersValues/>
                      
                     {recommendations.length !== 0 && <Recommendations/>}

           </section>
         </>
    )
}


export default memo(Cart);