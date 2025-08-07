import { useFetchProductsQuery } from "../../redux/api/productApiSlice.js";

import SearchedProductCard from "../../components/searchProductsCompo.jsx";
import Loader from "../../components/Loader.jsx";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const AllSearchedproducts=()=>{
  const navigate=useNavigate();

     const keyword= new URLSearchParams(location.search).get("keyword");
      const {
            data:products,
            isLoading,
            error
    
        }=useFetchProductsQuery({keyword,});
        console.log("SEARCHED PRODUCTS::",products?.data)
        
      //   //if the product remanins is zero you will be redirect to home
      //   if(products?.data.length<=0){
      //    setTimeout(()=>navigate("/"),100)
      //   }

    return(
       
       <>
     
      {isLoading && (
       <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center">
         <Loader />
       </div>
     )}
     {
      products?.data.length<=0 &&(
          <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center">
         No Products found
       </div>
      )
     }
     {
        error &&(
            toast.error(error)
        )
     }
   <div className="mt-20 w-full min-h-screen  px-8">

  <h1 className="text-3xl font-semibold"> Searched Products ({!isLoading ? products?.data.length : "0"})</h1>
      
    

  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
      {
         products?.data.map((product)=>(
            <div key={product._id}>
               <Link to={`/products/${product._id}`}>
                 <SearchedProductCard
                 product={product}
                /> 
               </Link>
            </div>
             
         ))
      }
    </div>
     
     
   </div>
</>
    )
}

export default AllSearchedproducts;