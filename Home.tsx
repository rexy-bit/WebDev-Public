import  { memo } from "react"
import { useNavigate } from "react-router-dom";
import AboutUs from "../Components/HomeComponents.tsx/AboutUs";
import Choose from "../Components/HomeComponents.tsx/Choose";
import BestSellers from "../Components/HomeComponents.tsx/BestSellers";
import Faq from "../Components/HomeComponents.tsx/Faq";
import Footer from "../Components/HomeComponents.tsx/Footer";


const Home = () => {

   const navigate = useNavigate();
    return(
        <section className="flex flex-col items-center w-full">
             <section id="hero" className="w-full pt-[50px]">
                <div style={{backgroundImage : "url('/hero3.jpg')"}} className="bg-cover bg-center w-full flex justify-center items-center h-[500px]">
                  <div className="w-full flex flex-col items-center bg-black/60 h-full">
                       <h1 className="font-black text-white text-[2.5em] mt-10 font-sans max-[850px]:text-[2em] max-[500px]:text-[1.8em] text-center">Welcome to HyperTech</h1>
                       
                       <p className="text-white text-[1.4em] font-bold mt-8 max-[850px]:text-[1.2em] text-center max-[500px]:w-[300px]">Empowering your digital lifestyle, Discover the latest in tech and gadgets</p>
                       <p className="text-white font-bold text-[1.1em] mt-5">For Fast, secure, and reliable tech shopping</p>

                       <div className="flex flex-row justify-center items-center gap-5 mt-5">
                        <button className="bg-gray-100 text-black font-bold px-3 py-2 rounded-[5px] transition-all duration-300
                         hover:bg-black hover:text-white cursor-pointer"
                         onClick={()=>navigate('/store')}
                         >
                            Explore Devices
                        </button>

                        <button className="bg-blue-900 text-white font-bold p-2 rounded-[5px] cursor-pointer transition-all duration-200 hover:bg-blue-700 active:bg-blue-600">About Us</button>
                       </div>
                  </div>
                </div>

                 <AboutUs/>
                 <Choose/>
                 <BestSellers/>
                 <Faq/>
                 <Footer/>
                
             </section>
        </section>
    )
}

export default memo(Home);