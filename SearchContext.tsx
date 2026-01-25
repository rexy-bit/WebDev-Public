import { createContext, useContext, useEffect, useState } from "react";
import type { Item } from "./Types";



interface SearchContextType{
    search : string;
    setSearch : (s : string) => void;
    searchResult : Item[];
    searchLoading : boolean;
    getSearchResult : (s : string)=>Promise<void>

}


const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({children} : {children : React.ReactNode}) => {

    const [search, setSearch] = useState<string>(()=>{
        const saved = localStorage.getItem('search');

        return saved ? JSON.parse(saved) : "";
    });

    useEffect(()=>{
        localStorage.setItem('search', JSON.stringify(search));
    }, [search]);

    const [searchResult, setSearchResult] = useState<Item[]>([]);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);


    const getSearchResult = async(s : string) => {

        setSearchLoading(true);

        try{

            const res = await fetch(`http://localhost:5000/api/v1/items/search`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({search : s})
            });

            const data = await res.json();


            if(!res.ok){
                throw new Error(data.error || data.message || "Error in searching");
            }

            setSearchResult(data.data);
            console.log('Search Result : ', data.data);
        }catch(err){
            console.error(err);
        }finally{
            setSearchLoading(false);
        }
    }

    useEffect(()=>{
        if(search && search.trim() !== ""){
            getSearchResult(search);
        }
    }, [search]);

    return(
        <SearchContext.Provider value={{search, setSearch, getSearchResult, searchLoading, searchResult}}>
            {children}
        </SearchContext.Provider>
    );
}


export const useSearchContext = () => {

    const context = useContext(SearchContext);

    if(!context){
        throw new Error("Use the useSearchContext inside a SearchProvider");
    }

    return context;
}


