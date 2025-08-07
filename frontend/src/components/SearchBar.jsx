import { useState } from "react";
import { FaSearch, FaTimes} from "react-icons/fa";
import useDebounced from "../customHooks/debounced.js";
import { IoMdSend } from "react-icons/io";
import { useFetchProductsQuery } from "../redux/api/productApiSlice.js";
import  {useNavigate} from "react-router"
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults,setShowResults]=useState(false)
  const navigate=useNavigate()
  const debouncedSearchTerm=useDebounced(searchTerm,400) // custom

  const {data:searchedProducts,isLoading,error}=useFetchProductsQuery(
    {keyword:debouncedSearchTerm},
    {skip:!debouncedSearchTerm}
  )

  // console.log("searchProducts Appi call:",searchedProducts?.data)

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?keyword=${searchTerm}`)
      setShowResults(false)

    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setShowResults(false)
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleProductClick=(productId)=>{
    navigate(`/products/${productId}`)
    setShowResults(false)
    setSearchTerm("")
  }



  return (


 <div className="relative w-full flex justify-center z-50">
      {/* Search Input */}
      <div className="flex items-center bg-gray-800 border border-gray-300 rounded-full shadow-md px-3 sm:px-4 py-2 w-[90%] md:w-full max-w-2xl">
        <FaSearch className="text-gray-400 mr-2 text-sm sm:text-base" />

        <input
          type="text"
          className="flex-grow outline-none bg-gray-800 text-sm sm:text-base text-white placeholder:text-gray-400"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          onKeyDown={handleKeyDown}
        />

        {searchTerm && (
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-red-500 mr-2 transition text-sm sm:text-base"
          >
            <FaTimes />
          </button>
        )}

        <button
        disabled={searchedProducts?.data?.length<=0}
          onClick={handleSearch}
          className="text-white bg-blue-700 hover:bg-blue-800 transition px-3 py-1 rounded-full text-sm sm:text-base"
        >
          <IoMdSend />
        </button>
      </div>

      {/* Dropdown Result Box */}

      {showResults && searchTerm && (
        <div className="absolute top-full mt-1 w-[90%] md:w-full max-w-2xl bg-[rgb(17,35,54)] shadow-lg border rounded-md z-40  max-h-64 overflow-y-auto text-white">
          {isLoading && (
            <div className="px-4 py-2 text-gray-500 text-sm">Loading...</div>
          )}

          {error && (
            <div className="px-4 py-2 text-red-500 text-sm">Error fetching results.</div>
          )}

          {searchedProducts?.data?.length > 0 ? (
            searchedProducts.data.slice(0,6).map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm sm:text-base"
              >
                {product.name}
              </div>
            ))
          ) : (
            !isLoading &&
            !error && (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No products found.
              </div>
            )
          )}
        </div>
      )}
    </div>

  );
};

export default SearchBar;





// tester Code


//    <div className="flex items-center bg-gray-800 border border-gray-300 rounded-full shadow-md px-3 sm:px-4 py-2 w-[90%] mx-auto">

//   <FaSearch className="text-gray-400 mr-2 text-sm sm:text-base" />

//   <input
//     type="text"
//     className="flex-grow outline-none bg-gray-800 text-sm sm:text-base placeholder:text-gray-400"
//     placeholder="Search products..."
//     value={searchTerm}
//     onChange={(e) =>{
//        setSearchTerm(e.target.value)
//        setShowResults(true)
//     }
//     }
//     onKeyDown={handleKeyDown}
//   />

//   {searchTerm && (
//     <button
//       onClick={handleClear}
//       className="text-gray-400 hover:text-red-500 mr-2 transition text-sm sm:text-base"
//     >
//       <FaTimes />
//     </button>
//   )}

//   <button
//     onClick={handleSearch}
//     className="text-white bg-blue-700 hover:bg-blue-800 transition px-3 py-1 rounded-full text-sm sm:text-base"
//   >
//     <IoMdSend />
//   </button>
// </div>
