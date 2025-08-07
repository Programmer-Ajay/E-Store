import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import IMG from "../../utils/imageOptimized.jsx";
import Loader from "../../components/Loader.jsx";
import { useFetchTopProductQuery } from "../../redux/api/productApiSlice.js";

const TopProductCarousel = () => {
  const { data: topProducts, isLoading } = useFetchTopProductQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Fixed spelling
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280, // lg
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // md
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        <div className="slider-container max-w-screen-xl mx-auto">
          <Slider {...settings}>
            {topProducts?.data.map((product) => (
              <div key={product._id} className="px-2">
                <div className="relative group overflow-hidden rounded-xl shadow-lg">
                  {/* <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110
                    border-amber-50 border"
                  /> */}
                  <IMG 
                   imageUrl={product.image[0]}
                    classStyling="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110
                    border-amber-50 border"
                     alt={product.name}
                    />
                  <div className="absolute inset-0 hover:backdrop-blur-sm  bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-betwenn">
                    <div className="text-center text-white px-2 flex w-full items-center justify-between mb-2 ">
                      <p className="text-lg font-semibold">{product.name}</p>
                      <p className="text-lg">₹{product.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default TopProductCarousel;
