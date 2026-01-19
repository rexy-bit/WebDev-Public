import { memo } from "react";
import { useItemsContext } from "../Contexts/ItemsContexts";
import ItemCard from "../Components/StoreComponents/ItemCard";
import FilterComponent from "../Components/StoreComponents/FilterComponent";

const Store = () => {

    const {items} = useItemsContext();
    return(
        <>

          <section className="flex flex-col  items-center min-h-screen">

           <h1 className="mt-10 text-[2.2em] text-gray-800 font-[600] underline">All Watches</h1>

               <FilterComponent/>
           {items.length === 0 ?
              <h1 className="text-[1.1em] text-gray-800 font-bold mt-10 w-[300px] text-center">Not items in the store</h1> 

            : 
           
             <>

             
             <div className="flex flex-wrap justify-center items-center mt-15 gap-5">
                {items.map((it)=>{
                    return(
                        <ItemCard 
                        key={it._id}
                        item={it}/>
                    )
                })}
             </div>
             </>
             }

           </section>


        </>
    );
}


export default memo(Store);