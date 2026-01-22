import { memo, useEffect } from "react"
import { useOrderContext } from "../Contexts/OrdersContext";
import { useNavigate, useParams } from "react-router-dom";



function formatDate(date : Date) {
  // S'assurer que c'est bien un objet Date
  const d = date instanceof Date ? date : new Date(date);

  const options = { month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(d);
}
const Track = () => {
 
    const {getOrder, orderTrack, orderTrackLoading} = useOrderContext();

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getOrder(id);
    }, [id]);
    return(
        <section className="flex flex-col min-h-screen w-full bg-gray-200">

            <button className="fixed left-5 top-16 bg-gray-800 text-white font-bold px-4 py-1 rounded-full cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
            onClick={()=>navigate(-1)}
            >&#8592; Back</button>

            <div className="flex flex-col items-center mt-15">
 
              {
                !orderTrack ?

                   <div className="mt-5 text-[1.1em]">
                      Order not found
                   </div>
                   : 
                     orderTrackLoading ?
                       <i className="fa-solid fa-clock fa-flip text-[3em] mt-5"></i>
                       : 
               <>
               <div className="">
                <p className="text-gray-800 underline text-[19px] cursor-pointer transition-all duration-200 hover:oapcity-80 active:opacity-60"
                onClick={()=>navigate('/orders')}
                >view all orders</p>

                <div className="bg-white flex flex-col p-5 w-[400px] max-[450px]:w-[350px] max-[400px]:w-[320px] rounded-[5px] shadow-xl mt-5">
                    <p className="text-gray-800 font-bold text-[20px] underline">Arriving on : {formatDate(orderTrack?.deliveryDate)}</p>

                    <div className="flex flex-wrap justify-center items-center mt-7 gap-5">
                        {orderTrack?.orders.map((o)=>{
                            return(
                                <div key={o.itemId} className="flex flex-col justify-center items-center">
                                   <img src={o.image} alt="" className="w-[70px] h-[70px] object-contain"/>

                                   <div className="flex flex-col justify-center items-center">
                                     <p className="text-[14px] text-center">{o.itemName}</p>
                                     <p className="text-gray-700 text-[13px]">Quantity: {o.quantity}</p>
                                   </div>
                                </div>
                            )
                        })}
                    </div>

                    <p className="text-[1.1em] font-bold mt-5 smoothPulse ml-3">Status : {orderTrack.status}</p>

                    <p className="text-[15px] mt-2">if you need help : <span className="text-gray-800 underline cursor-pointer transition-all duration-200 hover:oapcity-80 active:opacity-60">Contact Us</span></p>
                </div>
                </div>
            
            </>
              }
            
            </div>
        </section>
    )

}

export default memo(Track);

