import  { memo } from "react"
import { useDestinationAdminContext } from "../../AdminContexts/DestinationAdminContext";


const DeleteDestinationPop = ({setShowPop, destinationId} : {setShowPop : (b : boolean)=>void, destinationId : string}) => {

    const {deleteDestination, loadingDeleteDestination} = useDestinationAdminContext();

    const execute = async() => {
        await deleteDestination(destinationId)
        setShowPop(false);
    }
    return(
         <div onClick={()=>setShowPop(false)} className="fixed inset-0 bg-black/50  flex justify-center items-center z-50">

           <div className="flex flex-col items-center w-[700px] h-[350px] bg-white text-black rounded-2xl relative max-[1025px]:w-[400px] max-[450px]:w-[300px] " onClick={(e) => e.stopPropagation()}>
               
               <h2 className="mt-10 text-[17px] text-gray-800 px-5 text-center">Etes vous sur de vouloir supprimer cette destination ?</h2>

               <div className="flex flex-row justify-center items-center gap-4 mt-5">
                <button
                onClick={execute}
                className="w-[140px] py-2 bg-red-800/80 text-white rounded-[10px] text-[15px] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                   {loadingDeleteDestination ? <i className="fa-solid fa-arrow-rotate-right fa-spin"></i> : "Oui, Supprimer"}  
                </button>

                <button
                onClick={()=>setShowPop(false)}
                className="bg-gray-800 text-white text-[15px] font-bold py-2 w-[80px] rounded-[10px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                   Retour
                </button>
               </div>

               <button className="absolute top-2 text-[35px] right-4 font-bold cursor-pointer" onClick={()=>setShowPop(false)}>
                &times;
               </button>
           </div>
        </div>
    )
}

export default memo(DeleteDestinationPop);