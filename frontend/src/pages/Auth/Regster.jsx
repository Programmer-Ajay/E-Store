import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { auth,provider } from "../../utils/firebase.js";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";

import { useRegisterMutation,useLoginMutation, useLoginWithGoogleMutation } from "../../redux/api/usersApiSlice.js";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router";
import { setCredentials } from "../../redux/features/auth/authSlice.js";

import Loader from "../../components/Loader.jsx";
const Register=() =>{

  const [username,setUsername]=useState("")
  const [email ,setEmail]=useState("")
  const [password ,setPassword]=useState("")
  const [confirmPassword ,setConfirmPassword]=useState("")
    
  // redux store
  const {userInfo}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()

  const [register,{isLoading}]=useRegisterMutation()
  const[loginWithGoogle]=useLoginWithGoogleMutation()

   const navigate=useNavigate()
 
   const {search}=useLocation()
   const searchParams=new URLSearchParams(search)

   const redirect= searchParams.get("redirect") || "/"

   useEffect(()=>{
       if(userInfo){
        navigate("/")
       }
   },[navigate,redirect,userInfo])




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


const submitHandler= async(e)=>{
  e.preventDefault();
        
  if(password!==confirmPassword){
    toast.error("Password do not match")
  }
  else{
    
  try {

    const res=await register({username,email,password}).unwrap()
  console.log("res:",res.data)

  dispatch(setCredentials({...res?.data}))
  navigate(redirect)
  toast.success("user registered successfully")

  } catch (error) {
    console.log(error);
    toast.error(error?.data?.message)
  }
  
  }
}
  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center ">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={submitHandler} className="space-y-4">
             <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <input
            type="password"
            placeholder=" confirm Password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
          />

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-400 text-white font-medium py-2 rounded-md transition"
          >
            {isLoading ?"Registering...": "SignUp"}
          </button>
          {isLoading && <Loader />}
        </form>

        {/* Signup Message */}
        <p className="text-sm text-gray-300 mt-4 text-center">
          Already have  an account?{" "}
          <Link to={redirect?`/login?redirect=${redirect}`:'/login'} className="text-cyan-400 hover:underline">
            Login
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
        onClick={googleLoginHandler}>
          <FcGoogle size={22} />
          SignUp with Google
        </button>
      </div>
    </div>
  );
}


export default Register