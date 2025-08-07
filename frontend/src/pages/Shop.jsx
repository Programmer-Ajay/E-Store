import { useFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllCategoryQuery } from "../redux/api/categoryApiSlice.js";
import { Link } from "react-router";
import SearchBar from "../components/SearchBar.jsx";
import SearchedProductCard from "../components/searchProductsCompo.jsx";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice.js";
import Loader from "../components/Loader.jsx";
import FilterSidebarContent from "../components/filterCompo.jsx";
const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop);

  const categoriesQuery = useGetAllCategoryQuery();
  const [filterPrice, setFilterPrice] = useState("");
  const filteredProductQuery = useFilteredProductsQuery({ checked, radio });
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery?.data?.data));
    }
  }, [categoriesQuery?.data?.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductQuery.isLoading) {
        const filteredProduct = filteredProductQuery?.data?.data.filter((product) => {
          if (!filterPrice) return true;
          const priceLimit = parseFloat(filterPrice);
          return !isNaN(priceLimit) && product.price <= priceLimit;
        });
        dispatch(setProducts(filteredProduct));
      }
    }
  }, [checked, filteredProductQuery?.data?.data, dispatch, filterPrice]);

  const handleBrandClick = (brand) => {
    const productByBrand = filteredProductQuery.data?.data.filter((product) => product.brand === brand);
    dispatch(setProducts(productByBrand));
    setShowFilter(false); // close after selecting
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrand = Array.from(
    new Set(filteredProductQuery.data?.data?.map((product) => product.brand).filter(Boolean))
  );

  const handlePriceChange = (e) => {
    setFilterPrice(e.target.value);
  };



  
  return (
    <div className="mt-42 min-h-screen w-full px-4 relative">
      <div className="fixed top-18 w-[90%] left-1/2 transform -translate-x-1/2 z-50 px-4">
        <SearchBar />
      </div>

      {/* Mobile filter button */}
      <div className="lg:hidden flex justify-start mt-5 relative">
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg shadow fixed top-30 z-50 mt-2"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M3 12h18M3 20h18" />
          </svg>
          Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block bg-gray-800 p-3 mt-2 mb-2 rounded-lg ">
          <FilterSidebarContent
               categories={categories}
              uniqueBrand={uniqueBrand}
              filterPrice={filterPrice}
              handlePriceChange={handlePriceChange}
              handleBrandClick={handleBrandClick}
                handleCheck={handleCheck}
              />
        </div>

        {/* Slide-over mobile sidebar */}
        {showFilter && (
          <div className="fixed inset-0 z-50 top-12  bg-opacity-50 flex lg :hidden">

            <div className="w-2/5 sm:w-[45%] bg-gray-800 p-4 ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Filters</h2>
                <button onClick={() => setShowFilter(false)} className="text-white text-2xl">×</button>
              </div>
              <FilterSidebarContent
               categories={categories}
              uniqueBrand={uniqueBrand}
              filterPrice={filterPrice}
              handlePriceChange={handlePriceChange}
              handleBrandClick={handleBrandClick}
                handleCheck={handleCheck}
              />
            </div>

            <div className="flex-1" onClick={() => setShowFilter(false)}></div>
          </div>
        )}

        {/* Product Grid */}
        <div className="w-full md:w-3/4 transition-all duration-300">
          {products.length === 0 ? (
            <div className="text-center py-10 text-white">No products.</div>
          ) : (
            <div className="mt-2 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {products?.map((product) => (
                <div key={product._id}>
                  <Link to={`/products/${product._id}`}>
                    <SearchedProductCard product={product} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;


