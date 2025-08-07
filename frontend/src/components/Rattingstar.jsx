import { FaStar,FaRegStar } from "react-icons/fa";
const RatingStar=({rating})=>{
 const filledStars = Math.floor(rating);
               const totalStars = 5;
    return(
              
     <div className="flex items-center space-x-1">
                  {[...Array(totalStars)].map((_, index) =>
                     index < filledStars ? (
                       <FaStar key={index} className="text-[#EFBF04]" />
                     ) : (
                       <FaRegStar key={index} className="text-gray-300" />
                     )
                   )}
                 </div>
               );
 }

 export default RatingStar;