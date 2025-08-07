import { FaRegHeart,FaHeart } from "react-icons/fa";
 import { useSelector,useDispatch } from "react-redux";
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router";

import { 
    addToFavourite,
    removeFromFavourites,
    setFavourites
 } from "../../redux/features/favourite/favouriteSlice";

 import { useAddToFavMutation,
    useRemoveFromFavMutation } from "../../redux/api/usersApiSlice.js";

//  import {
//      addTofavouriteLocalStorage,
//      getfavouriteFromLocalStorage,
//      removeFavouriteFromLocalStorage

//   } from "../../utils/favouriteLocalStorage";

const HeartIcon=({product})=>{
     const navigate=useNavigate()
   const [addToFav]=useAddToFavMutation()
   const [removeFromFav]=useRemoveFromFavMutation() 

    // console.log("fav products::",product)
    const dispatch=useDispatch()
    const favourites=useSelector((state)=>state.favourites)
    const {userInfo}=useSelector(state=>state.auth)

    const isFavourites=favourites.some((p)=>p._id===product._id)

    const addToFavApiFun=async(id)=>{
 try {
    const res= await addToFav(id)
   //   console.log("Res added:",res?.data)
         //  setFavourites(res?.data)
    toast.success("Added favourite")

 } catch (error) {
    console.log(error?.data.message)
    toast.error(error?.data?.mesage || error?.message)
 }

    }


 const removeFromFavApiFun=async(id)=>{
    console.log("remove Id::",id)
 try {
      const res=await removeFromFav(id)
     console.log("Res:",res)
   //   setFavourites(res?.data)
     toast.success("Remove from favourite")
     

 } catch (error) {
    console.log(error?.data?.message)
    toast.error(error?.data?.mesage || error?.message)
 }

    }


   

    const toggleFavourites=()=>{
      if(userInfo){

      
        if(isFavourites){
           
            dispatch(removeFromFavourites(product))
           
            removeFromFavApiFun(product._id)
        }else{
            dispatch(addToFavourite(product))
            // addTofavouriteLocalStorage(product)
            addToFavApiFun(product._id)
        }
      }
      else{
         toast.error("For add To favourite please login")
         navigate("/login");

      }
    };
    return(
    
        <button
        onClick={toggleFavourites}
        >{ isFavourites ?
        <FaHeart size={25} className="text-red-500"/>
        :<FaRegHeart size={27} />}
        </button>
    )
}
export default HeartIcon