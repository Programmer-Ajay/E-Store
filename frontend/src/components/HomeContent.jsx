
import TextType from "../blocks/TextAnimations/TextType/TextType";
import { useNavigate } from "react-router"; 

const HomeContent = () => {

  const navigate=useNavigate()
  return (
    <section className="w-[90%] mx-auto mt-15 rounded-xl overflow-hidden shadow-lg bg-gray-800 
    mb-2 min-h-90">

      <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        
        {/* Left Side - Text with animated background */}
        <div className="relative w-full md:w-1/2 min-h-[300px] p-6 md:p-12 text-white overflow-hidden">
          
          

          {/* Foreground text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              <TextType
                text={["Sale is Live", "Get 50% on Shopping", "Shop Now"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                deletingSpeed={30}
                loop={true}
              />
              
            </h2>

            <p className="mb-6 text-lg">
              Discover unbeatable deals on our best products. Limited time only. Don’t miss out!
            </p>
            
            <button className="px-6 py-3 bg-emerald-400 hover:bg-emerald-600 text-black rounded-md font-medium transition"
             onClick={()=> navigate("/shop")}>
              Shop Now
            </button>

          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 h-[70vw] md:h-full">
          <img
            src="https://cdn.pixabay.com/photo/2022/08/24/16/26/business-7408289_1280.jpg"
            alt="Shopping Sale"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeContent;

