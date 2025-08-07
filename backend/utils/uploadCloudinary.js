import dotenv from "dotenv"


import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

// config the the dotenv
 dotenv.config({
    path:'./.env' 
 })

// console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
// console.log("API_KEY:", process.env.API_KEY);
// console.log("API_SECRET:", process.env.API_SECRET);

// configure the cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

// upload on the cloudianry
 const uploadOnCloudinary= async(fileArray)=>{
    // console.log("Cloudinary current config:", cloudinary.config());

    // console.log("API_KEY::",process.env.API_KEY)
       const uplaodedImages=[];
      for (const image of fileArray){ 
    try {
       
            const result= await cloudinary.uploader.upload(image.path,{
                resource_type:"image",
                folder:"Ecommerce",
            })
            // console.log("Res::",result)  for debugging
     uplaodedImages.push({url:result.url});
      
     // delete from local folder
      fs.unlinkSync(image.path);
         
    
    } catch (error) {
        console.log(" cloudinary error::",error)
       fs.unlinkSync(image.path)
       // remove the locally savwed file tempoarary file as the uplaod oaration gets failed 
       return null;
        
    }
}
return uplaodedImages
   
 }

 export {uploadOnCloudinary}