 import { useSelector } from "react-redux";

 
 const CartItemCount=()=>{
   const cartItem= useSelector(state=>state.cart)
   console.log("cartItem:: count",cartItem)
  const cartCount=cartItem?.length
  return ( 
  <>
  {cartCount > 0 && (
      <span className="absolute -top-1 -right-2 px-1 py-0 text-xs text-white bg-blue-800 rounded-full ">
        {cartCount}
      </span>
  )}
  </>

  )
 }

 export default CartItemCount;