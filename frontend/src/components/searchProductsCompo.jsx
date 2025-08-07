
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaStar,FaRegStar } from "react-icons/fa";
import HeartIcon from "../pages/product/HeartIcon";
import IMG from "../utils/imageOptimized.jsx"
  import AddToCartButton from "../pages/product/AddToCart.jsx";  
const sliderSettings = (imageLen)=>({
  dots: false,
  infinite: imageLen>1,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: imageLen>1,
  autoplay: imageLen>1,
  autoplaySpeed: 2000+Math.floor(Math.random()*2000),   // delay time is bettween 2-4 s
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
});


// rating  star  logic
const RenderStar=({rating})=>{
   const totalStar=5;
   const filledStars= Math.floor(rating)
    return (
      <div className="flex items-center space-x-1">
        {[...Array(totalStar)].map((_, index) =>
          index < filledStars ? (
            <FaStar key={index} className="text-[#EFBF04]" />
          ) : (
            <FaRegStar key={index} className="text-gray-300" />
          )
        )}
      </div>
    );

}

// Custom arrow components
function CustomPrevArrow({onClick}) {
  
  return (
    <div
      className="absolute top-1/2  left-4 transform -translate-y-1/2  z-10 bg-gray-400 bg-opacity-40 rounded-full p-2 cursor-pointer"
      onClick={onClick}
    >

      <FaArrowLeft  size={10}
      className="text-white" />
    </div>
  );
}


function CustomNextArrow({onClick}) {
  
  return (
    <div
      className="absolute top-1/2  right-4 transform -translate-y-1/2 z-10 bg-gray-400 bg-opacity-40 rounded-full p-2 cursor-pointer"
      onClick={onClick}
    >
      <FaArrowRight size={10} className="text-white" />
    </div>
  );
}




const SearchedProductCard = ({ product}) => {
 
  const{
     name,
     price,
     rating,
     quantity,
     brand,
     image
  }=product
    // console.log("imagees::",image)
    // console.log("stock::",quantity)
    // console.log("product::",product)
  return (
  
  <div className="relative w-full max-w-[19rem]  mx-auto border-2 border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all group">

      {/* Image slider */}

      

     <div className="relative w-full min-w-[19rem] max-w-[19rem] mx-auto  rounded-lg shadow-md">

  {image?.length > 1 ? (
    <Slider {...sliderSettings(image.length)}>
      {image.map((img, index) => (
        <div key={index}>
          <IMG
           imageUrl={img}
           classStyling="w-full h-52 sm:h-60 md:h-64 object-cover"
             alt={`image+${index}`}
             />
        </div>
      ))}
    </Slider>
  ) : (
   
             <IMG
              imageUrl={image?.length > 0 ? image[0]:""}
              classStyling="w-full h-52 sm:h-60 md:h-64 object-cover"
             alt="single image"      
             />

  )}
</div>



      {/* Product Infomation */}
      <div className="px-4 py-2 flex flex-col justify-between space-y-1">

         <div className="flex justify-between items-center">
 <h1 className="text-lg sm:text-xl md:text-[22px] font-semibold">
          {name}
        </h1>
        {/* heart icons */}
        <div onClick={(e)=>{
              // stop the proporgating
              e.stopPropagation()
              e.preventDefault()
        }}>
        <HeartIcon product={product}/>              
        </div>
          
         </div>
       

        <div className="flex justify-between text-base sm:text-lg font-semibold">
         <p className="font-light">{brand}</p>
          <RenderStar rating={rating}/>
</div>
        

        <div className="flex justify-between text-base sm:text-lg font-semibold">
          <p>₹{price}</p>
           
           <div className={`${quantity > 10 ?"text-green-500" : "text-red-500"}  text-sm font-light`}>
            <span>{quantity< 10 ? `only ${quantity} is left!!` :  `${quantity} qty available` }</span>
          
           </div>
          
        </div>
                
              < AddToCartButton 
              className="bg-blue-500 hover:bg-blue-600 text-white text-base sm:text-lg py-1 rounded-lg  transition-all flex items-center justify-center font-semibold "
              product={product}
              />
          
         

        {/* <button className="bg-blue-500 hover:bg-blue-600 text-white text-base sm:text-lg py-1 rounded-lg  transition-all flex items-center justify-center font-semibold ">
        <span>Add to Cart</span>
          <IoCartOutline size={30} />
        </button> */}
      </div>
    </div>
  );
};

export default SearchedProductCard;