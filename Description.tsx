import { memo, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useItemsContext } from "../Contexts/ItemsContext";
import { useCartContext } from "../Contexts/CartContext";
import { useAuthContext } from "../Contexts/AuthContext";

const Description = () => {


    const {itemDetails,  errorItem, loadingItems,  getItem} = useItemsContext();
    const {id } = useParams<{id : string}>();
    
    useEffect(()=>{
        getItem(id);
    }, [id]);

    const navigate = useNavigate();


        const { cart, getCart, setError} = useCartContext();
        const {token} = useAuthContext();
    
        const [msg, setMsg] = useState({
            show : false,
            text : "", 
            color : "red"
        });
    
    
          const timeoutRef = useRef<number | null>(null);
    
            useEffect(() => {
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }, []);
    
                const addToCart = async(itemsId : string) => {
    
                    if(itemDetails.stock === 0){
                        setMsg({
                            show : true,
                            text : 'Out of stock',
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
    
                                    const findItem = cart.items.find((it)=>it._id === itemsId);
    
                    
    
            if(findItem){
    
                setMsg({
                    show : true,
                    text : 'Already in cart',
                    color : 'red'
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
                const res = await fetch(`http://localhost:5000/api/v1/cart/${itemsId}`, {
                    method : 'POST',
                    headers : {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                });
    
                const data = await res.json();
    
                if(!res.ok){
                    setError(data.error || data.message || "Error in adding to cart");
                    return;
                }
    
                setError(null);
    
                await getCart();
    
                            setMsg({
                    show : true,
                    text : 'Item Added To Cart',
                    color : 'green'
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
    
    
             }catch(err){
                console.error(err);
             }
          }
    
    

    if(!itemDetails){
        return(
            <div>loading...</div>
        )
    }

    return(
        <section className="min-h-screen flex flex-col items-center w-full bg-blue-100 relative">
            
          {
            loadingItems ?
               <div className="flex justify-center items-center mt-25">
                    <i className="fa-solid fa-spinner fa-spin text-[2em] font-bold text-blue-900 "></i>
                </div>
                : errorItem ?
                   <p>{errorItem}</p>
                   : 
                   <>
                   <h1 className="mt-25 text-[2em] font-black text-blue-900 underline text-center max-[500px]:text-[1.5em]">{itemDetails.name}</h1>
                    <div className="bg-white flex flex-row justify-center items-center p-5 w-[900px] gap-10 border-2 border-blue-900 rounded-xl mt-10 max-[900px]:w-[500px] max-[950px]:flex-col mb-20 max-[550px]:w-[320px]">
                        <div className="w-[40%] flex flex-col gap-5 justify-center items-center max-[950px]:w-full">
                            <img src={itemDetails.image} alt={itemDetails.name} className="w-[300px] h-[300px] object-contain"/>
                            <div className="h-[15px] flex items-center">
                                {msg.show && <p className="font-bold" style={{color : msg.color}}>{msg.text}</p>}
                            </div>
                            <button
                            disabled={itemDetails.stock === 0}
                            className="bg-blue-900 w-full py-1 text-white font-bold rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                            onClick={()=>addToCart(itemDetails._id)}
                            >{itemDetails.stock === 0 ?  "Out of Stock" : "Add To Cart"}</button>
                        </div>

                        <div className="w-[60%] max-[950px]:w-full">
                          <p className="text-gray-800">- Description : {itemDetails.description}</p>
                          <p className="text-blue-800 font-bold">- Price : {itemDetails.price}</p>
                          <p className="font-bold">- Categorie : {itemDetails.categorie}</p>
                          <p className="text-[1.1em]">- Rating : {itemDetails.rate}</p>
                          {itemDetails.stock === 0 &&
                            <p className="text-red-600 underline">Out of stock</p>
                          }
                        </div>
                    </div>
                    </>
          } 

          <button className="bg-[#1E3A8A] text-white font-bold px-2 py-1 rounded-full cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 absolute top-14 left-2"
          onClick={()=>navigate(-1)}
          >&#8592; Back</button>
         
        </section>
    );
}

export default memo(Description);