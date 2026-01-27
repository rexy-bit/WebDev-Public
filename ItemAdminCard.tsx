import { memo, useEffect, useState } from "react";
import type { Item } from "../../Contexts/Types";
import ItemDetailsPop from "./ItemDetailsPop";
import { useItemsAdminContext } from "../../AdminContexts/ItemsAdminContext";
import DeleteItemPop from "./DeleteItemPop";


const ItemAdminCard = ({item} : {item : Item}) => {

    const {setItemDetails} = useItemsAdminContext();

    const [showPopDetails, setShowPopDetails] = useState<boolean>(false);
    const [showDeletePop, setShowDeletePop] = useState<boolean>(false);

    useEffect(()=>{
        localStorage.setItem('showPopDetails', JSON.stringify(showPopDetails));

    }, [showPopDetails]);

    return(
        <>
    <div className="flex flex-row justify-between p-5 items-center w-[1000px] bg-white rounded-[10px] shadow-xl transition-all duration-200 hover:shadow-2xl max-[1100px]:w-[800px] max-[900px]:w-[500px] max-[600px]:w-[270px] max-[600px]:gap-7 max-[600px]:p-4 max-[600px]:flex-col">
            <div className="flex flex-row justify-center items-center">
        <img src={item.images[0]} alt="" className="object-contain w-[100px] h-[100px] max-[600px]:w-[80px] max-[600px]:h-[80px]"/>
                <div className="flex flex-col gap-1">
                    <p className="text-[14px] font-[600]">{item.name}</p>
                    {item.disprice < item.price && <p className="text-gray-700 text-[15px]">Discount Price: {item.disprice} Dzd</p>}
                    <p className="text-gray-800 text-[15px]">Initial Price: {item.price} Dzd</p>
                    <p className="font-[500] text-[15px]">Stock: {item.stock}</p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-3">
                    <button className="h-[35px] w-[90px] rounded-[5px] bg-gray-300 text-gray-800 text-[13px] font-[600] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>{
                        setItemDetails(item);
                        setShowPopDetails(true);
                        
                    }}><i className="fa-regular fa-pen-to-square text-[16px]"></i> Update</button>
                    <button className="h-[35px] w-[90px] rounded-[5px] bg-red-200 text-red-700 text-[13px] font-[600] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                    onClick={()=>{
                        setShowDeletePop(true);
                    }}
                    ><i className="fa-solid fa-trash text-[16px]"></i> Delete</button>
                </div>
        </div>

          {showPopDetails && <ItemDetailsPop setShowPop={setShowPopDetails}/>}
          {showDeletePop && <DeleteItemPop setShowPop={setShowDeletePop} item={item}/>}
        </>
    )
}

export default memo(ItemAdminCard);