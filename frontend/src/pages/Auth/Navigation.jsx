import {Link} from "react-router"
import { useState } from "react";
import {AiOutlineShopping,AiOutlineShoppingCart,AiOutlineHome, AiOutlineLogin,AiOutlineUserAdd, }  from "react-icons/ai";
import { FaHeart ,FaUserCircle,FaTimes, FaRegHeart} from "react-icons/fa";
import { clearFavourite } from "../../redux/features/favourite/favouriteSlice.js";

import { useSelector } from "react-redux";

import { useLogoutMutation } from "../../redux/api/usersApiSlice.js";
import { logout } from "../../redux/features/auth/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import FavouriteCount from "../product/favouriteCount.jsx";
import CartItemCount from "../product/CartItemCount.jsx";
import {clearCart} from "../../redux/features/cart/cartSlice.js"

const Navigation=()=>{
  const{userInfo}=useSelector((state)=>state.auth)
  const [showUserMenu, setShowUserMenu] = useState(false);
    
const dispatch=useDispatch()
const navigate=useNavigate()
 const [logoutApiCall]=useLogoutMutation()
  // console.log( "uselogout ",useLogoutMutation())


 
 
 const logoutHandler=async()=>{
    await logoutApiCall().unwrap()
    dispatch(logout())
    dispatch(clearFavourite())
    dispatch(clearCart())
    navigate("/login")
 }
    return (
       
        <header className="fixed top-0 w-full bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 bordor-b border-emerald-800  h-[3.8rem]">

            <div className='container mx-auto px-4 py-3'>
                <div className='flex flex-wrap justify-between items-center'>

                   <Link to="/" className='text-2xl font-bold text-white-900 items-center space-x-2 flex'>
                    E-Store
                   </Link>

                   <nav  className="flex flex-wrap items-center gap-[3.5rem] mr-[5rem]">


                    
<Link to="/"
                     className="group relative flex flex-col items-center text-gray-200 hover:text-white transition duration-300 ease-in-out">
  <AiOutlineHome size={27} />
  <span className="absolute mt-6 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    Home
  </span>
</Link>

                    <Link to="/shop"
                     className="group relative flex flex-col items-center text-gray-200 hover:text-white transition duration-300 ease-in-out">
                         <AiOutlineShopping  size={27} />
                          <span className="absolute mt-6 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    Shop
  </span>
                   </Link>
                  
                   <Link to="/cart"
  className="group relative flex flex-col items-center text-gray-200 hover:text-white transition duration-300 ease-in-out">
  
  <AiOutlineShoppingCart size={27} />

  {/* Label */}
  <span className="absolute mt-6 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    Cart
  </span>

    {/* Cart Badge */}
       < CartItemCount />
      </Link>

                   <Link to="/favourite"
                     className="group relative flex flex-col items-center text-gray-200 hover:text-white transition duration-300 ease-in-out">
                         <FaRegHeart  size={27} />
                          <span className="absolute mt-6 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    Favourite
  </span>
    <FavouriteCount/>
                   </Link>


{!userInfo ? (
  <>
    <Link to="/login"
      className="group relative flex flex-col items-center text-gray-200 hover:text-white transition duration-300 ease-in-out">
      <AiOutlineLogin size={27} />
      <span className="absolute mt-6 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Login
      </span>
    </Link>

    <Link to="/register"
      className="group relative flex flex-col items-center text-gray-200 hover:text-white transition duration-300 ease-in-out">
      <AiOutlineUserAdd size={27} />
      <span className="absolute mt-6 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        SignUp
      </span>
    </Link>
  </>
) : (
  <>
    <button
      onClick={() => setShowUserMenu(!showUserMenu)}
      className="group relative flex flex-col items-center text-gray-200 hover:text-white transition duration-300 ease-in-out"
    >
      <FaUserCircle size={27} />
      <span className="absolute mt-6 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Profile
      </span>
    </button>

    {/* Slide-in User Menu */}
    <div className={`fixed top-0 right-0  h-auto w-60 text-white  z-90 transform transition-transform duration-300 ${
      showUserMenu ? 'translate-x-0' : 'translate-x-full'
    }`}>

      <div className="p-5 flex flex-col space-y-6  bg-my-gradient bg-opacity-90 backdrop-blur-md shadow-2xl">

         <div className="flex justify-between"> 
        <div className="text-lg font-semibold border-b border-gray-700 pb-2">
          Hello {userInfo?.username.toUpperCase()}
        </div>
         <button onClick={() => setShowUserMenu(!showUserMenu)}>
              {/* <MdOutlineCancel  size={27}/> */}
              <FaTimes size={18} />
            </button>

         </div>

         {/* <div className="flex flex-col space-y-4 md:hidden">
      <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
      </div> */}
           {/* if the userInfo is Admin then   */}

          {userInfo.isAdmin && (

            <>
              <div>
              <Link to="admin/dashboard" className="hover:text-cyan-400 transition"
              onClick={()=>setShowUserMenu(false)}>Dashboard</Link>
              </div>

              <div>
              <Link to="admin/productslist" className="hover:text-cyan-400 transition" onClick={()=>setShowUserMenu(false)}>Products</Link>
              </div>
              <div>
              <Link to="admin/category" className="hover:text-cyan-400 transition" onClick={()=>setShowUserMenu(false)}>Category</Link>
              </div>
              <div>
              <Link to="admin/orderslist" className="hover:text-cyan-400 transition" onClick={()=>setShowUserMenu(false)}>Orders</Link>
              </div>
              <div>
              <Link to="admin/userslist" className="hover:text-cyan-400 transition" onClick={()=>setShowUserMenu(false)}>Users</Link>
              </div>
               
            </>
       
          )}
             <div>
              <Link to="/profile" className="hover:text-cyan-400 transition" onClick={()=>setShowUserMenu(false)}>Profile</Link>
              </div>
           <div  className="text-left hover:text-red-400 transition"
           onClick={()=>{logoutHandler()
                         setShowUserMenu(false)
           }}>Logout</div>

        
      </div>

    </div>
  </>
)}
                   </nav>
                </div>
            </div>
        </header>
    )
 }
  export default Navigation





  // extra code for future refrence

   {/* {
                    !user &&(
                        <>
                     <Link to="/login"
  className="group relative flex flex-col items-center text-gray-200 hover:text-white transition duration-300 ease-in-out">
  <AiOutlineLogin size={27} />
  <span className="absolute mt-6 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    Login
  </span>
</Link>

 <Link to="/register"
  className="group relative flex flex-col items-center text-gray-200 hover:text-white transition duration-300 ease-in-out">
  <AiOutlineUserAdd size={27} />
  <span className="absolute mt-6 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    SignUp
  </span>
</Link>
</>
 

                    )
                  } */}
