import { useState } from "react"
import Loader from "../../components/Loader.jsx"
import { Link } from "react-router"

const ReviewSection = ({
    loadingProductReview,
    userInfo,
    submitHandler,
    rating,
    comment,
    setRating,
    setComment,
    product
}) => {

    console.log("product review roduct::",product)
    const [activeSection, setActiveSection] = useState(1)
  
    const handleClickSection=(sectionNumber)=>{
        setActiveSection(sectionNumber)
    }

return (  
  <div className="flex flex-col lg:flex-row gap-6 text-gray-200">
    {/* Sidebar Menu */}

    <section className="flex lg:flex-col gap-2 lg:w-1/4 w-full bg-gray-900 p-4 rounded-lg ">
      {[
        { id: 1, label: "Write a Review" },
        { id: 2, label: "All Reviews" },
        { id: 3, label: "Similar Products" }

      ].map((section) => (
        <div
          key={section.id}
          onClick={() => handleClickSection(section.id)}
          className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${
            activeSection === section.id
              ? "bg-blue-600 font-semibold text-white"
              : "hover:bg-gray-700"
          }`}
        >
          {section.label}
        </div>
      ))}
    </section>



    {/* Content Area */}
    <section className="flex-1 bg-gray-900 p-6 rounded-lg">
      {activeSection === 1 && (
        <div>
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <div className="my-4">
                <label htmlFor="rating" className="block text-xl mb-2">
                  Rating
                </label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                  className="p-2 border rounded-lg w-full text-gray-200 bg-[#1B2231] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="1">Okay</option>
                  <option value="2">Decent</option>
                  <option value="3">Great</option>
                  <option value="4">Best</option>
                  <option value="5">Excellent</option>
                </select>
              </div>

              <div className="my-4">
                <label htmlFor="comment" className="block text-xl mb-2">
                  Comment
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="p-2 border rounded-lg w-full text-white bg-[#1B2231] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loadingProductReview}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
              >
                Submit
              </button>
            </form>
          ) : (
            <p className="text-gray-400">
              Please{" "}
              <Link to="/login" className="text-blue-400 underline">
                login
              </Link>{" "}
              to write a review.
            </p>
          )}
        </div>
      )}

      {activeSection === 2 && (
        <div>
          {product?.reviews?.length === 0 ? (
            <p>No Reviews yet.</p>
          ) : (
            product.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1B2231] p-4 rounded-lg mb-2 shadow-md"
              >
                <div className="flex justify-between">
                  <strong className="text-gray-300">{review.name}</strong>
                  <span className="text-sm text-gray-400">
                    {review.createdAt?.substring(0, 10)}
                  </span>
                </div>
                <p className="mt-2 text-gray-200">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      )}

      {activeSection === 3 && (
        <div>
          {/* Placeholder for "Similar Products" section */}
          <p className="text-gray-300">Similar products will be shown here.</p>
        </div>
      )}
    </section>
  </div>
);

}
export default ReviewSection





//another theme  style

//     return (
//         <div className="flex  flex-col md:flow-row mb-10">
//             <section className="mr-[5rem]">

//          <div className={`flex-1 p-4 cursor-pointer text-lg${activeSection === 1 ? "font-bold" : " "
//              }`}
//              onClick={()=>handleClickSection(1)}
//              >
//             Write a Review </div>

//          <div className={`flex-1 p-4 cursor-pointer text-lg${activeSection === 2 ? "font-bold" : ""
//           }`}
//          onClick={()=>handleClickSection(2)} >
//           All Reviews
//          </div>
//          <div className={`flex-1 p-4 cursor-pointer text-lg${activeSection === 3 ? "font-bold" : " "
//            }`}
//          onClick={()=>handleClickSection(3)}
//               >
//                similar Products
//           </div>

//      </section>

//             {/* second part */}
//  <section>
//      {    activeSection === 1 && (
//        <div className="mt-3">
//         {
//       userInfo ? (
//        <form onSubmit={submitHandler}>
//        <div className="my-2">
//          <label htmlFor="rating"            className="block text-xl mb-2">
//           Rating
//        </label>

//       <select 
//        value={rating}
//       onChange={(e)=>setRating(e.target.value)}
//      id="rating"
//        required        
//         className="p-2 border rounded-lg xl:w-[40rem] text-gray-200 bg-gray-900 focus:outline-none focus:ring-2  focus:ring-blue-500">              <option value="">select</option>

//        <option value="1">Okay</option>
//         <option value="2">Decent</option>
//          <option value="3">Great</option>
//         <option value="4">best</option>
//         <option value="5">Excellent</option>
//       </select>

//   </div>

//     <div className="my-2">
//   <label htmlFor="comment"
//   className="block text-xl mb-2">
//          Comment
//     </label>
//    <textarea id="comment"
//      required
//      rows={3}
//     value={comment}
//      onChange={(e)=>setComment(e.target.value)}className="p-2 border rounded-lg xl:w-[40rem] text-white focus:outline-none focus:ring-2  focus:ring-blue-500"
//      ></textarea>
// </div>
//     <button
//     type="submit"
//    disabled={loadingProductReview}   className="bg-blue-500 text-white rounded-lg py-2 px-4 "
// >Submit</button>
//    </form>

//   ) : (
//      <p>
//             please <Link to="/login">
//                  Login
//                 </Link> to write a review
//        </p>
//      )
//     }

//          </div>
//           )
//          }
//     </section>
//         <section>
//             {
//               activeSection===2 &&(
//         <>
//         <div>
//             {product?.reviews?.length===0 && 
//             <p>No Review</p>}
//              </div>

//               <div>
//                {
//                  product?.reviews?.map((review)=>(
//                    <div
//                   key={review._id}className="bg-gray-800 p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5">
                               
//                   <div className="flex justify-between">
//                 <strong className="text-[#B0B0B0]">{review.name}</strong>
//                 <p
//                  className="text-[#B0B0B0]">
//               {  review.createdAt.substring(0, 10)}
//                </p>
//          </div>
//      <p className="my-3">{review.comment}</p>
//             </div>
//               ))
//                }
//           </div>
//           </>
//           )
//          }
//          </section>



//         </div>
//     )
