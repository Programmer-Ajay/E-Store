import { useSelector } from "react-redux";
import SearchedProductCard from "../../components/searchProductsCompo.jsx";

import { Link } from "react-router";
import { toast } from "react-toastify";

const FavouriteProducts=()=>{
    const AllFavouriteProducts= useSelector((state)=>state.favourites)



    return(
       
       <>
     
      {AllFavouriteProducts<=0 && (
       <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center text-2xl">
         No Favourite product Found
       </div>
     )}
   
   <div className="mt-20 w-full min-h-screen  px-8">

  <h1 className="text-3xl font-semibold"> Favourite Products ({AllFavouriteProducts?.length})</h1>
      
    

  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
      {
         AllFavouriteProducts?.map((product)=>(
            <div key={product._id}>
               <Link to={`/products/${product._id}`} >
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

export default FavouriteProducts;