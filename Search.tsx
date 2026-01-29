import  { memo } from "react"
import { useSearchContext } from "../Contexts/SearchContext";
import { div } from "framer-motion/m";
import ItemCard from "../Components/StoreComponents/ItemCard";
import Recommendations from "../Components/StoreComponents/Recommendations";
import { useNavigate } from "react-router-dom";

const Search = () => {

    const {search, searchResult} = useSearchContext();
    const navigate = useNavigate();
    return(
        <section className="flex flex-col min-h-screen items-center bg-gray-200">
            
            <div className="mt-10">
                <p>Result for : {search}</p>
                {searchResult.length === 0 
                 ?
                  <div className="w-[1000px] flex flex-col justify-center items-center bg-white rounded-[5px] shadow-xl py-10 max-[1050px]:w-[700px] max-[750px]:w-[500px] max-[500px]:w-[300px]">
                     <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1769369847/945a45cf-c950-416c-8df1-2205c185fe79.png" alt="" className="w-50"/>

                     <div className="text-[15px]">Nothing found for : <span className="font-bold">{search}</span></div>
                  </div>
                  : 
                   <div className="flex flex-wrap justify-center items-center mt-15 gap-5">
                                   {searchResult.map((it)=>{
                                       return(
                                           <ItemCard
                                           key={it._id}
                                           item={it}/>
                                       )
                                   })}
                                </div>
                }
            </div>

            <Recommendations/>
            <button className="fixed left-5 top-33 bg-gray-800 text-white font-bold px-4 rounded-full py-2 z-10 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>navigate(-1)}>&#8592; Back</button>
        </section>
    )
}

export default memo(Search);