import Product from "../models/product.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/uploadCloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteCloudinary.js";
import { isValidObjectId } from "mongoose";

const createProduct =asyncHandler(async(req,res)=>{

     const {name , description,price,category,quantity,brand}=req.body
  
     const images=req.files;
      console.log("Category",category)

     if([name,description,price,category,quantity,brand].some((field)=>!field || field==="")){
        throw new ApiError(400,"All field are required");
     }

    //  console.log("IMAGES::",images)
      
    if(!images ||images.length===0){  // this is a array thats why we write both condition here
        throw new ApiError(400,"Images are not provided")
    }

     const uplaodedImages=await uploadOnCloudinary(images) //we will get the array files uplaoded images

     console.log("uploaded image",uplaodedImages)
     if(!uplaodedImages){
        throw new ApiError(400,"Error while  uploading the images")
     }
    const imagesUrl=uplaodedImages.map((image)=>image.url)
     
    // save to db
    const addedProduct=await Product.create({
       name,
       description,
       brand,
       quantity,
       image:imagesUrl,
       price,
       category 
    })


     return res.status(201).json(
        new ApiResponse(201,addedProduct,"Product added successfully")
     )
})

// we update only the required specific fields
const updateProductDetails = asyncHandler(async(req,res)=>{
     const {id}=req.params
      //  console.log("Req.fields::",req.field);
      //  console.log("Req::",req);
      console.log("id::->",id)
      console.log("body data::",req.body)

     const product= await Product.findById(id)
     if(!product){
        throw new ApiError(404,"Product not found")
     }
     const {name,description,price,quantity,category,brand,countInStock}=req.body
     
     if(name!==undefined && name.trim()===""){
        throw new ApiError(400,"product name,cannot be empty");
     }
     if(price!==undefined && (isNaN(price)||Number(price<0))){
        throw new ApiError(400,"Inavlid price")
     }
 if(quantity!==undefined && (isNaN(quantity)||Number(quantity<0))){
        throw new ApiError(400,"Inavlid quantity")
     }

      if(countInStock!==undefined && (isNaN(countInStock)||Number(countInStock<0))){
        throw new ApiError(400,"Inavlid stock")
     }

     if(name!==undefined) product.name=name
     if(description!==undefined) product.description=description
     if(price!==undefined) product.price=price
     if(quantity!==undefined) product.quantity=quantity
     if(category!==undefined) product.category=category
     if(brand!==undefined) product.brand=brand
     if(countInStock!==undefined)product.     countInStock=countInStock
    
     const updatedProduct=await product.save()

     res.status(200).json(
        new ApiResponse(200,updatedProduct,"Product details updated successfully")
     )
    })

     const deleteProduct=asyncHandler(async(req,res)=>{
        // todo 
        // 1--> find the id of product
        // 2--> delete the imaage on clodinary  
        // 3-> and then delete the product
        const product=await Product.findById(req.params.id)

        if(!product){
            throw new ApiError(404,"product not found")
        }
        
        const cloudinaryRes= await deleteFromCloudinary(product?.image)
        console.log("DELETED RES FROM CLOUDINARY::",cloudinaryRes);

        if(!cloudinaryRes || cloudinaryRes.length<=0){
            throw new ApiError(400,"Error while deleting  the iamges")
        }
        
        const deletedProduct= await product.deleteOne()

        res.status(200).json(new ApiResponse(200,deletedProduct,"Product deleted successfully"))
     })

     const fetechAllProducts=asyncHandler(async(req,res)=>{
       
        const products =await Product.find({})
        .populate("category")
        .sort({createdAt:-1});
         res.status(200).json(new ApiResponse(
        200,products,"All Products fetech succesfully"
     ))
      
     })
    
     const fetechProducts= asyncHandler(async(req,res)=>{
        const keyword=req.query.keyword;
        console.log("Keywords::",keyword);
        if(!keyword){
         throw new ApiError(400,"Search Text should not be empty");
        }

        const SearchResults= await Product.aggregate([
         
         {
            $search:{
               index: "default",
               text:{
                  query:req.query.keyword,
                  path:["name","category.name","brand","description"],
                  fuzzy:{
                     maxEdits:2,  // maximum typo of 2 words
                     prefixLength:1  // atleast charachter should match
                  }
               }
            },
           
         },
         {
            $limit:15
         }
        ])


        console.log("SearchResults:",SearchResults)
        res.status(200).json(
         new ApiResponse(200,SearchResults,"product fetech successfully")
        )
     })
     const fetechProductById=asyncHandler(async(req,res)=>{
      // to do
      //1--> get a id from params then check if the id is correct or not
      // 2-> then find the product and return it
      const {id}=req.params;

      if(!isValidObjectId(id)){
         throw new ApiError( 400,"Invalid product id")
      }
      const product=await Product.findById(id).populate("category")
      if(!product){
         throw new ApiError(404,"Product not found")
      }
      
      res.status(200).json(new ApiResponse(200,product,"product fetech succeessfully"))
     })
     
      const addProductReview= asyncHandler(async(req,res)=>{
         const {comment, rating}=req.body
          
       // todo 
       // 1 get id of product 
       // 2  check if the produc tis already review 
       // 3 if yes then give msg
       //4 if not then write a review
       //5 then add rating and numReviews

        if(!comment || !rating){
         throw new ApiError(400,"field are not should empty")
        }

       const {id}=req.params
       if(!isValidObjectId(id)){
         throw new ApiError(400,"inavlid product id")
       }
       const product=await Product.findById(id)

       if(!product){
         throw new ApiError(400,"Product not found")
       }
       const alreadyReview= product.reviews.find((u)=>u.user.toString()===req.user._id.toString())

       if(alreadyReview){
         throw new ApiError(400,"Product already reviewed")
       }

       const review={
         name:req.user.username,
         rating:Number(rating),
         comment,
         user:req.user._id,
       }

       product.reviews.push(review)
       product.numReviews=product.reviews.length

       product.rating=product.reviews.reduce((acc,item)=> item.rating+acc ,0) / product.reviews.length;

      await product.save()
       
      res.status(200).json(new ApiResponse(200,product,"review added successfully"))
      })

      const fetchTopProduct=asyncHandler(async(req,res)=>{
         const product = await Product.find({}).sort({rating:-1}).limit(7);

         if(!product){
            throw new ApiError(400,"No top product is found")
         }

         return res.status(200).json(new ApiResponse(200,product,"Top product fetch successfully"))
      })
      
       const fetchNewProduct=asyncHandler(async(req,res)=>{
         const product = await Product.find({}).sort({_id:-1}).limit(7);

         if(!product){
            throw new ApiError(400,"No new  product is found")
         }

         return res.status(200).json(new ApiResponse(200,product,"New product  fetch successfully"))
      })

      const filterProducts=asyncHandler(async(req,res)=>{
          const {radio,checked}=req.body
          let args={}
         //  console.log("Radio",radio)
         //  console.log("checked::",checked)

           if (checked.length > 0) args.category = checked;

         //  if (checked.length > 0) {
         //   args.category = { $in: checked.map(id => new mongoose.Types.ObjectId(id)) };
  
          if(radio.length >0)args.price={$gte:radio[0],$lte:radio[1]}

          const products =await Product.find(args);
       
  if (!products || products.length === 0) {
    throw new ApiError(400, "No product found");
  }
         return res.status(200).json(new ApiResponse(200,products,"Filtered products  fetch successfully"))
      })

export {
    createProduct,
    updateProductDetails,
    deleteProduct,
    fetechAllProducts,
    fetechProducts,
    fetechProductById,
    addProductReview,
    fetchTopProduct,
    fetchNewProduct,
    filterProducts
}



