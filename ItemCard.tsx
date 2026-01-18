import  { memo, useState , useRef, useEffect} from "react"
import type { Item } from "../../Contexts/Types"
import StarsRating from "./StarsRating";
import {motion} from "framer-motion"
import { apiClient } from "../../services/apiClient";
import { useCartContext } from "../../Contexts/CartContext";
import { pre } from "framer-motion/client";



const ItemCard = ({item} : {item : Item}) => {

    const {getCart, setCart, cart} = useCartContext();


    const [msg, setMsg] = useState({
        show : false,
        text : "",
        color : "red"
    });

    const findItem = cart.items.find((it)=>it._id === item._id);


    const timeoutRef = useRef<number | null>(null);

        useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);


       
       const addToCart = async(itemId : string) => {

           if(item.stock === 0){
               setMsg({
                show : true,
                text : "Out of Stock",
                color : "red"
               });

               if(timeoutRef.current){
                clearTimeout(timeoutRef.current);
               }

               timeoutRef.current = setTimeout(()=>{
                setMsg(prev => ({
                    ...prev,
                    show : false
                }))
               }, 3000);

               return;
           }


           if(findItem){

            setMsg({
                text : "Already in cart",
                show : true,
                color : "red"
            });

             if(timeoutRef.current){
                clearTimeout(timeoutRef.current);
             }

             timeoutRef.current = setTimeout(()=>{
                setMsg(prev => ({
                    ...prev,
                    show : false
                }))
             }, 3000);

             return;
           }

        try{

            const res = await fetch(`http://localhost:5000/api/v1/cart/add/${itemId}`, {
                method : "POST",
                credentials : "include"

            });

            const data = await res.json();

            if(!res.ok){
                console.error(data.error || data.message || "Error in adding to cart");
                return;
            }

            setMsg({
                show : true,
                text : "Item added to Cart",
                color: "green"
            });

            if(timeoutRef.current){
                clearTimeout(timeoutRef.current);
            }
           
            timeoutRef.current = setTimeout(()=>{
                setMsg(prev => ({
                    ...prev,
                    show : false
                }));
            }, 3000);


             await getCart();

            

        }catch(err){
            console.error(err);
        }
    }


    return(
        <motion.div
        initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
        className="flex flex-col w-[220px] border border-gray-500 h-[400px] p-5 rounded-[5px]">
            <img src={item.images[0]} alt="WatchImage/0" className="w-[200px] h-[200px] object-contain cursor-pointer transition-opacity duration-200 hover:opacity-70"/>

            <div className="flex flex-col mt-5 gap-1">
                <p>{item.name}</p>
                <StarsRating note={item.rate}/>
                <p className="text-[18px] font-[600]">{item.price} Dzd</p>
                <div className="h-7 flex items-center justify-center">
                    {msg.show && <p style={{color : msg.color}} className="font-bold text-[16px]">{msg.text}</p>}
                </div>
            </div>

                
            <motion.button

            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="py-2 px-5 text-white bg-gray-900  font-bold cursor-pointer"
            
            
            onClick={()=>addToCart(item._id)}
            //disabled={item.stock === 0 || findItem !== undefined}
            >
                Add To Cart
            </motion.button>
        </motion.div>
    );
}

export default memo(ItemCard);