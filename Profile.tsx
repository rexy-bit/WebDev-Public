import  { memo, useEffect, useState } from "react";
import { useAuthContext } from "../Contexts/AuthContexts";
import SignIn from "../Components/ProfileComponents/SignIn";
import SignUp from "../Components/ProfileComponents/SignUp";

const Profile = () => {


    const {signOut, currentUser} = useAuthContext();

    const [sign, setSign] = useState<Boolean>(()=>{

      const saved = localStorage.getItem("sign");

      return saved ? JSON.parse(saved) : true;

    });

    useEffect(()=>{
      localStorage.setItem("sign", JSON.stringify(sign));
    }, [sign]);


    return (
        <section className="flex flex-col  items-center min-h-screen">

           {currentUser ? 
           <>
           
             <h1 className="text-[1.2em] mt-10">Welcom Back <strong>{currentUser.name}</strong></h1>

             <div className="flex flex-col justify-center items-center mt-5 text-gray-900 border border-gray-800 p-5 rounded-lg">
                <div className="flex flex-col gap-1">
                <p>Email : {currentUser.email}</p>
                <p>Name : <strong>{currentUser.name}</strong></p>
                <p>Cart : {currentUser.cart.items.length}</p>
                </div>

                <button onClick={signOut} className="bg-gray-800 text-white font-bold w-[100px] mt-5 h-[35px] rounded-[10px] cursor-pointer transition-opacity hover:opacity-70 active:opacity-50 duration-200">Sign Out</button>
             </div>
             

             </>
              : 
                <div>
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
            


        </section>
    );
}

export default memo(Profile);

