import { memo, useEffect, useState } from "react"
import { useSearchContext } from "../../Contexts/SearchContext";
import { useItemsContext } from "../../Contexts/ItemsContexts";
import { useItemsAdminContext } from "../../AdminContexts/ItemsAdminContext";
import type { Item } from "../../Contexts/Types";
import ItemAdminCard from "./ItemAdminCard";


const DisplayItems = () => {

    const {searchResult, setSearch, search} = useSearchContext();
    
    const {items, resetFilter, filterData} = useItemsContext();
    const {outOfStockItems, highStockItems, lowStockItems} = useItemsAdminContext();

    const [myFilter, setMyFilter] = useState("All");

    const [itemsDisplay, setItemsDisplay] = useState<Item[]>([]);

    const selectItems = () => {

        if(myFilter === "High"){
          setItemsDisplay(highStockItems);
        }else if(myFilter === "Low"){
            setItemsDisplay(lowStockItems);
        }else if(myFilter === "Out"){
             setItemsDisplay(outOfStockItems);
        }else{
            setItemsDisplay(items);
        }
    }

    useEffect(()=>{
        selectItems();
    }, [myFilter, items, outOfStockItems, lowStockItems, highStockItems]);

    const handleClick = (click : string) => {
        setMyFilter(click);
        setSearch("");
        resetFilter();
        
    }
    return(
        <div className="flex flex-col mt-10 mb-10">
            <div className=" flex flex-row justify-center items-center gap-0 ">
                <div className="py-4 px-8 max-[1100px]:px-2"
                style={{borderBottom : myFilter === 'All' ? "solid 2px #60A5FA" : "solid 1px lightgray",
                    color : myFilter === 'All' ? "#3B82F6" : 'black',
                    fontWeight : myFilter === "All" ? "600" : '400'

                }}
                onClick={()=>handleClick('All')}><i className="fa-solid fa-globe"></i> All</div>
                <div className="py-4 px-8 max-[1100px]:px-2" onClick={()=>handleClick('High')}
                    style={{borderBottom : myFilter === 'High' ? "solid 2px #60A5FA" : "solid 1px lightgray",
                    color : myFilter === 'High' ? "#3B82F6" : 'black',
                    fontWeight : myFilter === "High" ? "600" : '400'

                }}
                    ><i className="fa-solid fa-arrow-trend-up"></i> High Stock</div>
                <div className="py-4 px-8 max-[1100px]:px-2" onClick={()=>handleClick('Low')}
                    style={{borderBottom : myFilter === 'Low' ? "solid 2px #60A5FA" : "solid 1px lightgray",
                    color : myFilter === 'Low' ? "#3B82F6" : 'black',
                    fontWeight : myFilter === "Low" ? "600" : '400'

                }}
                    ><i className="fa-solid fa-arrow-trend-down"></i> Low Stock</div>
                <div className="py-4 px-8 max-[1100px]:px-2" onClick={()=>handleClick('Out')}
                    style={{borderBottom : myFilter === 'Out' ? "solid 2px #60A5FA" : "solid 1px lightgray",
                    color : myFilter === 'Out' ? "#3B82F6" : 'black',
                    fontWeight : myFilter === "Out" ? "600" : '400'

                }}
                    ><i className="fa-solid fa-hourglass"></i> Out Of Stock</div>
            </div>

              <div className="  mt-10 p-5 rounded-[10px]  flex flex-col justify-center items-center">
                {(search && search.trim() !== "") ?
                      <div className="flex flex-col w-full justify-center items-center gap-6">
                        {searchResult.length === 0 ? <div className="flex flex-col justify-center items-center gap-5">
                            <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1769369847/945a45cf-c950-416c-8df1-2205c185fe79.png" alt=""className="w-20" />
                            <p className="text-[18px] font-[600]">Not found...</p>
                        </div> :
                        <>
                        {searchResult.map((it)=>{
                            return(
                                <ItemAdminCard item={it} key={it._id}/>
                            )
                        })}
                        </>
                     }
                      </div>
                      : 
                       (filterData.brand !== "" && filterData.category !== "" && filterData.type !== "") ?
                         <div className="flex flex-col w-full justify-center items-center gap-6">
                            {items.map((it)=>{
                                return(
                                    <ItemAdminCard item={it} key={it._id}/>
                                )
                            })}
                         </div>
                         : 
                          <div className="flex flex-col w-full justify-center items-center gap-6">
                            {itemsDisplay.length === 0 ?
                               <div className="flex flex-col justify-center items-center gap-5 ">
                            <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1769369847/945a45cf-c950-416c-8df1-2205c185fe79.png" alt=""className="w-20" />
                            <p className="text-[18px] font-[600]">No Items</p>
                        </div>
                            :
                            <>
                              {itemsDisplay.map((it)=>{
                                return(
                                    <ItemAdminCard item={it} key={it._id}/>
                                )
                              })}
                              </>
                            }
                          </div>
                          
                        
            }
            </div>
            
        </div>
    );
}

export default memo(DisplayItems);