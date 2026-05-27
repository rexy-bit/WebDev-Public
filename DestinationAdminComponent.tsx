import { memo, useState } from "react"
import type { Destination } from '../../Contexts/Types';
import Icon from "../../Icons/Icon";
import { useNavigate } from "react-router-dom";
import DeleteDestinationPop from "./DeleteDestinationPop";


const DestinationAdminComponent = ({destination} : {destination : Destination}) => {

    const navigate = useNavigate();
    const [showPop, setShowPop] = useState<boolean>(false);
    return(
        <>
        <div className="w-[250px] flex flex-col bg-white shadow-2xl rounded-[10px] transition-transform duration-200 hover:scale-105">

            <img src={destination.images[0]}
             alt="" 
             className="w-full h-[150px] object-cover rounded-t-[10px]"
             />

             <div className="flex flex-col gap-1 mt-2 p-2">
                <div className="flex flex-row items-center gap-3">
                <p className="text-[15px] font-[500]">{destination.city}</p>
                <p className="text-[17px] font-bold">{destination.country}</p>
                </div>

                <div className="flex flex-row gap-1 items-center">
                    {destination.rating}

                     <i  className="fas fa-star text-yellow-500 text-[13px]" />
                </div>

                <div className="flex flex-row items-center gap-5 justify-center  justify-center mt-2 mb-3">
                    <div 
                    onClick={()=>navigate(`/admin/destinationDetail/${destination.id}`)}
                    className="flex flex-row items-center justify-center py-2 text-[15px] rounded-[10px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 font-semibold gap-2 w-[120px] text-white bg-green-600/70">
                        <Icon name="Eye"/> 
                        Details
                    </div>

                    <div
                    onClick={()=>setShowPop(true)}
                    className="flex justify-center flex-row items-center py-2 gap-2 text-[15px] rounded-[10px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 font-semibold w-[120px] text-white bg-red-600/70">
                        <Icon name="Trash"/>
                        Delete

                    </div>
                </div>

             </div>

        </div>

        {showPop && <DeleteDestinationPop setShowPop={setShowPop} destinationId={destination.id}/>}

        </>
    )
}

export default memo(DestinationAdminComponent);