import { memo } from "react"
import { useFavoritesContext } from "../Contexts/FavoritesContext";
import ItemCard from "../Components/StoreComponents/ItemCard";
import { useAuthContext } from "../Contexts/AuthContexts";
import Recommendations from "../Components/StoreComponents/Recommendations";
import { useNavigate } from "react-router-dom";
import GeneralFooter from "../Components/HomeComponents/GeneralFooter";




const Favorites = () => {

    const {favorites} = useFavoritesContext();

    const {recommendations} = useAuthContext();

    const navigate = useNavigate();

    return(
        <section className="flex flex-col min-h-screen items-center w-full bg-gray-200"> 
            
            <div className="flex flex-col gap-0 w-[1000px] bg-white rounded-[5px] shadow-xl mt-15 max-[1050px]:w-[700px] max-[750px]:w-[500px] max-[550px]:w-[320px]">
                <div className="text-[18px] font-[600] px-4 py-3 border-b border-gray-300">
                   <i className="fa-solid fa-heart"></i>  Favorites
                </div>

                <div className="p-5">
                  {favorites.length === 0 
                   ?
                    <div className="py-15 flex flex-col gap-2 justify-center items-center">
                        <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1769375426/3c328e54-3da7-44b5-8125-48a9f7bd2233.png" className="w-20" />
                        <p className="text-[17px] font-[600] mt-4">Your wishlist is empty!</p>
                        <p className="w-[300px] max-[500px]:w-[250px] text-[14px] text-gray-600 text-center">Found something you like? Tap the heart icon next to the item to add it to your wishlist! All your saved items will appear here.</p>

                        <button className="px-4 py-2 bg-amber-500 text-white text-[15px] font-[600] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 mt-5"
                        onClick={()=>navigate('/store')}
                        >
                            Continue Shopping
                        </button>
                    </div>
                    : 
                     <div className="w-full flex flex-wrap justify-center items-center gap-5">
                        {favorites.map((it)=>{
                            return(
                                <ItemCard
                                item={it}
                                key={it._id}
                                />
                            )
                        })}

                     </div>
                   }
                </div>
            </div>

            {recommendations.length !== 0 && <Recommendations/>}

            <GeneralFooter/>
        </section>
    )
}

export default memo(Favorites);