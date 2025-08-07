import dotenv from "dotenv"


import {v2 as cloudinary} from 'cloudinary'

// config the the dotenv
 dotenv.config({
    path:'./.env' 
 })

 import { extractPublicId } from "cloudinary-build-url"


 // configure the cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

function getResoruceType(url){
  const extension =url.split(".").pop().toLowerCase();
  if(['jpg','jpeg','png','gif','bmp','webp','tiff'].includes(extension)) return "image";
}

const deleteFromCloudinary=async(fileArray=[])=>{ 
 const results=[];
    for(const url of fileArray){

         try {
            if(!url){
                console.log("Existing user url doesnot exist")
                continue;
            }
            else{
                const publicId=extractPublicId(url);
                const extension=getResoruceType(url)
                if(!extension) {
                    console.warn("Unknown file types for url")
                }
                const response= await cloudinary.uploader.destroy(publicId,{
                    resource_type:extension,
                })
                results.push({url,publicId,status:response})
            }
         } catch (error) {
            console.log(`Error deleting URl ${error}`);
            results.push({url,error:error.message})
         }

    }
 return results;
}

export {deleteFromCloudinary}