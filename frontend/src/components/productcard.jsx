
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import IMG from "../utils/imageOptimized";

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


// Custom arrow components
function CustomPrevArrow({onClick}) {
  
  return (
    <div
      className="absolute top-1/2  left-2 transform -translate-y-1/2  z-10 bg-gray-400 bg-opacity-40 rounded-full p-2 cursor-pointer"
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
      className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-gray-400 bg-opacity-40 rounded-full p-2 cursor-pointer"
      onClick={onClick}
    >
      <FaArrowRight size={10} className="text-white" />
    </div>
  );
}


const ProductCard = ({
     name,
     price,
     stock,
     brand,  
     images,
}) => {
  return (

  <div className="relative w-full max-w-[20rem] mx-auto border-2 border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all group">



     

      {/* Image slider */}

      

     <div className="relative w-full min-w-[20rem] max-w-[20rem] mx-auto  rounded-lg shadow-md">

  {images?.length > 1 ? (
    <Slider {...sliderSettings(images.length)}>
      {images.map((img, index) => (
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
   
            <IMG imageUrl={images.length<0? images[0]:""}
             classStyling="w-full h-52 sm:h-60 md:h-64 object-cover"
             alt="singleImg"
            />

  )}
</div>



      {/* Product Infomation */}
      <div className="px-4 py-2 flex flex-col justify-between space-y-1">

        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
          {name}
        </h1>

         <p><span className="text-gray-500 pr-1">Brand :</span>{brand}</p>

        <div className="flex justify-between text-base sm:text-lg font-semibold">
          <p>₹{price}</p>

          <p><span className="text-gray-500 pr-1">Stock :</span>{stock}</p>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white text-base sm:text-lg py-1 rounded-lg  transition-all">
          Update
        </button>
      </div>
    </div>
  );
};

export default ProductCard;





// TRIAL AND TEST CODE


// import  Slider from "react-slick"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const settings={
//     dots:false,
//     infinite:true,
//     speed:400,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 2000,
// };

// const ProductCard=({
//     // name,
//     // images, array
//     // price,
//     // stock,
// })=>{
//     //now see here we make the product card
//     return(
//         <>
//         <div className="w-[35%] h-[24.3rem] border  rounded-lg py-[0.3rem]">
//             <div className="w-[95%] h-[15rem] border-1 mx-auto rounded-lg">
//                 <Slider>
                    
//                 </Slider>
//             </div>

//               <div className="px-5 mt-3  h-1/3 flex flex-col justify-between">
//              <h1 className="md:text-2xl text-xl font-semibold mb-2">product name</h1>
//              <div className="flex justify-between  font-semibold text-xl">
//                 <p>price</p>
//                 <p>stock</p>
//              </div>
             
//                <button className=" bg-red-900 text-xl py-1 rounded-lg">Update </button>
//                 </div>  
             
//         </div>
//         </>
//     )
// }

// export default ProductCard;