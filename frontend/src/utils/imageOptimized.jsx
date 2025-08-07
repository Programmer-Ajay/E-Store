import {Cloudinary} from "@cloudinary/url-gen";
 import {AdvancedImage} from '@cloudinary/react';
 import { extractPublicId } from "cloudinary-build-url"
 import { scale } from "@cloudinary/url-gen/actions/resize";
  import {placeholder } from "@cloudinary/react";
  import { format, quality } from '@cloudinary/url-gen/actions/delivery';


  //  config cloudName
  const Cld= new Cloudinary({
    cloud:{
         cloudName: 'ajaycloud12'
    }
  })

  const optimizedImage=(url)=>{
    const publicId=extractPublicId(url)
    if(!publicId){
        return null;
    }
    try {
        const optimizedUrl=  Cld.image(publicId)
            .delivery(format('auto'))   
            .delivery(quality('auto'))
            .resize(scale().width(400))
            return optimizedUrl;
             // console.log("optimized URl::",optimizedUrl)
            // console.log("Final image URL string:", optimizedUrl?.toURL());


    } catch (error) {
        console.log("Optimised component error:",error)
        toast.error("Optimized image error")
    }
  }

  const IMG=({
    imageUrl,
    classStyling,
    alt,  
  })=>{
    return(
    < AdvancedImage
       cldImg={optimizedImage(imageUrl)}
       alt={alt}
       className={classStyling}
       plugins={[placeholder()]}
        />
    )
  }
  export default IMG;

  // className="w-full h-52 sm:h-60 md:h-64 object-cover"