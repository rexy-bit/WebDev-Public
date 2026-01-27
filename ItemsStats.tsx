import  { memo } from "react";
import { useItemsAdminContext } from "../../AdminContexts/ItemsAdminContext";


const ItemsStats = () => {

    const {totalProducts, totalItemsInStock, highStock, lowStock, outOfStock} = useItemsAdminContext();


    
    return(
        <div className="flex flex-wrap justify-center items-center mt-10 gap-5 px-10">
            <div className="w-[240px] flex flex-row justify-between items-center p-3 h-[120px] bg-white shadow-xl rounded-[10px] cursor-pointer transition-all duration-200 hover:shadow-2xl">
                <div className="flex flex-col gap-1">
                    <p className="text-[1.1em] font-[600] w-[120px] leading-[18px]">Number of items</p>
                    <p className="text-[1.1em]">{totalProducts}</p>
                </div>

                <div className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-amber-500/40"><i className="fa-solid fa-boxes-stacked"></i></div>


            </div>

            <div className="w-[240px] flex flex-row justify-between items-center p-3 h-[120px] bg-white shadow-xl rounded-[10px] cursor-pointer transition-all duration-200 hover:shadow-2xl">
                <div className="flex flex-col gap-1">
                    <p className="text-[1.1em] font-[600] w-[120px] leading-[18px]">Number of Items in stock</p>
                    <p className="text-[1.3em]">{totalItemsInStock}</p>
                </div>

                <div className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-amber-500/40"><i className="fa-solid fa-layer-group"></i></div>


            </div>

             <div className="w-[240px] flex flex-row justify-between items-center p-3 h-[120px] bg-white shadow-xl rounded-[10px] cursor-pointer transition-all duration-200 hover:shadow-2xl">
                <div className="flex flex-col gap-1">
                    <p className="text-[1.1em] font-[600] w-[120px] leading-[18px]">High Stock</p>
                    <p className="text-[1.3em]">{highStock}</p>
                </div>

                <div
                className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-amber-500/40"
                ><i className="fa-solid fa-arrow-trend-up"></i></div>


            </div>

            <div className="w-[240px] flex flex-row justify-between items-center p-3 h-[120px] bg-white shadow-xl rounded-[10px] cursor-pointer transition-all duration-200 hover:shadow-2xl">
                <div className="flex flex-col gap-1">
                    <p className="text-[1.1em] font-[600] w-[120px] leading-[18px]">Low Stock</p>
                    <p className="text-[1.3em]">{lowStock}</p>
                </div>

                <div
                className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-amber-500/40"
                ><i className="fa-solid fa-arrow-trend-down"></i></div>


            </div>

            <div className="w-[240px] flex flex-row justify-between items-center p-3 h-[120px] bg-white shadow-xl rounded-[10px] cursor-pointer transition-all duration-200 hover:shadow-2xl">
                <div className="flex flex-col gap-1">
                    <p className="text-[1.1em] font-[600] w-[120px] leading-[18px]">Out of stock</p>
                    <p className="text-[1.3em]" >{outOfStock}</p>
                </div>

                <div className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-amber-500/40">
                    <i className="fa-solid fa-0"></i>
                </div>
            </div>



            
        </div>
    )

}

export default memo(ItemsStats);