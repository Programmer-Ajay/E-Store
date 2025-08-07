 //Add the favourite product to the local storage
 // we will add remove and set the product

 export const addTofavouriteLocalStorage=(product)=>{
    // first check if the product is present or not
    const favourites= getfavouriteFromLocalStorage()

       // now check the productr is available in this favourite list or not
       if(!favourites.some((p)=>p._id===product._id)){
        // add the item
        favourites.push(product)

        localStorage.setItem("favourites",JSON.stringify(favourites))
       }
 }

export const removeFavouriteFromLocalStorage=(productId)=>{
    const favourites=getfavouriteFromLocalStorage()
    const updateFavourites=favourites.filter((p)=>p._id!==productId);
    localStorage.setItem("favourites",JSON.stringify(updateFavourites));
}




  export const getfavouriteFromLocalStorage=()=>{
    const favouriteJSON=localStorage.getItem("favourites");
    return favouriteJSON? JSON.parse(favouriteJSON):[];
 }