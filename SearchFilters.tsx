import  { memo } from "react"
import { useSearchContext } from "../../Contexts/SearchContext";
import { useItemsContext } from "../../Contexts/ItemsContexts";


const SearchFilter = () => {


    const {setSearch} = useSearchContext();

    const {filterData, setFilterData, resetFilter} = useItemsContext();

    const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();


        const form = e.currentTarget;



        const formData = new FormData(form);

        const search = formData.get("search") as string;

        if(!search || search.trim() === ""){
            return;
        }

        setSearch(search);
        resetFilter();

    }

       const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {

        setSearch("");

         const {name, value} = e.target;

         setFilterData({
            ...filterData,
            [name] : value
         });
       }


    return(
<div className="flex flex-col  gap-5 bg-white w-[1000px] max-[1100px]:w-[320px] max-[1100px]:flex-col mt-10  px-5 rounded-[10px] shadow-xl mb-5">
    <div className="pt-5 flex flex-row gap-2 items-center"><i className="fa-solid fa-magnifying-glass text-green-700 text-[1.4em]"></i> <p className="font-[600] text-[1.1em]">Search and Filters</p></div>
    <div className="flex flex-row justify-center items-center gap-5 pb-10 pt-3 max-[1100px]:flex-col">
                <form onSubmit={handleFormSubmit} className="relative"
                >
                    <input 
                    type="text" 
                    name="search"
                    placeholder="Search, by _id, name, brand..."
                     className="w-[300px] text-[14px] border border-gray-300 px-3 h-[40px] rounded-[10px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400  max-[1100px]:w-[250px]"
            />

            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 text-[20px] pr-2 cursor-pointer py-1 "><i className="fa-solid fa-magnifying-glass"></i>
            </button>

                </form>

                 <select 
            name="type" 
            id=""
            value={filterData.type}
            onChange={handleChange}
            
            className=" w-[200px] px-2 border border-gray-300 cursor-pointer text-[14px] py-2 rounded-[10px] text-gray-700"
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
            className=" w-[200px] px-2 border border-gray-300 cursor-pointer text-[14px] py-2 rounded-[10px] text-gray-700"
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
           className=" w-[200px] px-2 border border-gray-300 cursor-pointer text-[14px] py-2 rounded-[10px] text-gray-700"
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

            </div>
        </div>
    );
}

export default memo(SearchFilter);