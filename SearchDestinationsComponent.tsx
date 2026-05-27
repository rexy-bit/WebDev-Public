import  { memo } from "react"
import Icon from "../../Icons/Icon";
import { useDestinationsContext } from "../../Contexts/DestinationsContext";


const SearchDestinationsComponent = () => {

    const {setSearchDestinationsInput, searchDestinationsInput}=  useDestinationsContext();
    return(
        <div className="mt-40 w-[500px] bg-white shadow-2xl p-5 rounded-[10px] max-[550px]:w-[320px]">
            <div className="text-[#1B4332] flex flex-row items-center gap-3 font-bold text-[1.2em]">
                <Icon name="Search" className=""/>
                <p>Recherche de destination</p>
            </div>

            <input 
            type="text" 
            placeholder="Ville, pays, continent.."
            value={searchDestinationsInput}
            onChange={(e)=>setSearchDestinationsInput(e.target.value)}
            className="w-full p-2 border rounded-[5px] border-gray-300 mt-5"
            />
        </div>
    )
}

export default memo(SearchDestinationsComponent);