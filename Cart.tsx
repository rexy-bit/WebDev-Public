
import { memo } from "react"
import { useCartContext } from "../Contexts/CartContext";
import { div, h1 } from "framer-motion/client";
import CartItemCard from "../Components/CartComponents/CartItemCard";

const Cart = () => {

    const {cart} = useCartContext();

    return(
         <>
           <section className="flex flex-col items-center min-h-screen w-full bg-gray-200">
              
               
                    {cart.items.length === 0 ?
                         <div>

                         </div>

                         :
                            <div className="mt-10 w-[800px]">
                                 <div className="flex flex-col bg-white rounded-[2px] shadow-2xs">
                                     <div className="w-full border-b-1 border-gray-300">
                                        <p className="px-3 p-2 text-[1.2em] font-[500]">
                                       Cart ({cart.items.length})    
                                         </p>
                                    </div>   

                                    <div>
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
                                 
                                
                            </div>
                      }
               

           </section>
         </>
    )
}


export default memo(Cart);