
import { useParams } from "react-router";
import { useFetechProductByIdQuery } from "../../redux/api/productApiSlice.js";
import ProductImagePreview from "../../components/ProductImagePreview.jsx";
import AdminMenu from "./AdminMenu.jsx";

import { MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useUpdateProductMutation } from "../../redux/api/productApiSlice.js";
import ProductUpdateCompo from "../../components/updateProducts.jsx";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApiSlice.js";
import { toast } from "react-toastify";
import moment from 'moment';

import { useDeleteProductMutation } from "../../redux/api/productApiSlice.js";

import { useNavigate } from "react-router";
import RatingStar from "../../components/Rattingstar.jsx";
const UpdateProduct = () => {

  const{data:categoryList,isLoading:categoryListLaoding}=useGetAllCategoryQuery()
   const navigate=useNavigate();

  const [editingField,setEditngField]=useState(null)
   const [name,setName]=useState("")
   const [category,setCategory]=useState("")
   const [brand,setBrand]=useState("")
   const [description,setDescription]=useState("")
   const [stock,setStock]=useState(0)
   const [price,setPrice]=useState(0)
   const [quantity,setQuantity]=useState(0)
   

  const { id } = useParams();   // fetech the id from the url 

  const {
    data: productDetail,
    isLoading,
    error,
    isSuccess,
  } = useFetechProductByIdQuery(id);
  const product = productDetail?.data;
     
  const formattedDate = moment(product?.createdAt).format('MMMM Do YYYY');

  const [updateProduct ,{isLoading:updateProductLoading}]=useUpdateProductMutation()
   const [deleteProduct,{isLoading:deleteProductLoading}]=useDeleteProductMutation();


  const updateProductHandler=async(fieldValue,productId,fieldName)=>{
    if(!fieldValue || !productId){
      toast.error("field cannot be empty!!!");
     
    }
    if(product?.[fieldName]===fieldValue){
      toast.error(" Same Value cannot be update!!!");  // for category left validation
      return;
    }

     console.log("field::",{[fieldName]:fieldValue})
      console.log("productId::",productId)
    try {
         const res= await updateProduct({id:productId,data:{[fieldName]:fieldValue}}).unwrap()
         console.log("Updated Product::",res)
         toast.success("Updated successfully")

    } catch (error) {
      console.log("ERR::",error?.data?.message)
      toast.error("Something went wrong")
    }
  }

  const deleteProductHandler=async()=>{
    try {
      const res=await deleteProduct(id)
      console.log("deleted Product::",res)
      toast.success("Product deleted Successfully ")
      navigate("/admin/productslist")

    } catch (error) {
       console.log("ERR::",error?.data?.message)
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <AdminMenu />
      <div className="w-full px-6 md:px-12 lg:px-20 mt-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center lg:text-left ">
         Product Details
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Image Preview */}
          <div className="w-full lg:w-1/2">
            {isSuccess && <ProductImagePreview images={product?.image} />}
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="text-lg">
              <span className="block text-gray-500">Name</span>
               
               {/* updateProduct component render */}
               <ProductUpdateCompo 
                 value={name}
                 setValue={setName}
                 editingField={editingField}
                 setEditngField={setEditngField}
                 fieldName="name"
                 updateProductHandler={updateProductHandler}
                  data={product?.name}
                  id={product?._id} 
               />
                    
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="text-lg  ">
                <span className="block text-gray-500">Brand</span>
                  
                <ProductUpdateCompo 
                 value={brand}
                 setValue={setBrand}
                 editingField={editingField}
                 setEditngField={setEditngField}
                 fieldName="brand"
                 updateProductHandler={updateProductHandler}
                  data={product?.brand}
                  id={product?._id} 
               />
              </div>


              <div className="text-lg  ">
                <span className="block text-gray-500 ">Category</span>
               {
                editingField==="category"?
                (   <div className="flex gap-2">

                
                  <select
             value={category}
             onChange={(e)=>setCategory(e.target.value)}
             className="text-[1.1rem]  p-2 h-[3rem] rounded-md bg-gray-800 border border-gray-400 w-full md:w-full
         focus:outline-none focus:ring-2  focus:ring-blue-500"
             > 

             
                 {
                   !categoryListLaoding && 
                   categoryList?.data?.map((value)=>(
                   <option value={value._id} key={value._id}> {value.name}
                   </option>
                ))
                 }
             </select>
             <button
                          className="px-3 bg-blue-700 rounded-lg hover:bg-blue-800"
                          onClick={()=>{
                            updateProductHandler(category,product?._id,"category")
                            setEditngField(null)

                          }}
                           >
                            <FaLongArrowAltRight />
                            </button>
             </div>
               
                ):
                (
                  <div className="flex gap-5 items-center">

                 <span className="text-2xl font-semibold mr-1">{product?.category?.name}</span>
                 <button
                  onClick={()=>{ setEditngField("category")
                
                 }}
                 >    <MdOutlineEdit/>    </button> 
              </div>
                )
               }
             


              </div>
            </div>

            <div className="flex items-center justify-between w-full ">

              <div className="text-lg">
                <span className="block text-gray-500">Price</span>
                <ProductUpdateCompo 
                 value={price}
                 setValue={setPrice}
                 editingField={editingField}
                 setEditngField={setEditngField}
                 fieldName="price"
                 updateProductHandler={updateProductHandler}
                  data={product?.price}
                  id={product?._id} 
               />

              </div>

              <div className="text-lg pr-15 ">
                <span className="block text-gray-500">Reviews</span>
                    <span className="text-2xl font-semibold mr-1">{product?.numReviews}</span>
              </div>

            </div>

           <div className="flex items-center justify-between gap-4">
              <div className="text-lg">
                <span className="block text-gray-500">Quantity</span>
                <ProductUpdateCompo 
                 value={quantity}
                 setValue={setQuantity}
                 editingField={editingField}
                 setEditngField={setEditngField}
                 fieldName="quantity"
                 updateProductHandler={updateProductHandler}
                  data={product?.quantity}
                  id={product?._id} 
               />
              </div>
              <div className="text-lg pr-5 ">
                <span className="block text-gray-500">Rating</span>
                < RatingStar rating={product?.rating}/>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="text-lg">
                <span className="block text-gray-500">Stock</span>
                <ProductUpdateCompo 
                 value={stock}
                 setValue={setStock}
                 editingField={editingField}
                 setEditngField={setEditngField}
                 fieldName="countInStock"
                 updateProductHandler={updateProductHandler}
                  data={product?.countInStock}
                  id={product?._id} 
               />
              </div>
              <div className="text-lg pr-2 ">
                <span className="block text-gray-500">Added</span>
                <span className="block text-gray-100 font-semibold">{formattedDate}</span>
              </div>
            </div>

            <div className="text-lg">
              <span className="block text-gray-500">Description</span>
              <ProductUpdateCompo 
                 value={description}
                 setValue={setDescription}
                 editingField={editingField}
                 setEditngField={setEditngField}
                 fieldName="description"
                 updateProductHandler={updateProductHandler}
                  data={product?.description}
                  id={product?._id} 
               />

            </div>

            <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition-all w-full sm:w-auto"
            onClick={deleteProductHandler}>
             { deleteProductLoading?"Deleting...." :"Delete Product"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;






// test code


// const UpdateProduct=()=>{
//     // useParams is hook use for the searching the id
//       const {id}=useParams()
//       console.log(id)
//       const {data:productDetail,isLoading,error,isSuccess}=useFetechProductByIdQuery(id)
//       console.log("Product Details::",productDetail?.data)
//       const product=productDetail?.data

//     return(
//         <>
//         <AdminMenu/>
        
//         <div className=" w-full min-h-screen mt-20 pl-15">
//            <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold">Product Details</h1>
//           <div className="flex flex-col-reverse  lg:flex-row justify-around min-w-full min-h-screen mt-6 ">
               
//               <div  className=" flex-1/2 flex-col pr-5">

//                 <h1 className="text-xl">
//                     <span className="text-gray-300">
//                         Name :
//                         </span>
//                         <span className="text-2xl pl-2 font-semibold">
//                      {productDetail?.data?.name}
//                         </span>
//                     </h1>


//                      <h1 className="text-xl flex flex-col md:flex-row justify-between">
//                         <div>
//                          <span className="text-gray-300">
//                         Brand :
//                         </span>
//                         <span className="text-2xl pl-2 font-semibold">
//                      {productDetail?.data?.brand}
//                         </span>

//                         </div>

//                         <div className="pr-15">
//                              <span className="text-gray-300">
//                         Category :
//                         </span>
//                         <span className="text-2xl pl-2 font-semibold">
//                      {productDetail?.data?.category?.name}
//                         </span>
//                         </div>
//                     </h1>
                 
//                   <p className="text-xl flex flex-col md:flex-row justify-between">
//                         <div>
//                          <span className="text-gray-300">
//                         Price :
//                         </span>
//                         <span className="text-2xl pl-2 font-semibold">
//                      ₹{productDetail?.data?.price}
//                         </span>

//                         </div>

//                         <div className="pr-15">
//                              <span className="text-gray-300">
//                         Stock :
//                         </span>
//                         <span className="text-2xl pl-2 font-semibold">
//                      {productDetail?.data?.countInStock}
//                         </span>
//                         </div>
//                     </p>

//                    <p className="text-xl flex flex-col md:flex-row justify-between">
//                         <div>
//                          <span className="text-gray-300">
//                         Qunatity :
//                         </span>
//                         <span className="text-2xl pl-2 font-semibold">
//                      {productDetail?.data?.quantity}
//                         </span>

//                         </div>

//                         <div className="pr-15">
//                              <span className="text-gray-300">
//                         Reviews :
//                         </span>
//                         <span className="text-2xl pl-2 font-semibold">
//                      {productDetail?.data?.numReviews}
//                         </span>
//                         </div>
//                     </p> 

//                   <p className="text-xl flex flex-col md:flex-row justify-between">
//                         <div>
//                          <span className="text-gray-300">
//                         Rating :
//                         </span>
//                         <span className="text-2xl pl-2 font-semibold">
//                      ₹{productDetail?.data?.price}
//                         </span>

//                         </div>

//                         <div className="pr-15">
//                              <span className="text-gray-300">
//                         Created :
//                         </span>
//                         <span className="text-2xl pl-2 font-semibold">
//                      moment({productDetail?.data?.createdAt})
//                         </span>
//                         </div>
//                     </p>

                        

                    

//               </div>


//             <div className=" p-2 ">
//               { isSuccess &&(
//                 <ProductImagePreview 
//                    images={productDetail?.data?.image}/>
//               )}
//             </div>
          

//           </div>


//         </div>
       
//         </>
//     )

// }

// export  default UpdateProduct;
