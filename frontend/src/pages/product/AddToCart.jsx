import { IoCartOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import {
    useAddToCartMutation,
    useRemoveFromCartMutation
} from "../../redux/api/usersApiSlice.js"
import { useDispatch, useSelector } from "react-redux";
import { setCart , removeToCart , addToCart}  from "../../redux/features/cart/cartSlice.js"
import { useNavigate } from "react-router";
const AddToCartButton=({className ,product})=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [AddToCart]= useAddToCartMutation()
    const {userInfo}= useSelector(state=>state.auth)
    const cart= useSelector(state=>state.cart)
    console.log("redux store of cart::",cart)

    const addToCartFun=async(productId)=>{
        // console.log("ProductId CART,",productId);

        try {
             const res =await AddToCart(productId).unwrap()

               dispatch(addToCart(res?.data?.updatedAddToCart))

             console.log("Added to cart ::",res?.data?.updatedAddToCart)
             console.log("redux store of cart::",cart)
            //  setCart(res?.data?.cart);
             toast.success("product added to cart")
        } catch (error) {
            console.log(error?.data?.message)
    toast.error(error?.data?.message || error?.message)
        }
    }

    return(

         <button className={className}
           onClick={(e)=>{
               e.stopPropagation()
               e.preventDefault()
               addToCartFun(product._id)
           }}>
                <span>Add to Cart</span>
                  <IoCartOutline size={30} />
                </button>
    )
}


export default AddToCartButton;