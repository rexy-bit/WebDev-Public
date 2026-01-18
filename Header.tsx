import  React, { memo, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";


const Header = () => {


    const [showNav, setShowNav] = React.useState<boolean>(()=>{

        const saved = localStorage.getItem('showNav');

        return saved ? JSON.parse(saved) : false;
    });

    useEffect(()=>{
        localStorage.setItem('showNav', JSON.stringify(showNav));

    }, [showNav]);


    const location = useLocation();


    return(

        <header className="flex flex-row justify-between items-center h-[55px] bg-gray-400 top-0 fixed w-full px-5 shadow shadow-xl text-white">
           <h1 className="text-[1.4em] font-black text-white max-[545px]:text-[1.2em]"><Link to="/"><i className="fa-solid fa-clock"></i> ChronoWatch</Link></h1>

           <div className="hidden max-[450px]:block text-[2em] font-black cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=>{setShowNav(prev => !prev)}} >&#9776;</div>

           <nav className="flex flex-row justify-center items-center gap-5 max-[545px]:gap-3 max-[450px]:hidden">
               <Link to='/' className="linkNav" style={{fontWeight : location.pathname === "/" ? "900" : "400",
                borderBottom : location.pathname === "/" ? "2px solid white" : "none"
               }}>Home</Link>
               <Link to="/store" className="linkNav" style={{fontWeight : location.pathname === "/store" ? "900" : "400",
                borderBottom : location.pathname === "/store" ? "2px solid white" : "none"
               }}>Store</Link>
               <Link to="/cart" className="linkNav">Cart</Link>
               <Link to="/orders" className="linkNav">Orders</Link>
               <Link to="/profile" className="linkNav" style={{fontWeight : location.pathname === "/profile" ? "900" : "400",
                borderBottom : location.pathname === "/profile" ? "2px solid white" : "none"
               }}><i className="fa-solid fa-user text-[1.2em] py-1" ></i></Link>
           </nav>

            {
                showNav && 
                  <nav className="hidden max-[450px]:flex flex-col absolute top-17 w-[120px] bg-gray-100 p-3 gap-2 border border-black rounded-[10px] right-5"> 
                         <Link to='/' className="linkNav">Home</Link>
               <Link to="/store" className="linkNav">Store</Link>
               <Link to="/cart" className="linkNav">Cart</Link>
               <Link to="/orders" className="linkNav">Orders</Link>
               <Link to="/profile" className="linkNav"><i className="fa-solid fa-user text-[1.2em]"></i></Link>

                  </nav>
            }



        </header>
    )
}

export default memo(Header);