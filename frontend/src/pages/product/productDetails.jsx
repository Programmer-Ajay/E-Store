import { useFetechProductByIdQuery } from "../../redux/api/productApiSlice";
import { useParams } from "react-router";
import moment from "moment";
import ProductImagePreview from "../../components/ProductImagePreview.jsx";

import { IoCartOutline } from "react-icons/io5";
import ReviewSection from "./ReviewSection.jsx";
import { useCreateReviewMutation } from "../../redux/api/productApiSlice";

import { useSelector } from "react-redux";
import { useState } from "react";
import RatingStar from "../../components/Rattingstar.jsx";
import { toast } from "react-toastify";
import AddToCartButton from "./AddToCart.jsx";

const ProductDetails=()=>{

 const {id}= useParams()
  const {userInfo}=useSelector((state)=>state.auth)

  const[comment,setComment]=useState("")
  const [rating,setRating]=useState(0)
  const [createReview,{isLoading:loadingProductReview}]=useCreateReviewMutation();
   
    const submitHandler=async(e)=>{
      e.preventDefault()

      try {
         await createReview({
           comment,
           rating,
           id}).unwrap()
           toast.success("Review created Successfully");
           setComment("")
           setRating(0)

      } catch (error) {
        console.log("Review Error::",error)
        toast.error(error?.data?.message || error.message
        )

      }
    }
   
 
  const {
      data: productDetail,
      isLoading,
      error,
      isSuccess,
    } = useFetechProductByIdQuery(id);
    const product = productDetail?.data;
       
    const formattedDate = moment(product?.createdAt).format('MMMM Do YYYY');


return (
 <>
      
      <div className="w-full px-6 md:px-12 lg:px-20 mt-20">

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center lg:text-left ">
         Product Details
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Image Preview */}
          <div className="w-full lg:w-1/2">
            {isSuccess && <ProductImagePreview images={product?.image} />}
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="text-lg">
              <span className="block text-gray-500">Name</span>
                <span className="block text-white text-2xl font-semibold">{product?.name}</span>    
            </div>

            <div className="flex items-center justify-between pr-13">
              <div className="text-lg">
                <span className="block text-gray-500">Brand</span>
                  <span className="block text-white font-medium">{product?.brand}</span>
              </div>


              <div className="text-lg">
                <span className="block text-gray-500 ">Category</span>
               <span className="block text-white font-medium">{product?.category?.name}</span>
              </div>
            </div>

            <div className="flex items-center justify-between w-full ">

              <div className="text-lg">
                <span className="block text-gray-500">Price</span>
                <span className="block text-white font-medium">₹{product?.price}</span>

              </div>

              <div className="text-lg pr-15 ">
                <span className="block text-gray-500">Reviews</span>
                    <span className="text-2xl font-semibold mr-1">{product?.numReviews}</span>
              </div>

            </div>

           <div className="flex items-center justify-between gap-4">
              <div className="text-lg">
                <span className="block text-gray-500">Quantity</span>
                 <span className="block text-white font-medium">{product?.quantity}</span>
              </div>
              <div className="text-lg pr-5 ">
                <span className="block text-gray-500">Rating</span>
                <RatingStar rating={product?.rating}/>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              
              <div className="text-lg pr-2 ">
                <span className="block text-gray-500">Added</span>
                <span className="block text-gray-100 font-semibold">{formattedDate}</span>
              </div>
            </div>

            <div className="text-lg">
              <span className="block text-gray-500">Description</span>
                 <span className="block text-gray-100 font-normal">{product?.description}</span>
              
            </div>

            {/* <button className="mt-6  flex  items-center  justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition-all w-full sm:w-[95%] ">
               <span className="inline">Add to Cart</span>
                <IoCartOutline size={27} />
           
            </button> */}
            <AddToCartButton 
            product={product}
            className="mt-6  flex  items-center  justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition-all w-full sm:w-[95%]"/>
          </div>
        </div>
          
          {/* Review Section  */}
        <div className="mt-[3rem] ">
        <ReviewSection
        loadingProductReview={loadingProductReview}
        userInfo={userInfo}
        submitHandler={submitHandler}
        comment={comment}
        setComment={setComment}
        rating={rating}
        setRating={setRating}
        product={product}
        />
      </div>
      </div>

      
    </>
)

}


export default ProductDetails;