 import { useSelector } from "react-redux";

 const FavouriteCount=()=>{
    // we will fetch the data from the redux store

    const favourites=useSelector((state)=>state.favourites)

    // const{userInfo}=useSelector(state=>state.auth)
    // const favcount=userInfo?.FavouriteProducts.length;
     const favcount=favourites?.length
     
    // console.log("favCount::",favcount)
    // console.log("User fav:",userInfo?.FavouriteProducts)
    return(
    <div>
    {
        favcount > 0 && (
            <span className="absolute -top-1 -right-2 px-1 py-0 text-xs text-white bg-pink-700 rounded-full ">
                {favcount}
      </span>
        )
    }
    </div>
        
    )
 }
 export default FavouriteCount;