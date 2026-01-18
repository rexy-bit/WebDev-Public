import  { memo } from "react"
import { useAuthContext } from "../../Contexts/AuthContexts";
import { ssrExportNameKey } from "vite/module-runner";



const SignUp = () => {


    const {signUp, error} = useAuthContext();


    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const form = e.currentTarget;

        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;


        if(!email || !password || !name || name.trim() === "" || email.trim() === "" || password.trim() === ""){
            return;
        }

        await signUp(name, email, password);
    }

    return(

        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">


              <h1 className="text-[1.3em] font-bold mt-5">Sign Up Form</h1>

                  <div className="flex flex-col justify-center items-center gap-5 mt-10 p-5 border border-gray-800 rounded-[10px]">

                    <input 
                    type="name"
                    placeholder="Name" 
                    name="name"
                    className="text-[16px] border-1 px-2 py-2 border-gray-800 rounded-[5px] w-[250px]"
                    required
                    />
                     <input 
                     type="email" 
                     placeholder="Email"
                     name="email"
                     className="text-[16px] border-1 px-2 py-2 border-gray-800 rounded-[5px] w-[250px]"

                     required
                     />  

                     <input 
                     type="password"
                     placeholder="Password"
                     name="password"
                     className="text-[16px] border-1 px-2 py-2 border-gray-800 rounded-[5px] w-[250px]"

                     required
                     />


                     <button 
                     type="submit"
                     className="text-[16px] bg-gray-800 text-white font-bold px-5 py-2 rounded-[5px] cursor-pointer transition-all border border-gray-800 duration-300 hover:bg-white hover:text-gray-800"
                     >
                        Sign Up
                     </button>

                     <div className="h-[20px] flex justify-center items-center">
                        {error && <p className="text-red-600 text-[16px] font-bold">{error}</p>}
                     </div>
                  </div>     
        </form>
    )
}

export default memo(SignUp);

