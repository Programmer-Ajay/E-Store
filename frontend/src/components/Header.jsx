import TopProductCarousel from "../pages/product/TopProductCarousel.jsx";
import TextType from "../blocks/TextAnimations/TextType/TextType.jsx";
import SearchBar from "./SearchBar.jsx";

const Header = () => {
  return (
    <div className="relative">
  {/* Fixed Search Bar */}
  <div className="fixed top-18 w-[90%] md:w-[90%] left-1/2 transform -translate-x-1/2 z-50 px-4">
    <SearchBar />
  </div>



      {/* Main Content */}
      <div className="pt-32 px-4 text-center">
        {/* Typing Text */}
        <h2 className="md:text-3xl text-3xl font-semibold mb-6">
          <TextType
            text={["Trending Products", "Top Products", "High Rated Products"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={false}
            deletingSpeed={30}
            loop={true}
          />
        </h2>

        {/* Carousel */}
        <div className="mt-7">
          <TopProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Header;
