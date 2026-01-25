import { createContext, useContext, useEffect, useState } from "react";
import type { Item, User } from "./Types";



interface AuthContextType{

    currentUser : User | null;
    setCurrentUser : (u : User)=>void;
    error : string | null;
    signUp : (name : string, email : string, password:string)=> Promise<void>
    signIn : (email : string, password : string)=>Promise<void>
    signOut : ()=>Promise<void>
    recommendations : Item[];
    loadingRecom : boolean;
    getRecommendations : ()=>Promise<void>;

}


const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({children} : {children : React.ReactNode}) => {

    const [currentUser, setCurrentUser] = useState<User | null>(()=>{

        const saved = localStorage.getItem('currentUser');

        return saved ? JSON.parse(saved) : null;

    });

    useEffect(()=>{
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);


    const [error, setError] = useState<string | null>(null);

    const [recommendations, setRecommendations] = useState<Item[]>([]);
    const [loadingRecom, setLoadingRecom] = useState<boolean>(false);


    
    const signUp = async(name : string, email : string, password : string) => {


        try{

            const res = await fetch("http://localhost:5000/api/v1/auth/sign-up", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({name, email, password}),
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                setError(data.error || data.message || "Error in SIgning up");
                 return;

            }

            setError(null);
            setCurrentUser(data.data);

        }catch(err){
            console.error(err);

        }
    }


    const signIn = async(email : string, password : string) => {

        try{

            const res = await fetch("http://localhost:5000/api/v1/auth/sign-in", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email, password}),
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                setError(data.error || data.message || 'Error in Signing In');
                return;

            }

            setError(null);

            setCurrentUser(data.data);

        }catch(err){
            console.error(err);

        }
    }

    const signOut = async() => {

        try{

            const res = await fetch("http://localhost:5000/api/v1/auth/sign-out", {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            });

            const data = await res.json();
            if(!res.ok){
                setError(data.error || data.message || 'Error in signing out');
                return;
            }

            setError(null);

            localStorage.removeItem('currentUser');
            setCurrentUser(null);

        }catch(err){
            console.error(err);
        }
    }


    const getRecommendations = async() => {

        setLoadingRecom(true);

        try{
            const res = await fetch("http://localhost:5000/api/v1/auth/recom", {
                method : "GET",
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in getting recommendations");
            }

            setRecommendations(data.data);
            console.log('recommendations : ', data.data)

        }catch(err){
            console.error(err);
        }finally{
            setLoadingRecom(false);
        }
    }

    useEffect(()=>{
        getRecommendations();

    }, []);
    return(
        <AuthContext.Provider value={{currentUser, error, signIn, signOut, signUp, setCurrentUser, recommendations, getRecommendations, loadingRecom}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => {

    const context = useContext(AuthContext);

    if(!context){
        throw new Error("Use the useAuthContext inside the AuthProvider");
    }

    return context;

}