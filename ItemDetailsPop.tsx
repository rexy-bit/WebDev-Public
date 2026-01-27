import { memo, useState } from "react";
import { useItemsAdminContext } from "../../AdminContexts/ItemsAdminContext";


const ItemDetailsPop = ({setShowPop} : { setShowPop : (b : boolean)=>void}) => {

   const {itemDetails, setItemDetails, updateItem, loadingUpdate} = useItemsAdminContext();
   const [imagesFiles, setImagesFiles] = useState<File[]>([]);


   const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

      const {name, value, type} = e.target;

      setItemDetails({
         ...itemDetails!,
         [name] : type === "number" ? Number(value) : value
      });

   }

   const submitForm =  async(e : React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();
       
      if(!itemDetails?.name || !itemDetails?.description || !itemDetails?.category || !itemDetails?.type || !itemDetails?.brand || itemDetails?.price === undefined || itemDetails?.disprice === undefined || itemDetails?.stock === undefined || itemDetails?.rate === undefined || itemDetails?.recommendationScore === undefined){
         return;
      }

      const formData = new FormData();

      formData.append("name", itemDetails.name);
      formData.append("description", itemDetails.description);
      formData.append("category", itemDetails.category);
      formData.append("type", itemDetails.type);
      formData.append("brand", itemDetails.brand);
      formData.append("price", String(itemDetails.price))
      formData.append("disprice", String(itemDetails.disprice));
      formData.append("recommendationScore", String(itemDetails.recommendationScore));
      formData.append("stock", String(itemDetails.stock));
      formData.append("rate", String(itemDetails.rate));
      formData.append("oldImages", JSON.stringify(itemDetails.images));
      formData.append("keyWords", JSON.stringify(itemDetails.keyWords));

      imagesFiles.forEach((file) => {
            formData.append("images", file); // "images" doit être le même nom que celui attendu par ton backend (Multer par ex)
            });

      await updateItem(itemDetails._id, formData);
      setShowPop(false);

      

   }
     return(

        <div onClick={()=>setShowPop(false)} className="fixed inset-0 bg-black/40  flex justify-center z-50">

           <form className="flex flex-col shadow-2xl gap-2  w-[500px] h-[500px] bg-white rounded-[10px] p-5 max-[1025px]:w-[400px] max-[450px]:w-[300px] mt-40 px-6 overflow-y-auto space-y-1" onClick={(e) => e.stopPropagation()} onSubmit={submitForm}>
                <p className="p-5 text-center font-[600] text-[1.2em]">Item Details</p>

                
                <div className="flex flex-row w-full gap-2 items-center justify-between">
                  <p className="text-[15px] font-[600]">Name: </p>
                  <input 
                  type="text" 
                  name="name"
                  className="w-[250px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px] max-[450px]:w-[200px]"
                  value={itemDetails?.name}
                  onChange={handleChange}
                  required
                  />
                </div>

                <div className="flex flex-row w-full gap-2 items-center justify-between">
                  <p className="text-[15px] font-[600]">Description: </p>
                  <textarea 
                  name="description"
                  className="w-[250px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px] max-[450px]:w-[200px]" 
                  id=""
                  value={itemDetails?.description}
                  onChange={handleChange}
                  required
                  ></textarea>
                </div>

                <div className="flex flex-row w-full gap-2 items-center justify-between">
                  <p className="text-[15px] font-[600]">Category: </p>
                  <select 
                  name="category" 
                  className="w-[250px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px] max-[450px]:w-[200px]" 
                  id="" 
                  value={itemDetails?.category}
                  onChange={handleChange}
                  required>

                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Uni</option>
                  </select>
                </div>

                <div className="flex flex-row w-full gap-2 items-center justify-between">
                  <p className="text-[15px] font-[600]">Type: </p>
                  <select 
                  name="type"
               
                  value={itemDetails?.type}
                  className="max-[450px]:w-[200px] w-[250px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px]" 
                  onChange={handleChange}
                  id=""
                  required
                  >

                  <option value="Analog">Analog</option>
                <option value="Digital">Digital</option>
                <option value="Sport">Sport</option>
                <option value="Smartwatch">Smartwatch</option>
                  </select>
                </div>

                <div className="flex flex-row w-full gap-2 items-center justify-between">
                  <p className="text-[15px] font-[600]">Price: </p>
                  <input 
                  type="number" 
                  className="w-[250px] max-[450px]:w-[200px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px]" 
                  name="price"
                  onChange={handleChange}
                  min={0}
                  value={itemDetails?.price}
                  required
                  />
                </div>

                <div className="flex flex-row w-full gap-2 items-center justify-between">
                  <p className="text-[15px] font-[600]">Stock: </p>
                  <input type="number"
                  name="stock"
                  className="w-[250px] max-[450px]:w-[200px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px]"
                  min={0}
                  value={itemDetails?.stock}
                  onChange={handleChange}
                  required
                  />
                </div>

                <div className="flex flex-row w-full gap-2 items-center justify-between"> 
                  <p className="text-[15px] font-[600]">Rate: </p>
                  <input 
                  type="number" 
                  min={0}
                  name="rate"
                  step="0.1"
                  max={5}
                  className="w-[250px] max-[450px]:w-[200px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px]"
                  value={itemDetails?.rate}
                  onChange={handleChange}
                  required
                  />
                </div>

                <div className="flex flex-row w-full gap-2 items-center justify-between">
                  <p className="text-[15px] font-[600]">Discount price: </p>
                  <input 
                  type="number" 
                  min={0}
                  name="disprice"
                  onChange={handleChange}
                  className="w-[250px] max-[450px]:w-[200px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px]"
                  value={itemDetails?.disprice}
                  required
                  />
                </div>

                <div className="flex flex-row w-full gap-2 items-center justify-between">
                  <p className="text-[15px] font-[600]">Recommendation Score: </p>
                  <input 
                  type="number" 
                  name="recommendationScore"
                  min={0}
                  className="w-[250px] max-[450px]:w-[200px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px]"
                  onChange={handleChange}
                  value={itemDetails?.recommendationScore}
                  required
                  />
                </div>

                <div className="flex flex-row w-full gap-2 items-center justify-between">
                  <p className="text-[15px] font-[600]">Brand: </p>
                  <input type="text"
                  value={itemDetails?.brand}
                  name="brand"
                  onChange={handleChange}
                  className="w-[250px] max-[450px]:w-[200px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px]"
                  required
                  />
                </div>

                  <div className="flex flex-col w-full">
                     <p className="text-[15px] font-[600]">KeyWords: </p>
                     <div className="flex flex-wrap gap-4 px-2 mt-3">
                        {itemDetails?.keyWords.map((k)=>{
                           return(
                              <div key={k} className="flex px-2 items-center rounded-[10px] flex-row text-[14px] font-600 bg-gray-200 border-2 border-gray-400 gap-2 py-1 cursor-pointer transtion-opacity duration-200 hover:opacity-80 active:opacity-60">
                                 <p>{k}</p>
                                 <button
                              className="font-[600] text-[1.1em]"
                                 onClick={()=>{
                                    setItemDetails({
                                       ...itemDetails,
                                       keyWords : itemDetails.keyWords.filter((kw)=>kw !== k)
                                    })
                                 }}
                                 >&times;</button>
                              </div>
                           )
                        })}
                     </div>
                  </div>
             <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-[15px] font-[600]">Images</p>
                  <div className="flex flex-wrap gap-5 justify-center items-center mt-5 mb-5">
                  {itemDetails?.images.map((img)=>{
                     return(
                        <div key={img} className="relative w-[60px]" >
                           <img src={img} className="w-[60px] h-[60px] object-contain" alt="" />
                           <button
                           type="button"
                           className="absolute top-[-10px] right-[-10px] w-[20px] h-[20px] flex justify-center items-center rounded-full bg-red-600 text-white cursor-pointer"
                           onClick={()=>{
                              setItemDetails({
                                 ...itemDetails,
                                 images : itemDetails.images.filter((m)=> m !== img)
                              })
                           }}
                           >&times;</button>
                        </div>
                     )
                  })}
                  </div>
                </div>

                        <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            setImagesFiles((prev) => [...prev, ...Array.from(e.target.files)]);

          }
        }}
        className="p-3 border border-gray-300 bg-gray-100 rounded-full cursor-pointer"
      />

      {imagesFiles.length > 0 && (
        <div className="flex gap-3 mt-5 flex-col justify-center">
          {imagesFiles.map((file, idx) => (
            <div key={idx} className="relative">
            <img
              
              src={URL.createObjectURL(file)}
              alt={`preview-${idx}`}
              className="w-[150px] h-[150px] object-contain"
            />

              <button className="absolute top-5 right-1 text-red-600 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>{
                    setImagesFiles(prev => prev.filter((img)=>img !== file))
                }}
                type="button"
                >
                     &#10006;
                </button>
            </div>
          ))}
        </div>
      )}
                </div>

                <button 
                type="submit"
                disabled={loadingUpdate}
                className="bg-amber-500 py-2 mb-5 mt-5 text-white cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 rounded-[5px] font-bold">{loadingUpdate ? "Updating..." : "Update"}</button>
           </form>

           </div>
     )
}

export default memo(ItemDetailsPop);