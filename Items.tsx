import  { memo } from "react"
import { useItemsContext } from "../Contexts/ItemsContexts";
import { useItemsAdminContext } from "../AdminContexts/ItemsAdminContext";
import ItemsStats from "../AdminComponents/ItemsAdminComponents/ItemsStats";
import SearchFilters from "../AdminComponents/ItemsAdminComponents/SearchFilters";
import DisplayItems from "../AdminComponents/ItemsAdminComponents/DisplayItems";
import { useSearchContext } from "../Contexts/SearchContext";


const Items = () => {

    const {items} = useItemsContext();
    const {setSearch} = useSearchContext();
    const {resetFilter} = useItemsContext();

    const reset = () => {
        setSearch('');
        resetFilter();
    }

     
    return(
        <section className="min-h-screen flex flex-col overflow-x-hidden w-full bg-gray-200">
            <header className="w-full fixed top-0 h-[80px] bg-white shadow-2xl flex flex-row justify-between items-center overflow-x-hidden z-10">
                <div className="flex ml-15 flex-col min-[600px]:ml-35">
               <div className=" text-[20px] font-[600] max-[600px]:text-[15px] leading-[20px] max-[600px]:w-[100px]">List of store Items</div>
               <div className="text-black text-[14px] text-gray-700">{items.length} items in Total</div>
               </div>

               <div className="flex flex-row justify-center items-center mr-5 gap-5 max-[600px]:gap-2 max-[600px]:mr-2">
                 <button className="h-[40px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 bg-gray-200 w-[40px] rounded-full"
                 onClick={reset}
                 ><i className="fa-solid fa-arrows-rotate"></i></button>
                 <button className="px-4 py-2 bg-[#217346] text-white text-[13px] font-[600] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"><i className="fa-solid fa-download"></i> Export CSV</button>
               </div>
            </header>
            
            <main className="pt-[80px] flex flex-col justify-center items-center">
                <ItemsStats/>
                <SearchFilters/>
                <DisplayItems/>
            </main>

            

        </section>
    )
}

export default memo(Items);