import AdminMenu from "./AdminMenu.jsx";
import { useState,useRef } from "react";
import { toast } from "react-toastify";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApiSlice.js";
import { FaTimes } from "react-icons/fa";
import { useCreateProductMutation } from "../../redux/api/productApiSlice.js";
import { useNavigate } from "react-router";
import Loader from "../../components/Loader.jsx";
const AddProduct=()=>{

      const{data:category,isLoading,error}=useGetAllCategoryQuery()
      const fileInputRef=useRef(null)
      const navigate=useNavigate()

    const [name,setName]=useState("")
    const [description,setDescription]=useState
    ("")
    const [price,setPrice]=useState("")
    const [qty,setQty]=useState("")
    const [brand,setBrand]= useState("")
    const [caategory,setCaategory]= useState("")
    const [stock,setStock]= useState("")
    const [images,setImages]= useState([])
       
    const [createProduct,{isLoading:productAddedLoading}]=useCreateProductMutation()

    // console.log("category::",category?.data)

 const resetFormFields=()=>{
     setName("")
     setBrand("")
     setCaategory("")
     setDescription("")
     setPrice("")
     setQty("")
     setStock("")
       

 }

    const handlesubmit= async(e)=>{
        e.preventDefault()

        if(!name || !description ||!price ||!category ||images.length===0 || !qty ||!stock || !brand ){
            return toast.error("Please fill field  and chhoose the images")
        }

        const productData= new FormData();

        productData.append("name",name)
        productData.append("description",description)
        productData.append("brand",brand)
        productData.append("quantity",qty)
        productData.append("price",price)
        productData.append("category",caategory)
        productData.append("countInStock",stock)

        // Hey due to this code of line our browser is freeze or hanged up
 // append also images
//    productData.forEach((img)=>{
//     productData.append("iamges",img)
//    })
//      // lets print form data
//      console.log("FormData:",productData)


     images.forEach((img) => {
    productData.append("images", img); 
  });


  // console.log("formData::",productData)
  // Debug
//   for (let [key, value] of productData.entries()) {
//     console.log(`${key}:`, value);

//    }

try {
    const res= await createProduct(productData).unwrap();
    console.log("Res::",res);
    toast.success("Product added successfully")
     
    //reset the form fields
       resetFormFields();
       navigate("/admin/productslist")

    
} catch (error) {
    console.log("ERR:",error?.data?.message)
    toast.error("Product not added.Please try again")
}

    }



const handleImageChange=(e)=>{
    const files=Array.from(e.target.files)

    // prevent the duplicate files
    // const existingImg=images.map((img)=>img.name)
    // const newFiles=files.filter((file)=> !existingImg.includes(file.name))

    // setImages((prev)=>[ ...prev , ...newFiles])

    const newImg=[...images,...files]
    setImages(newImg)

     // Clear input so same image can be re-selected
  if (fileInputRef.current) {
    fileInputRef.current.value = null;
  }
   
}
// Image Remover function
const imageHandlerRemove= (index)=>{
    const updatedImg=images.filter((_,idx)=> idx!== index)
    setImages(updatedImg)
    // _, means i m ignore this it means our actual file

    if(updatedImg.length==0 && fileInputRef.current){
        fileInputRef.current.value=null  // clear input
    }
}


return (
<>
  <AdminMenu/> 


   {productAddedLoading && (
  <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center">
    <Loader />
  </div>
)}  

   <div className="  p-4 mt-20 w-full min-h-screen">

    <h1 className=" font-semibold  text-4xl md:ml-12">Add Product</h1>
     
     <div className=" mt-10 md:px-12  w-full md:w-[75%]">

        <form  onSubmit={handlesubmit}className=" flex flex-col gap-5" encType="multipart/form-data">

          <input type="text" 
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          className="text-[1.1rem]  p-3 h-[3rem] rounded-md bg-gray-800 border border-gray-400
         focus:outline-none focus:ring-2  focus:ring-blue-500"
          placeholder="Enter the name" />
           
            <textarea type="text" 
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            className="text-[1.1rem]  p-4 h-[6rem] rounded-md bg-gray-800 border border-gray-400
         focus:outline-none focus:ring-2  focus:ring-blue-500"
          placeholder="Enter the description" />
          
          <div className="flex  md:flex-row  flex-col gap-3 w-full">
             
           <input type="number" 
           value={price}
           onChange={(e)=>{setPrice(e.target.value)}}
           className="text-[1.1rem]  p-4 w-full  md:w-1/2 h-[3rem] rounded-md bg-gray-800 border border-gray-400
         focus:outline-none focus:ring-2  focus:ring-blue-500"
          placeholder="Enter the price" 
          min={0}/>

             <input type="number" 
             value={qty}
             onChange={(e)=>setQty(e.target.value)}

             className="text-[1.1rem] w-full md:w-1/2 p-4 h-[3rem] rounded-md bg-gray-800 border border-gray-400
         focus:outline-none focus:ring-2  focus:ring-blue-500"
          placeholder="Enter Quantaity"
          min={0} />
          </div>
          
           <div className="flex w-full md:flex-row  flex-col gap-3">
             
           <input type="number"
           value={stock}
           onChange={(e)=>setStock(e.target.value)}
           className="text-[1.1rem]  p-4  w-full md:w-1/2 h-[3rem] rounded-md bg-gray-800 border border-gray-400
         focus:outline-none focus:ring-2  focus:ring-blue-500"
          placeholder="Enter the stock" 
          min={0}/>
             
             <select
             value={caategory}
             onChange={(e)=>setCaategory(e.target.value)}
             className="text-[1.1rem]  p-2 h-[3rem] rounded-md bg-gray-800 border border-gray-400 w-full md:w-1/2
         focus:outline-none focus:ring-2  focus:ring-blue-500"
             > 

             <option   className="bg-gray-800" value="">Select a category </option>
                 {
                   !isLoading && 
                   category?.data?.map((value)=>(
                   <option value={value._id} key={value._id}> {value.name}
                   </option>
                ))
                 }
             </select>

          </div>
           <input type="text"
            value={brand}
            onChange={(e)=>setBrand(e.target.value)}
           className="text-[1.1rem]  p-4 h-[3rem] rounded-md bg-gray-800 border border-gray-400
         focus:outline-none focus:ring-2  focus:ring-blue-500"
          placeholder="Enter the Brand Name" />

          <input type="file" 
          multiple 
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
           className="text-[1.1rem]  p-4 h-[3rem] rounded-md bg-gray-800 border border-gray-400
         focus:outline-none focus:ring-2  focus:ring-blue-500"
             />
            
              {/* {Image shown} */}

              {
                images.length>0 &&(
                    <div className="flex flex-wrap gap-4 mt-0">
                    {images.map((img,index)=>(
                        <div key={index} className="flex flex-col items-center text-sm relative text-white">

                       <button 
                       type="button"
                       className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 rounded-full p-1 text-white z-10"
                       onClick={()=>{imageHandlerRemove(index)}}>

                        <FaTimes size={12}/>
                       </button>
                           <img 
                           src={URL.createObjectURL(img)}
                            alt={`preview-${index}`} 
                            className="h-20 w-20 object-cover rounded-md border border-gray-600"
                          />
                            <p className="w-20 truncate mt-1 text-center">{img.name}</p>
                        </div>
                    ))}
                    </div>
                )
              }
         <button
         type="submit"
         disabled={productAddedLoading}
         className="bg-blue-500
         md:text-xl hover:bg-blue-600 text-white py-3 px-7 rounded-lg  focus:outline-none focus:ring-2 focus:ring-opacity-50 "
         >{productAddedLoading ?"Adding Product...":"Add Product"}</button>
        {
          productAddedLoading &&<Loader/>
        }
        

        </form>
       

     </div>
   </div>
</>
)
}


export default AddProduct;