
  const FilterSidebarContent = ({
    categories,
    uniqueBrand,
    filterPrice,
    handlePriceChange,
    handleBrandClick,
    handleCheck
  })=>{

     return(
    <>
      <h2 className="h4 text-center py-2 bg-gray-900 rounded-full mb-2 text-white">Categories</h2>
      <div className="p-5 w-[15rem]">
        {categories?.map((c) => (
          <div key={c._id} className="flex items-center mr-4 p-1">
            <input
              type="checkbox"
              id={c._id}
              className="w-4 h-4 rounded-full bg-gray-800 checked:bg-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:ring-2 hover:ring-gray-400"
              onChange={(e) => handleCheck(e.target.checked, c._id)}
            />
            <label htmlFor={c._id} className="ml-2 text-md font-medium text-white">{c.name}</label>
          </div>
        ))}
      </div>

      <h2 className="h4 text-center py-2 bg-gray-900 rounded-full mb-2 text-white">Brand</h2>
      <div className="p-5">
        {uniqueBrand?.map((brand) => (
          <div className="flex items-center mr-4 mb-4" key={brand}>
            <input
              type="radio"
              id={brand}
              name="brand"
              onChange={() => handleBrandClick(brand)}
              className="w-4 h-4 text-emerald-400 bg-emerald-500 border-gray-300"
            />
            <label htmlFor={brand} className="ml-2 text-sm font-medium text-white">{brand}</label>
          </div>
        ))}
      </div>

      <h2 className="h4 text-center py-2 rounded-full mb-2 bg-gray-900 text-white">Price</h2>
      <div className="p-5 w-[100%]">
        <input
          type="text"
          placeholder="Enter the Price"
          value={filterPrice}
          onChange={handlePriceChange}
          className="min-w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="p-5 pt-0">
        <button
          className="w-full border my-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-950 transition-transform duration-400 hover:scale-100 text-white"
          onClick={() => window.location.reload()}
        >
          Reset
        </button>
      </div>
    </>
     )};
  export  default  FilterSidebarContent