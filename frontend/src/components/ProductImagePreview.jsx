import { useState } from "react";

const ProductImagePreview = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-[100%] flex flex-col md:flex-row gap-4 ">


 {/* Main Image */}
      <div className="md:w-[80%]">
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full h-[18rem] sm:h-[22rem] md:h-[25rem] object-cover rounded-lg border-2"
        />
      </div>
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[30rem] ">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumb ${index}`}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 sm:w-20 sm:h-20 object-cover border-2 rounded-md cursor-pointer ${
              selectedImage === img ? "border-blue-500" : "border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImagePreview;
