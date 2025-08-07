import { FcGoogle } from "react-icons/fc";
import { Link,useLocation,useNavigate } from "react-router";
import Loader from "../../components/Loader.jsx";
import { setFavourites } from "../../redux/features/favourite/favouriteSlice.js";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useLoginMutation,useLoginWithGoogleMutation } from "../../redux/api/usersApiSlice.js";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";

// google login imports
 import {signInWithPopup} from "firebase/auth"
import { auth,provider } from "../../utils/firebase.js";
import { setCart } from "../../redux/features/cart/cartSlice.js";

 const Login=() =>{
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [login,{isLoading}]=useLoginMutation()
  const [loginWithGoogle,{isLoading:googleLoading}]=useLoginWithGoogleMutation()

  
   const {userInfo}=useSelector((state)=>state.auth);
  //  console.log("UserInfo:",userInfo.data.user)

   const {search}=useLocation()
  //  console.log("search::-",search)
   const searchParams = new URLSearchParams(search)
  //  console.log("searchParams:",searchParams)
   
   const redirect =searchParams.get("redirect") || "/"
// console.log("redirect:-",redirect)

   useEffect(()=>{
    if(userInfo){
      navigate(redirect);
    }

   },[navigate,redirect,userInfo])

   const submitHandler = async(e)=>{
    e.preventDefault()
    try {
      const res=await login({email,password}).unwrap();
      console.log("res::->",res)
      dispatch(setCredentials({...res?.data?.user}));
      // load the favourite 
      dispatch(setFavourites(res?.data?.user?.FavouriteProducts))
      dispatch(setCart(res?.data?.user?.addToCart))

      // console.log("redirect ki value",redirect)
      navigate(redirect);
      toast.success("user logged in successfully")

    } catch (err) {
toast.error(err?.data?.message || err.error);
    }

    }


    const googleLoginHandler=async()=>{
      try {
         const res= await signInWithPopup(auth,provider)
        //  console.log("res::",res)
          const username=res?.user?.displayName
           const email=res?.user?.email

           const response= await loginWithGoogle({email,username}).unwrap()
           console.log("response:",response)  // we get the proper response
           dispatch(setCredentials({...response?.data}))
           navigate(redirect)
      toast.success("user logged in successfully")
         
      
      } catch (error) {
        console.log("Error::",error)
      }
    }
   
  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center ">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 hover:bg-teal-400 text-white font-medium py-2 rounded-md transition"
          >
            {isLoading ? "Login...":"Login"}
          </button>
          {isLoading && <Loader />}
        </form>

        {/* Signup Message */}
        <p className="text-sm text-gray-300 mt-4 text-center">
          Don't have an account?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}`:"/register"}  className="text-cyan-400 hover:underline">
            SignUp
          </Link>
        </p>

        {/* OR Separator */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-600" />
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        {/* Google Sign-in */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
        disabled={googleLoading}
        onClick={googleLoginHandler}>
          <FcGoogle size={22} />
          SignIn with Google
        </button>
        {googleLoading && <Loader/>}
      </div>
    </div>
  );
}


export default Login