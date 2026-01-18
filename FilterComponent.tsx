import  { memo } from "react";
import { useItemsContext } from "../../Contexts/ItemsContexts"
import {motion} from "framer-motion"
const FilterComponent = () => {

    const {filterData, setFilterData} = useItemsContext();

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {


         const {name, value} = e.target;

         setFilterData({
            ...filterData,
            [name] : value
         });
    }

    return(
        <motion.div
        initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
        className="flex flex-col gap-5 mt-12 p-3 border border-gray-400 rounded-lg font-[arial] shadow-xl">
            <select 
            name="type" 
            id=""
            value={filterData.type}
            onChange={handleChange}
            className="border-b w-[250px] px-2 border-none cursor-pointer font-[550]"
            >
                <option value="" disabled selected>
                    Select a Type
                </option>

                <option value="">All</option>
                <option value="Analog">Analog</option>
                <option value="Digital">Digital</option>
                <option value="Sport">Sport</option>
                <option value="Smartwatch">Smartwatch</option>

            </select>

            <select 
            name="category" 
            id=""
            className="border-b w-[250px] px-2 border-none cursor-pointer text-gray-800 font-[550]"
            value={filterData.category}
            onChange={handleChange}
            >
                <option value="" disabled selected>
                    Select a Category
                </option>

                 <option value="">All</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Uni</option>
            </select>

            <select 
            name="brand" 
            id=""
            value={filterData.brand}
            className="border-b w-[250px] px-2 border-none cursor-pointer font-[550]"
            onChange={handleChange}
            >
                <option value="" disabled selected>
                    Select a Brand
                </option>

                <option value="">All</option>
               <option value="Casio">Casio</option>
               <option value="Tissot">Tissot</option>
               <option value="Fossil">Fossil</option>
               <option value="Hublot">Hublot</option>
               <option value="Rolex">Rolex</option>
               <option value="Omega">Omega</option>
               <option value="Cartier">Cartier</option>
            </select>
        </motion.div>
    )
}

export default memo(FilterComponent);