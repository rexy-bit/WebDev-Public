import  { memo, useEffect, useState } from "react";
import { useAuthContext } from "../Contexts/AuthContexts";
import SignIn from "../Components/ProfileComponents/SignIn";
import SignUp from "../Components/ProfileComponents/SignUp";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../Contexts/CartContext";
import Recommendations from "../Components/StoreComponents/Recommendations";

const Profile = () => {


    const {signOut, currentUser} = useAuthContext();

    const {totalItems} = useCartContext();

    const [sign, setSign] = useState<Boolean>(()=>{

      const saved = localStorage.getItem("sign");

      return saved ? JSON.parse(saved) : true;

    });

    useEffect(()=>{
      localStorage.setItem("sign", JSON.stringify(sign));
    }, [sign]);

    const {recommendations} = useAuthContext();

    const navigate = useNavigate();

    return (
        <section className="flex flex-col  items-center min-h-screen bg-gray-200">

           {currentUser ? 
           <>
           
             <h1 className="text-[1.2em] mt-10">Welcom Back <strong>{currentUser.name}</strong></h1>
             <div className="flex flex-row gap-10 items-start justify-center mt-10 mb-15 max-[900px]:flex-col">

               <div className="flex flex-col gap-0 w-[400px] max-[500px]:w-[300px] max-[900px]:order-2 bg-white rounded-[5px] shadow-xl text-gray-900 order-1">
                <div className="py-3 px-2 flex flex-row items-center gap-5 transition-all duration-200 hover:bg-gray-50 cursor-pointer hover:font-bold"
                onClick={()=>{
                    navigate('/store');
                    
                }}
                >
                    <i className="fa-solid fa-shop text-[18px]"></i> <span className="text-[14px]">Store</span>
                </div>

<div className="py-3 px-2 flex flex-row items-center gap-5 transition-all duration-200 hover:bg-gray-50 cursor-pointer hover:font-bold"
                onClick={()=>{
                    navigate('/profile')
                    
                }}
                >
                    <i className="fa-solid fa-user text-[18px]"></i> <span className="text-[14px]">My Account</span>
                </div>
                <div className="py-3 px-2 flex flex-row items-center gap-5 transition-all duration-200 hover:bg-gray-50 cursor-pointer hover:font-bold"
                 onClick={()=>{
                    navigate('/cart');
                    
                }}
                >
                    <i className="fa-solid fa-cart-shopping text-[18px]"></i> <span className="text-[14px]">My Cart ({totalItems()})</span>

                </div>

                <div className="py-3 px-2 flex flex-row items-center gap-5 transition-all duration-200 hover:bg-gray-50 cursor-pointer hover:font-bold"
                 onClick={()=>{
                    navigate('/orders');
                    
                }}
                >
                    <i className="fa-solid fa-truck-fast text-[18px]"></i> <span className="text-[14px]">My Orders</span>

                </div>

                <div className="py-3 px-2 flex flex-row items-center gap-5 transition-all duration-200 hover:bg-gray-50 cursor-pointer hover:font-bold"
                 onClick={()=>{
                    navigate('/favorites');
                    
                }}
                >
                    <i className="fa-solid fa-heart text-[18px]"></i> <span className="text-[14px]">My Favorites</span>
                </div>

                <div className="w-full h-[50px] flex justify-center items-center border-t-2 border-gray-300 text-[15px] text-amber-500 font-[600] cursor-pointer transition-all duration-200 hover:bg-gray-50"
                 onClick={()=>{
                    signOut();
                    
                }}
                >
                    Logout
                </div>

             </div>

             <div className="flex flex-col justify-center items-center mt-5 text-gray-900 border border-gray-800 p-5 rounded-lg bg-white order-2 max-[900px]:order-1">
                <div className="flex flex-col gap-1">
                <p>Email : {currentUser.email}</p>
                <p>Name : <strong>{currentUser.name}</strong></p>
                <p>Cart : {totalItems()}</p>
                </div>

                <button onClick={signOut} className="bg-gray-800 text-white font-bold w-[100px] mt-5 h-[35px] rounded-[10px] cursor-pointer transition-opacity hover:opacity-70 active:opacity-50 duration-200">Sign Out</button>
             </div>
             </div>
             

             </>
              : 
                <div className="mb-15 bg-white mt-10 px-5 py-10 rounded-[5px] shadow-xl">
                     <h1 className="text-[1.2em] mt-10 w-[550px] text-gray-800 text-center max-[600px]:w-[400px] max-[450px]:w-[300px] ">Join <strong>ChronoWatch</strong> today. Sign in or create an account to save your favorites and shop the best watches.</h1>

                     <div className="flex flex-row justify-center items-center gap-0 mt-10">
                       <div className="text-[1.2em] border-b border-b-2  w-[200px] flex justify-center items-center h-[40px] cursor-pointer max-[500px]:w-[150px]" style={{borderBottomColor : sign ? "gray" : "lightgray",
                         fontWeight : sign ? "900" : "400"
                       }}
                       onClick={()=>setSign(prev => !prev)}
                       >Sign In</div>
                       <div className="text-[1.2em] border-b-2 w-[200px] flex justify-center items-center h-[40px] cursor-pointer max-[500px]:w-[150px]"
                        style={{borderBottomColor : !sign ? "gray" : "lightgray",
                         fontWeight : !sign ? "900" : "400"
                       }}
                       onClick={()=>setSign(prev => !prev)}
                       >Sign Up</div>
                     </div>

                     <div className="flex flex-col justify-center items-center">

                        {sign ?
                           <SignIn/>
                           : 
                            <SignUp/>
                          }

                     </div>
                </div>
           }
            

            {recommendations.length !== 0 && <Recommendations/>}


        </section>
    );
}

export default memo(Profile);

