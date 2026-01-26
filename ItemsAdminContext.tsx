import { createContext, useContext, useEffect, useState } from "react";
import { useItemsContext } from "../Contexts/ItemsContexts";
import type { Item } from "../Contexts/Types";
import { useAuthContext } from "../Contexts/AuthContexts";


interface ItemsAdminContextType{
    totalProducts : number;
    outOfStock : number;
    lowStock : number;
    highStock : number;
    totalItemsInStock : number;
    getStats : ()=>Promise<void>
    outOfStockItems : Item[];
    lowStockItems : Item[];
    highStockItems : Item[];
    loadFilteredItems : ()=>Promise<void>
}


const ItemsAdminContext = createContext<ItemsAdminContextType | null>(null);

export const ItemsAdminContextProvider = ({children} : {children : React.ReactNode}) => {

    const [totalProducts, setTotalProducts] = useState(0);
    const [outOfStock, setOutOfStock] = useState(0);
    const [lowStock, setLowStock] = useState(0);
    const [highStock, setHighStock] = useState(0);
    const [totalItemsInStock, setTotalItemsStock] = useState(0);
    const [lowStockItems, setLowStockItems] = useState([]);
    const [highStockItems, setHighStockItems] = useState([]);
    const [outOfStockItems, setOutOfStockItems] = useState([]);

    const {currentUser} = useAuthContext();


    const {items} = useItemsContext();

    const getStats = async() => {

    try{

        const res = await fetch("http://localhost:5000/api/v1/items/stats", {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            },
            credentials : "include"

        });

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.message || data.error || "Error in getting stats");
        }

        setTotalProducts(data.data.totalProducts);
        setOutOfStock(data.data.outOfStock);
        setLowStock(data.data.lowStock);
        setHighStock(data.data.highStock);
        setTotalItemsStock(data.data.totalItemsInStock);

      

        
    }catch(err){
        console.error(err);
    }
    }


    const loadFilteredItems = async() => {

        try{

            const res = await fetch('http://localhost:5000/api/v1/items/filter', {
                method : "GET",
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in fetching filtered data");
            }

            setOutOfStockItems(data.data.outOfStock);
            setHighStockItems(data.data.highStock);
            setLowStockItems(data.data.lowStock);

        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        if(currentUser && currentUser.role === "admin"){
            loadFilteredItems();
        }
    })
    
    useEffect(()=>{
        getStats();
    }, [items]);

    return (
        <ItemsAdminContext.Provider value={{getStats,outOfStock, highStock, lowStock, totalItemsInStock, totalProducts, outOfStockItems, loadFilteredItems, lowStockItems, highStockItems
        }}>{children}</ItemsAdminContext.Provider>
    );
}

export const useItemsAdminContext = () => {

    const context = useContext(ItemsAdminContext);

    if(!context){
        throw new Error("Please use the useItemsAdminContext inside an ItemsAdminCOntextProvider");
    }

    return context;
}