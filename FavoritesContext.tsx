
import { createContext, useContext, useEffect, useState } from "react";
import type { Item } from "./Types";
import { useAuthContext } from "./AuthContexts";


interface FavoritesContextType{

    favorites : Item[];
    loadingFavorites : boolean;
    toggleFavorite : (itemId : string)=>Promise<void>
    getFavorites : ()=>Promise<void>
}


const FavoritesContext = createContext<FavoritesContextType | null>(null);


export const FavoritesProvider = ({children} : {children: React.ReactNode}) => {

    const [favorites, setFavorites] = useState<Item[]>([]);
    const [loadingFavorites , setLoadingFavorites] = useState<boolean>(false);

    const {currentUser, setCurrentUser} = useAuthContext();


    const toggleFavorite = async(itemId : string) => {

        try{

            const res = await fetch(`http://localhost:5000/api/v1/favorites/toggle/${itemId}`, {
                method : "POST",
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in toggling a favorite");
            }

             setCurrentUser(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                favorites: data.data // data.data contient le tableau de favoris renvoyé par le backend
            };
        });

        await getFavorites();


        }catch(err){
            console.error(err);
        }
    }


    const getFavorites = async() => {

        setLoadingFavorites(true);
        try{

            const res = await fetch("http://localhost:5000/api/v1/favorites/", {
                method : "GET",
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Favorites Got");
            }

            setFavorites(data.data);
            console.log("Favorites : ", data.data);
            
        }catch(err){
            console.error(err);
        }finally{
            setLoadingFavorites(false);
        }
    }

    useEffect(()=>{
        if(currentUser){
        getFavorites();
        }
    }, []);

    return(
        <FavoritesContext.Provider value={{favorites, loadingFavorites, getFavorites, toggleFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )

}


export const useFavoritesContext = () => {

    const context = useContext(FavoritesContext);

    if(!context){
        throw new Error("Please use the useFavoritesContext inside the FavoritesProvider");
    }

    return context;
}

