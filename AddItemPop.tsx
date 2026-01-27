import  { memo, useState } from "react"
import { useItemsAdminContext } from "../../AdminContexts/ItemsAdminContext";


const AddItemPop = ({setShowPop} : {setShowPop : (b : boolean)=>void}) => {


     const {addItem, loadingAdd} = useItemsAdminContext();
       const [imagesFiles, setImagesFiles] = useState<File[]>([]);
       const [keywordInput, setKeywordInput] = useState("");
        const [item, setItem] = useState({
        name : "",
        description : "",
        stock : 0,
        rate : 3,
        category : "Men",
        price : 0,
        disprice : 0,
        keyWords : [],
        brand : "",
        type : "Analog",
        recommendationScore : 0,

    });
    
       const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    
          const {name, value, type} = e.target;
    
          setItem({
             ...item!,
             [name] : type === "number" ? Number(value) : value
          });
    
       }
    
       const submitForm =  async(e : React.FormEvent<HTMLFormElement>) => {
    
          e.preventDefault();
           
          if(!item?.name || !item?.description || !item?.category || !item?.type || !item?.brand || item?.price === undefined || item?.disprice === undefined || item?.stock === undefined || item?.rate === undefined || item?.recommendationScore === undefined){
             return;
          }
    
          const formData = new FormData();
    
          formData.append("name", item.name);
          formData.append("description", item.description);
          formData.append("category", item.category);
          formData.append("type", item.type);
          formData.append("brand", item.brand);
          formData.append("price", String(item.price))
          formData.append("disprice", String(item.disprice));
          formData.append("recommendationScore", String(item.recommendationScore));
          formData.append("stock", String(item.stock));
          formData.append("rate", String(item.rate));
          formData.append("keyWords", JSON.stringify(item.keyWords));
    
          imagesFiles.forEach((file) => {
                formData.append("images", file); // "images" doit être le même nom que celui attendu par ton backend (Multer par ex)
                });
    
          await addItem(formData);
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
                      value={item?.name}
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
                      value={item?.description}
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
                      value={item?.category}
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
                   
                      value={item?.type}
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
                      value={item?.price}
                      required
                      />
                    </div>
    
                    <div className="flex flex-row w-full gap-2 items-center justify-between">
                      <p className="text-[15px] font-[600]">Stock: </p>
                      <input type="number"
                      name="stock"
                      className="w-[250px] max-[450px]:w-[200px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px]"
                      min={0}
                      value={item?.stock}
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
                      value={item?.rate}
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
                      value={item?.disprice}
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
                      value={item?.recommendationScore}
                      required
                      />
                    </div>
    
                    <div className="flex flex-row w-full gap-2 items-center justify-between">
                      <p className="text-[15px] font-[600]">Brand: </p>
                      <input type="text"
                      value={item?.brand}
                      name="brand"
                      onChange={handleChange}
                      className="w-[250px] max-[450px]:w-[200px] bg-gray-100 border border-gray-300 px-3 py-1 text-[14px] rounded-[5px]"
                      required
                      />
                    </div>
    
                      <div className="flex flex-row items-center gap-2">
                    <p>KeyWord:</p>
                    <input 
                        type="text"
                        value={keywordInput}
                        onChange={(e)=>setKeywordInput(e.target.value)}
                        name="keyWord"
                         className="w-[300px] bg-gray-100 px-2 py-1 border border-gray-300 rounded-lg max-[750px]:w-[220px] max-[450px]:w-[150px] max-[450px]:text-[0.8em]"
                       
                        />

                        <button 
                        type="button"
                        onClick={()=>{
                            if(keywordInput.trim()){
                                setItem({
                                    ...item!,
                                    keyWords : [...(item?.keyWords || []), keywordInput]
                                });
                                setKeywordInput("");
                            }
                        }}
                        className="px-2 py-1 bg-blue-900 text-white font-bold rounded-xl cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                        >Add</button>
                  </div>

                  <div className="flex gap-2 flex-col mt-2">
                        {item.keyWords.map((kw, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-200 rounded-full text-sm flex items-center gap-1">
                            {kw}
                            <button 
                                type="button" 
                                onClick={() => setItem({...item, keyWords: item.keyWords.filter((_, i) => i !== idx)})}
                                className="text-red-600 font-bold"
                            >
                                ×
                            </button>
                            </span>
                        ))}
                        </div>
                                 <div className="flex flex-col justify-center items-center">
      <p className="font-bold text-[1.5em] text-blue-900">Images</p>

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
        required
      />
      <p className="text-gray-600 text-[15px] text-center mt-3">Tap on the image if you want to remove it</p>

      {imagesFiles.length > 0 && (
        <div className="flex gap-0 mt-5 flex-col justify-center">
          {imagesFiles.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt={`preview-${idx}`}
              onClick={()=>{
                setImagesFiles(prev => prev.filter((_,i)=> i !== idx))
              }}
              className="w-[150px] h-[150px] object-contain"
            />
          ))}
        </div>
      )}
    </div>
    
                    <button 
                    type="submit"
                    disabled={loadingAdd}
                    className="bg-amber-500 py-2 mb-5 mt-5 text-white cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 rounded-[5px] font-bold">{loadingAdd ? "Adding..." : "+ Add"}</button>
               </form>
    
               </div>
         )
}

export default memo(AddItemPop);