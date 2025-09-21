import { memo, useState } from "react";
import { useCartContext } from "../Contexts/CartContext";
import type { CartItem, DeliveryOption } from "../Contexts/Types";
import {deliveryOptions} from "../deliveryOptions"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import ResetPopUp from "../Components/StoreComponents/ResetPopUp";
import { useOrderContext } from "../Contexts/OrderContext";


const CartItemComponent = ({item} : {item : CartItem}) => {

    const {increaseCart, decreaseCart, deleteFromCart} = useCartContext();
    return(
        <div className="flex flex-row justify-center gap-5 items-center p-5 border border-gray-400 rounded-[5px] w-[320px] max-[500px]:flex-col max-[500px]:w-[250px] ">
            <img src={item.image} alt={item.name} className="w-[110px] h-[110px] object-contain"/>

            <div className="flex flex-col gap-1 max-[500px]:items-center">
                <p className="text-[#1E3A8A] font-bold leading-5">{item.name}</p>
                <p className="font-bold">{item.price} Dzd</p>
                <div className="flex flex-row items-center gap-[5px]">
                    <p>Quantity: {item.quantity}</p>
                    <button className="bg-[#1E3A8A] w-[25px] h-[23px] text-white font-bold flex items-center justify-center rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" 
                    onClick={()=>increaseCart(item._id)}
                    >+</button>
                    <button className="bg-[#1E3A8A] w-[25px] h-[23px] text-white font-bold flex items-center justify-center rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                    onClick={()=>decreaseCart(item._id)}
                    >-</button>
                </div>
                <button className="w-[70px] h-[30px] text-white bg-red-600 font-bold rounded-full cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50 max-[500px]:mt-3"
                onClick={()=>deleteFromCart(item._id)}
                >Delete</button>
            </div>
        </div>
    )
}

const ShowDeliveryOptions = () => {
    const {cart, getEstimatedDate, updateDelivery} = useCartContext();

    return(
        <div className="flex flex-col justify-center gap-2 max-[1000px]:mb-5">
            <h1 className="font-bold text-[1.1em]">Delivery Options :</h1>
        {deliveryOptions.map((d : DeliveryOption)=>{
            return(
                <label key={d.id} className="flex flex-row gap-3">
                    <input 
                    type="radio" 
                    checked={cart.deliveryOption.id === d.id}
                    onChange={()=>updateDelivery(d)}
                    className="cursor-pointer"
                    />

                                             <div>
                            <p className="font-bold">{getEstimatedDate(d.delayDays)}</p>
                            <p className="text-gray-700">{d.name}</p>
                         </div>
                </label>
            )
        })}
        </div>
    )


}
const ShowAllDelivery = () => {

    const {cart, getEstimatedDate} = useCartContext();
    return(
        <div className=" bg-white p-5 border border-gray-400 rounded-[5px] order-1 max-[1000px]:order-2">
               <div className="text-[1.3em] font-bold text-[#1E3A8A] mb-5 max-[1025px]:mt-3 max-[1025px]:w-[200px] max-[1025px]:text-center max-[1000px]:flex-col max-[1000px]:items-center max-[1000px]:justify-center"><p>Delivery Date :</p> <span className="max-[1025px]:w-[200px] text-center">{getEstimatedDate(cart.deliveryOption.delayDays)}</span></div>
               <div className="flex flex-row gap-10 max-[1000px]:flex-col max-[1000px]:items-center">
            <div className="flex flex-col gap-5">
                {cart.items.map((it)=>{
                    return(
                        <CartItemComponent
                        item={it}
                        key={it._id}
                        />
                    )
                })}
            </div>

            <div>
              <ShowDeliveryOptions/>
            </div>
            </div>
        </div>
    )
}

const PayementSummary = () => {

    const {numberOfItems, totalWithoutShipping, totalPrice, cart} = useCartContext();
    const {addOrder} = useOrderContext();
    const navigate = useNavigate();
    const {currentUser} = useAuthContext();
    return(
        <div className="flex flex-col p-5 bg-white h-[250px] w-[300px] border border-gray-400 rounded-[5px] order-2 max-[1000px]:order-1">
            <h1 className="font-bold text-[1.1em]">Payement Summary</h1>

           <div className="mt-4 flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
               <p>items({numberOfItems()}):</p>
               <p>{totalWithoutShipping().toFixed(2)}Dzd</p>

            </div>

            <div className="flex flex-row justify-between items-center">
                <p>Shipping & handling:</p>
                <p>{cart.deliveryOption.price.toFixed(2)}Dzd</p>
            </div>
            </div>

            <div className="flex flex-row justify-between items-center mt-4 pt-4 border-t border-t-gray-300 text-[1.1em] font-bold">
                <p>Order Total:</p>
                <p>{totalPrice().toFixed(2)}Dzd</p>
            </div>

            <button
            disabled={currentUser?.cart.items.length === 0}
            className="bg-[#1E3A8A] text-white font-bold py-1 rounded-lg cursor-pointer mt-5 transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={async()=>{
               await addOrder();
               navigate("/orders");
            }}>Place your order</button>
        </div>
    )
}
const Cart = () => {

    const {cart,  numberOfItems} = useCartContext();
    const navigate = useNavigate();
    const {currentUser} = useAuthContext();
    const [showPop, setShowPop] = useState<boolean>(()=>{
        const saved = localStorage.getItem('showPop');

        return saved ? JSON.parse(saved) : false;
    });


    return(
        <section className="flex flex-col min-h-screen items-center bg-blue-50 relative">
            {
                cart.items.length === 0 
                 ?
                   <div className="flex flex-col items-center mt-20">
                    <p className="font-bold">No Items in Your Cart</p>
                    {!currentUser && <p className="font-bold w-[400px] text-center mt-2 max-[500px]:w-[300px]">Sign In or Sign Up to Add Items tp Your Cart and place orders</p>}
                    {!currentUser && <button className="bg-[#1E3A8A] text-white font-bold px-2 py-1 rounded-lg cursor-pointer mt-2 transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>navigate("/profile")}>Log In</button>}
                    <button className="bg-[#1E3A8A] text-white font-bold px-2 py-1 rounded-lg mt-3 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>navigate("/store")}>Browse our Store</button>
                   </div>
                  :
                    <>
                      <header className="w-full bg-gray-50 fixed top-[50px] flex items-center justify-center h-[40px]">
                        <p className="text-[#1E3A8A] font-bold text-[1.2em] shadow-2xl z-50 ">Checkout ({numberOfItems()} items)</p>
                      </header>
                     
                      <div className="mt-40 mb-40">
                        <h1 className="text-[1.5em] font-bold max-[1000px]:text-center max-[1000px]:mb-5">Review Your Order</h1>
                        <div className="flex flex-row gap-10 max-[1000px]:flex-col max-[1000px]:items-center">
                        <ShowAllDelivery/>
                        <PayementSummary/>
                        </div>
                      </div>


                      <button className="bg-[#1E3A8A] text-white font-bold px-4 py-1 rounded-full fixed bottom-10 right-2 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>setShowPop(true)}><i className="fa-solid fa-trash"></i> Reset</button>

                      {showPop && <ResetPopUp setShowPop={setShowPop}/>}

                    </>
            }
        </section>
    );
}

export default memo(Cart);