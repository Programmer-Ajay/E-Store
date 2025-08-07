 import { Outlet } from "react-router"
 import { ToastContainer,toast } from "react-toastify"
 import "react-toastify/dist/ReactToastify.css";
 import Navigation from "./pages/Auth/Navigation.jsx";

 import { useProfileQuery } from "./redux/api/usersApiSlice.js";
 import { useDispatch } from "react-redux";
 import { setCredentials,logout  } from "./redux/features/auth/authSlice.js";
 import { setFavourites ,clearFavourite} from "./redux/features/favourite/favouriteSlice.js";
 import { setCart } from "./redux/features/cart/cartSlice.js";
 import { useEffect } from "react";
 import Loader from "./components/Loader.jsx";
function App() {
  
  const dispatch=useDispatch()
   const {data,
         isSuccess,
         isLoading,
         isError,
         error
        }=useProfileQuery();
  //  console.log("Data::-",data)
  //  console.log("Error:",error)

    useEffect(()=>{
      if(isSuccess && data){
        dispatch(setCredentials(data?.data?.user))

        dispatch(setFavourites(data?.data?.user?.FavouriteProducts))
        //load the cart item
        dispatch(setCart(data?.data?.user?.addToCart))
      }
     
        if (error) {
    dispatch(logout());
    dispatch(clearFavourite())
     toast.error("please re login ") // optional fallback
  }
    },[isSuccess,dispatch,data,])

    
     if(isLoading){
         return( <div className="w-full h-screen flex justify-center items-center">
              <Loader />
         </div> );
      }
  return (
    <>
    <ToastContainer />
    <Outlet />
    </>
  )
}

const MainLayout=()=>{

  return (
    <>
    <Navigation />
    <main>
      <Outlet />
    </main>
    </>
  )
}
export { App, MainLayout }