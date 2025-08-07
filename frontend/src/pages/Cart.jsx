import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import IMG from "../utils/imageOptimized.jsx";
import { useRemoveFromCartMutation } from "../redux/api/usersApiSlice.js";
// import { updateQuantity, removeFromCart } from "../redux/features/cart/cartSlice"; // Adjust path as needed
import { removeToCart } from "../redux/features/cart/cartSlice.js";
import { toast } from "react-toastify";
import { Link } from "react-router";
const Cart = () => {
  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [removeFromCart] =useRemoveFromCartMutation()



  const handleRemove = async(id) => {
      console.log("IDD::",id)
    try {
        const res= await removeFromCart(id);
        console.log(res)
    dispatch(removeToCart(id));
    toast.success("product remove Successfully")
    } catch (error) {
        console.log("Cart ERR::",error?.data?.message)
        toast.error(error?.data?.message || error.message)
    }
     
  };

  const totalPrice = cartItem.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="pt-24 px-18 min-h-screen flex flex-col">
      {/* Header */}
      <h1 className="flex gap-2 items-center text-3xl font-bold mb-6">
        <span>Cart</span>
        <AiOutlineShoppingCart size={32} />
        <span>({cartItem.length})</span>
      </h1>

      {/* Empty Cart */}
      {cartItem.length === 0 ? (
        <h2 className="text-lg font-medium text-gray-500">Your cart is empty</h2>
      ) : (
        <div className="flex-1 overflow-y-auto pb-32 space-y-4">
          {cartItem.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 shadow-lg rounded-lg bg-gray-900"
            >
                <Link to={`/products/${item.product._id}`} className="min-w-[25%]">
                <div className="flex items-start gap-4 ">
                <IMG
                  imageUrl={item.product.image[0]}
                  alt={item.product.name}
                  classStyling="h-24 w-24 object-cover rounded-lg "
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.product.brand}
                  </p>
                  <p className="text-sm text-green-600 mt-1 font-semibold">
                    ₹{item.product.price.toFixed(2)}
                  </p>
                </div>
              </div>
                </Link>
              

              <div className="flex mt-2 sm:mt-0 gap-5">
                <div>
                  <span className="text-gray-500">Qty:</span>
                <span
                  className="w-16  rounded px-2 py-1 text-center focus:outline-none"
                > {item.quantity}</span>
                </div>
              
                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="mt-2 sm:mt-0 font-semibold text-right">
                ₹{(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Total & Pay Section */}
      {cartItem.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full px-18 bg-gray-900 border-t py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row justify-between items-center z-10">
          <h2 className="text-xl font-bold mb-2 sm:mb-0">
            Total: ₹{totalPrice.toFixed(2)}
          </h2>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;










// import { useSelector,useDispatch } from "react-redux"
// import { AiOutlineShoppingCart } from "react-icons/ai"
// const Cart =()=>{
   
//     const cartItem=useSelector(state=>state.cart)
//     console.log(cartItem)


//     return(
//    <>
//     <div className=" max-w-full max-h-screen px-18 mt-20 overflow-y-hidden">
       
//        <h1 className="flex gap-1 items-center ">
//        <span className="text-4xl font-semibold">Cart</span> <AiOutlineShoppingCart size={32}/> <span className="text-4xl font-semibold">({cartItem.length})</span>
//        </h1>
       
//        <div className="mt-3">
//         {
//         cartItem.length===0?(
//             <h2> Your cart is Empty</h2>

//         ):(
//         cartItem?.map((item)=> (
//             <div key={item.product._id} className="flex gap-2 mb-2">
//                 <div>
//                  <img src={item.product.image[0]} alt="" className="h-20 w-20 border rounded-lg overflow-hidden" />
//                 </div>
//                 <div>
//                  { item.product.name}
//                 </div>
//                 <div>
//                     {
//                         item.quantity
//                     }
//                 </div>

//             </div>
//         )
//         ))
//         }
    

    
//        </div>

//     </div>
//     </>
//     )



// }

// export default  Cart;