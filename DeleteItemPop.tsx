import  { memo } from "react";
import type { Item } from "../../Contexts/Types";
import { useItemsAdminContext } from "../../AdminContexts/ItemsAdminContext";

const DeleteItemPop = ({setShowPop, item} : {setShowPop : (b : boolean)=>void, item : Item}) =>{

   const {deleteItem, loadingDelete} = useItemsAdminContext();
    return(
         <div onClick={()=>setShowPop(false)} className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">

           <div className="flex flex-col  w-[700px] h-[200px] bg-white rounded-[5px] max-[1025px]:w-[400px] max-[450px]:w-[300px] px-6 py-5 relative" onClick={(e) => e.stopPropagation()}>
 
                 <p className="font-[600] text-[1.1em] text-center">Are You sure You want to delete item :  {item.name}?</p>
                 <div className="flex flex-row justify-center items-center gap-4 mt-5">
                 <button 
                 disabled={loadingDelete}
                 className="bg-red-600 text-white font-[600] text-[14px] w-[100px] h-[35px] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                    {loadingDelete ? "Deleting..." : "Delete"}
                 </button>

                 <button
                 className="bg-amber-500 text-white font-[600] text-[14px] w-[100px] h-[35px] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                 >Cancel</button>
                 </div>

                 <button
                 className="absolute top-[-10px] right-[-10px] bg-red-600 h-[30px] w-[30px] rounded-full text-[white] font-bold text-[1.2em] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                 onClick={()=>setShowPop(false)}
                 >&times;</button>
                 
                
           </div>

           </div>
    )
}

export default memo(DeleteItemPop);