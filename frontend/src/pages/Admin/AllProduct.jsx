import AdminMenu from "./AdminMenu.jsx";
import ProductCard from "../../components/productcard.jsx";
import { useGetAllProductsQuery } from "../../redux/api/productApiSlice.js";
import { Link } from "react-router";
import Loader from "../../components/Loader.jsx";
const AllProduct=()=>{

    const {data:products,isLoading,error}=useGetAllProductsQuery()

    console.log("All products::",products?.data);   //  we are get the prodcuts

return(
<>
   <AdminMenu/>
     
      {isLoading && (
       <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center">
         <Loader />
       </div>
     )}
     
   <div className="mt-20 w-full min-h-screen  px-8">

  <h1 className="text-3xl font-semibold">All Products ({!isLoading ? products?.data.length : "0"})</h1>
      
    

  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
      {
         products?.data.map((product)=>(
            <div key={product._id}>
               <Link to={`/admin/updateProduct/${product._id}`} >
                 <ProductCard
                 name={product.name}
                 brand={product.brand}
                 price={product.price}
                 images={product.image}
                 stock={product.quantity}
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


export default AllProduct;