import { memo, useEffect, useState , useRef} from "react"
import { useItemsContext } from "../Contexts/ItemsContexts"
import { useParams } from "react-router-dom";
import StarsRating from "../Components/StoreComponents/StarsRating";
import { useCartContext } from "../Contexts/CartContext";
import { FaFacebookF, FaInstagram,  FaWhatsapp } from "react-icons/fa6";
import type { Item } from "../Contexts/Types";
import { useFavoritesContext } from "../Contexts/FavoritesContext";
import { div } from "framer-motion/client";
import { useAuthContext } from "../Contexts/AuthContexts";
import Recommendations from "../Components/StoreComponents/Recommendations";


const productUrl = window.location.href;

interface InfoCard {
    id: string;               // unique identifier
    title: string;            // title displayed on the page
    shortDescription: string; // short paragraph visible directly
    details: string;          // full details for a popup or "See more"
    icon?: string;            // optional, for a FontAwesome or SVG icon
}

const productInfoCards : InfoCard[] =  [
    {
        id: "delivery",
        title: "Delivery",
        shortDescription: "At ChronoWatch, we ensure fast and secure delivery for all your orders.",
        details: "We work with reliable partners to guarantee that your watches arrive safely and on time. Standard delivery takes 3-5 business days, and express delivery is available for urgent needs. You can track your order in real time with our tracking system.",
        icon: "https://res.cloudinary.com/dub4fhabm/image/upload/v1769114257/ceb82119-1614-47d8-911b-40b27d11c45f.png"
    },
    {
        id: "returns",
        title: "Returns",
        shortDescription: "Free and easy returns within 14 days if the product doesn't meet your expectations.",
        details: "Our return process is fast and free. Each returned product is inspected to ensure quality before refund or exchange. To initiate a return, log in to your account and follow the steps in the 'My Orders' section.",
        icon: "https://res.cloudinary.com/dub4fhabm/image/upload/v1769114293/32793f98-2f59-4ec2-b3c1-e6bff47b33e3.png"
    },
    {
        id: "warranty",
        title: "Warranty & Security",
        shortDescription: "All our watches come with a 2-year warranty and secure payment guaranteed.",
        details: "Each ChronoWatch watch comes with a 2-year full warranty covering manufacturing defects. We use secure payment methods to protect your personal information. Our customer support is available for any questions or issues.",
        icon: "https://res.cloudinary.com/dub4fhabm/image/upload/v1769114352/8c126fc8-abd5-4065-8bee-c2852cc3d03b.png"
    }
];


const InfoPop = ({setShowPop, i} : {setShowPop : (b : boolean)=>void, i : number}) => {

    const infoD = productInfoCards[i];
    return(

        <div onClick={()=>setShowPop(false)} className="fixed inset-0 bg-black/40  flex  justify-center z-50">

            <div className="flex flex-col  w-[700px] h-[300px] bg-white rounded-[5px] max-[1025px]:w-[400px] max-[450px]:w-[300px] px-6 mt-40" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-row justify-between items-center w-full  border-b border-b-gray-300">
                    <p className="font-bold">{infoD.title}</p>
                    <div className="text-[2em] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                    onClick={()=>setShowPop(false)}
                    >
                        &times;
                    </div>
                  </div>

                  <div className="flex flex-col mt-3">
                    <img className="w-20" src={infoD.icon} alt="" />
                    <div className="text-[14px] text-gray-600 mt-2">
                        {infoD.details}
                    </div>
                  </div>


            </div>
           
        </div>
    )
}

const InfoCardComp = ({setShowPop, setCurrentIndex} : {setShowPop : (b : boolean)=>void, setCurrentIndex : (i: number)=>void}) => {


    

    return(
         <div className="flex flex-col bg-white w-[250px] rounded-[5px] shadow-xl h-[350px]">

            <div className="text-[15px] font-bold p-2 border-b border-gray-200">Delivery & Returns</div>

            <div className="flex flex-col p-3 gap-5 w-full">
                {productInfoCards.map((p: InfoCard, i : number)=>{
                    return(
                        <div key={p.id} className="flex flex-row gap-4 w-full justify-between items-start">
                             <img src={p.icon} alt="" className="w-8"/>
                             <div className="flex flex-col gap-[5px]">
                                <div className="flex flex-row justify-between items-center w-full">
                                    <p className="text-[13px] font-[600]">{p.title}</p>
                                    <p className="text-[12px] text-gray-700 underline cursor-pointer transition-opacity duration-200 "onClick={()=>{
                                        setCurrentIndex(i);
                                        setShowPop(true);
                                    }}>Details</p>
                                </div>
                                <div className="text-[12px] leading-[15px] w-full text-gray-600">
                                    {p.shortDescription}
                                </div>
                             </div>
                        </div>
                    )
                })}
            </div>
         </div>
    )
}

const ShareProduct = ({item} : {item : Item | null}) => {

    const text = `Check out this product: ${item?.name}`;

    return <div className="flex flex-row  items-center gap-4">

        <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${productUrl}`}
          target="_blank"
          rel="noreferrer"
          className=" text-[20px] text-gray-800 transition-opacity duration-200  hover:opacity-80
          active:opacity-60 cursor-pointer"
        >
            <FaFacebookF />
        </a>

         <a
          href={`https://wa.me/?text=${text} ${productUrl}`}
          target="_blank"
          rel="noreferrer"
          className=" text-[20px] text-gray-800 transition-opacity duration-200  hover:opacity-80
          active:opacity-60 cursor-pointer"
        >
          <FaWhatsapp />
        </a>

        {/* Instagram (info importante 👇) */}
        <button
          onClick={() => navigator.clipboard.writeText(productUrl)}
          className=" text-[20px] text-gray-800 transition-opacity duration-200  hover:opacity-80
          active:opacity-60 cursor-pointer"
        >
          <FaInstagram />
        </button>
    </div>
}


const ImagePop = ({setShowPop , setCurrentIndex, currentIndex, item}: {setShowPop : (b : boolean)=>void, setCurrentIndex : (n: number)=>void, currentIndex : number, item : Item} ) => {

    return(

        <div onClick={()=>setShowPop(false)} className="fixed inset-0 bg-black/40  flex  justify-center z-50">
         <div  className="flex flex-col  w-[700px] h-[500px] bg-white rounded-[5px] max-[1025px]:w-[400px] max-[450px]:w-[300px] px-6 mt-40" onClick={(e) => e.stopPropagation()}>

                 <div className="flex flex-row justify-between items-center w-full py-1 border-b border-gray-300">
                    <div className="text-[15px] font-bold">Images of the product</div>
                    <div className="text-[2em] transition-opacity duration-200 hover:opacity-80 active:opacity-60 cursor-pointer"
                    onClick={()=>setShowPop(false)}
                    >
                        &times;
                    </div>
                 </div>
            

            <div className="flex flex-col p-3 gap-5 w-full justify-center items-center">
                <img src={item.images[currentIndex]} alt="" 
                                      className="w-[300px] h-[300px] object-contain rounded-[2px]"
                                    />

                                    <div className="flex flex-wrap justify-center gap-5 mt-5">
                                        {item.images.map((img,i)=>{
                                            return(
                                                <img src={img} style={{border : currentIndex === i ? "1px solid gray" : "none"}} className="w-[50px] h-[50px] object-contain cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 p-[2px]" onClick={()=>setCurrentIndex(i)}
                                                key={i}
                                                />
                                            )
                                        })}
                                    </div>
            </div>
         </div>
         </div>
    )
}

const ItemDetails = () => {


    const {getItem, errorItem, itemDetails} = useItemsContext();

        const {getCart, setCart, cart} = useCartContext();

        const {recommendations} = useAuthContext();
    
    
        const [msg, setMsg] = useState({
            show : false,
            text : "",
            color : "red"
        });
    
        const findItem = cart.items.find((it)=>it._id === itemDetails?._id);
    
    
        const timeoutRef = useRef<number | null>(null);
    
            useEffect(() => {
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }, []);
    
    
           
           const addToCart = async(itemId : string) => {
    
               if(itemDetails?.stock === 0){
                   setMsg({
                    show : true,
                    text : "Out of Stock",
                    color : "red"
                   });
    
                   if(timeoutRef.current){
                    clearTimeout(timeoutRef.current);
                   }
    
                   timeoutRef.current = setTimeout(()=>{
                    setMsg(prev => ({
                        ...prev,
                        show : false
                    }))
                   }, 3000);
    
                   return;
               }
    
    
               if(findItem){
    
                setMsg({
                    text : "Already in cart",
                    show : true,
                    color : "red"
                });
    
                 if(timeoutRef.current){
                    clearTimeout(timeoutRef.current);
                 }
    
                 timeoutRef.current = setTimeout(()=>{
                    setMsg(prev => ({
                        ...prev,
                        show : false
                    }))
                 }, 3000);
    
                 return;
               }
    
            try{
    
                const res = await fetch(`http://localhost:5000/api/v1/cart/add/${itemId}`, {
                    method : "POST",
                    credentials : "include"
    
                });
    
                const data = await res.json();
    
                if(!res.ok){
                    console.error(data.error || data.message || "Error in adding to cart");
                    return;
                }
    
                setMsg({
                    show : true,
                    text : "Item added to Cart",
                    color: "green"
                });
    
                if(timeoutRef.current){
                    clearTimeout(timeoutRef.current);
                }
               
                timeoutRef.current = setTimeout(()=>{
                    setMsg(prev => ({
                        ...prev,
                        show : false
                    }));
                }, 3000);
    
    
                 await getCart();
    
                
    
            }catch(err){
                console.error(err);
            }
        }

    const [currentImg, setCurrentImg] = useState<number>(0);

    const {id} = useParams();
   
    const {favorites, toggleFavorite} = useFavoritesContext();

    const isFavorite = favorites.find((f)=>f._id === itemDetails?._id);

    
    const [showPopInfo, setShowPopInfo] = useState<boolean>(false);
        const [currentIndex, setCurrentIndex] = useState<number>(0);
        const [showPop, setShowPop] = useState<boolean>(false);
      

    useEffect(()=>{
        getItem(id);
    }, [id]);
    return(
        <section className="flex flex-col min-h-screen w-full items-center bg-gray-200">

            {!itemDetails 
               ?
                 <div className="mt-10 text-[1.5em]">Item Not Found</div>
                 : 
                   errorItem ?
                     <i className="fa-solid fa-clock fa-flip text-[3em] mt-5"></i>

                      : 
                      <div className="flex flex-row items-start gap-5 mt-10 max-[750px]:flex-col max-[750px]:justify-center max-[750px]:items-center mb-10">
                        <div className="flex flex-col gap-5">
                        <div className="flex flex-col justify-center bg-white p-5 rounded-[5px] w-[900px]  shadow-xl max-[1200px]:w-[600px] max-[900px]:w-[400px] max-[450px]:w-[350px] max-[375px]:w-[300px]">

                            <div className="flex flex-row justify-center gap-10 items-start w-full max-[1000px]:flex-col max-[1000px]:items-center">

                                <div className="flex flex-col justify-center items-center w-[400px]">
                                    <img src={itemDetails.images[currentImg]} alt="" 
                                      className="w-[250px] h-[250px] object-contain rounded-[2px] cursor-pointer"
                                      onClick={()=>setShowPop(true)}
                                    />

                                    <div className="flex flex-wrap justify-center gap-5 mt-5 max-[500px]:gap-2">
                                        {itemDetails.images.map((img,i)=>{
                                            return(
                                                <img src={img} style={{border : currentImg === i ? "1px solid gray" : "none"}} className="w-[50px] h-[50px] object-contain cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 p-[2px]" onClick={()=>setCurrentImg(i)}
                                                key={i}
                                                />
                                            )
                                        })}
                                    </div>

                                </div>

                                <div className="flex flex-col w-full">
                                    <div className="border-b border-gray-300 py-2 flex flex-row w-full justify-between items-center">
                                    <div className="text-[1.3em] text-gray-700  ">{itemDetails.name}</div>

                                      <div className="bg-gray-200 rounded-full p-1 px-[8px] border-2 border-gray-800 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                                      onClick={()=>toggleFavorite(itemDetails._id)}
                                      ><i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
</div>
                                    </div>

                                    
                                        {itemDetails.disprice < itemDetails.price
                                           ?
                                             <div className="flex flex-row items-center gap-3 mt-5">
                                                <p className="text-[19px] font-bold">{itemDetails.disprice} Dzd</p>
                                                <p className="text-[14px] text-gray-600 line-through">{itemDetails.price} Dzd</p>
                                                <div className="bg-amber-100 text-[13px] w-[50px] flex justify-center items-center rounded-[5px] py-1 text-amber-700 font-bold">-{Math.round(((itemDetails.price - itemDetails.disprice) * 100) / itemDetails.price)}%

                                                </div>
                    
                                                </div>
                                                : 
                                              <div className="font-bold text-[23px] text-gray-800 mt-4">
                                                {itemDetails.price} Dzd
                                              </div>
                                         }
                                    
                                    {itemDetails.stock <= 10 && <div className="text-[12px] text-red-700 flex items-center flex-row gap-1 mb-2">{itemDetails.stock}<i className="fa-solid fa-info"></i> {itemDetails.stock === 1 ? "article" : "articles"} {itemDetails.stock === 0 ? "left" : "only"}</div>}

                                     <StarsRating note={itemDetails.rate}/>

                                     <div className="h-[20px] flex mt-2">
                                        {msg.show && <p style={{color : msg.color}} className="font-bold text-[15px]">{msg.text}</p>}
                                     </div>

                                     <button className="bg-gray-800 text-gray-100 text-[15px] font-bold py-3 mt-5 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                                     onClick={()=>addToCart(itemDetails._id)}
                                     >
                                        Add To Cart
                                     </button>
                                </div>
                            </div>

                            <div className="flex flex-col border-t border-gray-300 mt-5">
               <p className="text-[14px] text-gray-700 font-[600] mb-3 mt-3">SHARE THIS PRODUCT</p>

                 <ShareProduct item={itemDetails}/>

                 <div className="text-[13px] text-blue-900 mt-10 hover:underline cursor-pointer">Report an abuse or issue with the product</div>
            </div>

                          

                          
                        </div>

                        <div className="w-[900px] bg-white rounded-[5px] shadow-xl max-[1200px]:w-[600px] max-[900px]:w-[400px] max-[450px]:w-[350px] max-[375px]:w-[300px]">
                            <div className="w-full p-3 border-b border-gray-200">
                                Details
                            </div>

                            <div className="p-3 text-[15px] text-gray-600 py-6 ">
                                {itemDetails.description}
                            </div>
                        </div>

                           </div>
                           <InfoCardComp setShowPop={setShowPopInfo} setCurrentIndex={setCurrentIndex}/>
                        </div>
            }

            {showPopInfo && <InfoPop setShowPop={setShowPopInfo} i={currentIndex}/>}
            {showPop && <ImagePop setShowPop={setShowPop} setCurrentIndex={setCurrentImg} currentIndex={currentImg} item={itemDetails}/>}

            {recommendations.length !== 0 && <Recommendations/>}

            
        </section>
    )
}

export default memo(ItemDetails);