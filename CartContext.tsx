import { createContext, useContext, useEffect, useState } from "react";
import type { Cart, DeliveryOption } from "./Types";
import {deliveryOptions } from "../deliveryOptions";
import { useAuthContext } from "./AuthContexts";



interface CartContextType{

    cart : Cart;
    setCart : (c : Cart) => void;
    getCart : ()=>Promise<void>;
    loadingCart : boolean;
    errorMsg : string | null;
    deleteFromCart : (itemId : string) => Promise<void>;
    resetCart : ()=>Promise<void>;
    loadingReset : boolean;
    loadingDelete : Record<string, boolean>;
    setLoadingDelete : (ld : Record<string, boolean>) => void;
    increaseQuantity : (itemId : string)=>Promise<void>;
    decreaseQuantity : (itemId : string)=>Promise<void>;
    updateDelivery : (DeliveryOption : DeliveryOption)=>Promise<void>;
    loadingIncrease : Record<string, boolean>;
    totalItems : ()=>number;
    totalPrice : ()=>number;
    totalPriceDelivery : ()=>number;
}

const CartContext = createContext<CartContextType | null>(null);


export const CartProvider = ({children} : {children : React.ReactNode}) => {


    const [cart, setCart] = useState<Cart>({
        items : [],
        deliveryOption : deliveryOptions[0]
    });

    const [loadingCart, setLoadingCart] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loadingReset, setLoadingReset] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<Record<string, boolean>>({});
    const [loadingIncrease, setLoadingIncrease] = useState<Record<string, boolean>>({});
    const {currentUser} = useAuthContext();


    const getCart = async() => {

        setLoadingCart(true);

        try{

            const res = await fetch("http://localhost:5000/api/v1/cart/", {
               method : "GET",
               credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                setErrorMsg(data.error || data.message || "Error in getting cart items");
                return;
            }

            setErrorMsg(null);

            setCart(data.data);
            console.log(data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingCart(false);

        }
    }


    

    useEffect(()=>{
        if(currentUser){
        getCart();
        }
    }, []);
    
    

    const deleteFromCart = async(itemId : string) => {

        setLoadingDelete(prev => ({...prev, [itemId] : true}));

        try{

            const res = await fetch(`http://localhost:5000/api/v1/cart/delete/${itemId}`, {
                method : 'DELETE',
                credentials : "include"
            });

            const data = await res.json();
            if(!res.ok){

                setErrorMsg(data.error || data.message || "Error in deleting item from cart");
                console.log(data.error || data.message || "Error in deleting item from cart");
                return;
            }

            setErrorMsg(null);

            await getCart();

        }catch(err){
            console.error(err);
        }finally{
            setLoadingDelete(prev =>({...prev, [itemId] : false}));
        }
    }


    const resetCart = async()=> {

        setLoadingReset(true);

        try{

            const res = await fetch("http://localhost:5000/api/v1/cart/reset", {
                method : "DELETE",
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                setErrorMsg(data.error || data.message || "Error in resetting cart");
                return;
            }

            setErrorMsg(null);

            await getCart();

        }catch(err){
            console.error(err);
        }finally{
            setLoadingReset(false);
        }
    }


    const increaseQuantity = async(itemId : string) => {

        setLoadingIncrease(prev => ({...prev, [itemId] : true}));
        try{

            const res = await fetch(`http://localhost:5000/api/v1/cart/increase/${itemId}`, {
                method : "PUT",
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                setErrorMsg(data.error || data.message || "Error in increasing item Quantity");
                return;
            }

            setErrorMsg(null);

            await getCart();
        }catch(err){
            console.error(err);
        }finally{
            setLoadingIncrease(prev => ({...prev, [itemId] : false}));
        }
    }


    const decreaseQuantity = async(itemId : string) => {

        setLoadingIncrease(prev => ({...prev, [itemId] : true}));

        try{
            const res = await fetch(`http://localhost:5000/api/v1/cart/decrease/${itemId}`, {
                method : "PUT",
                credentials : "include"
            });

          

            if(!res.ok){
                console.log("Error in decreasing itemQuantity");
                return;
            }

            await getCart();
        }catch(err){
            console.error(err);
        }finally{
            setLoadingIncrease(prev => ({...prev, [itemId] : false}));
        }
    }

    const updateDelivery = async(deliveryOption : DeliveryOption) => {
        
        try{

            const res = await fetch(`http://localhost:5000/api/v1/cart/delivery`, {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials : "include",
                body : JSON.stringify({id : deliveryOption.id, name : deliveryOption.name, delayDays : deliveryOption.delayDays, price : deliveryOption.price})

            });

            

            if(!res.ok){
                console.log("Error in updating delivery option");
                return;
            }

            await getCart();
        }catch(err){
            console.error(err);
        }
    }


    const totalItems = () => {

        let cpt = 0;

        cart.items.forEach((it)=>{
            cpt += it.quantity;
        });

        return cpt;
    }


    const totalPrice = () => {

        let cpt = 0;

        cart.items.forEach((it)=>{
            cpt += it.price*it.quantity;
        });

        return cpt;
    }


    const totalPriceDelivery = () => {

        return totalPrice() + cart.deliveryOption.price;
        
    }

    return(

        <CartContext.Provider value={{cart,setCart, getCart, loadingCart, errorMsg, deleteFromCart, resetCart, loadingReset, loadingDelete, loadingIncrease, increaseQuantity, decreaseQuantity, updateDelivery, setLoadingDelete, totalItems, totalPrice, totalPriceDelivery}}>
            {children}
        </CartContext.Provider>
    );
    

}


export const useCartContext = () => {

    const context = useContext(CartContext);

    if(!context){

        throw new Error("useCartContext must be used within a CartProvider");

    }

    return context;
}
