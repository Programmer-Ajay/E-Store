
import asyncHandler from "../utils/asyncHandler.js"
 import { User } from "../models/users.model.js"
 import {ApiError} from "../utils/ApiError.js"
 import {ApiResponse} from "../utils/ApiResponse.js"
import validator from "email-validator"
import jwt from "jsonwebtoken"
import { isValidObjectId } from "mongoose"
import Product from "../models/product.model.js"




const generateAccessTokenAndRefreshToken= async(userId)=>{
    try {
        const user= await User.findById(userId)
        // console.log("user::->",user)  for debugging purpose
    if (!user) {
      throw new ApiError(404, "User not found for token generation");
    }
          const accessToken=user.generateAccessToken()
          const refreshToken=user.generateRefreshToken()
          
          //  console.log("Acess token 1:",accessToken)
          //  console.log("refresh token 1:",refreshToken)
          //save the refesh token in db

          user.refreshToken=refreshToken

          await user.save({validateBeforeSave:false})

          return{accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"something went  wrong while genrating the tokens")
    }


} 


 const registerUser = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {username,email,password}=req.body

    if([username,email,password].some((field)=>field?.trim()==="")){
       // if after the triming if the field is empty then give the error
       throw new ApiError(400,"All field are Required")       
    }
     // validate the email
     if(!validator.validate(email)){
        throw new ApiError(400,"Please enter the correct email")
     }

     // now before save the user just check if the user if already present or not
      const existedUser= await User.findOne({email})
      
      if(existedUser){
        throw new ApiError (400,'User with this email is already existed')

      }

      const user =await User.create({
        email,
        username,
        password
      })

     // now check if the user is crearted or not 
     const createdUser = await User.findById(user._id).select("-password -refreshToken")
 
 if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
 }
    const {accessToken,refreshToken}= await generateAccessTokenAndRefreshToken(user._id)


 // return the response

  return res
 .cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:true,
    maxAge:10*24*60*60*1000
 })
 .cookie("accessToken",accessToken,{
    httpOnly:true,
    secure:true,
    maxAge:60*60*1000
 })
 .status(201)
 .json(
    new ApiResponse(201,createdUser,"User is registered successfully"))
  })


  // login the user

  const loginUser=asyncHandler(async(req,res)=>{
    // console.log(req.body)
    const {email,password}=req.body

    if(!email){
     throw new ApiError(400,"Email or Password is required")
    }
 if(!password){
     throw new ApiError(400,"Password is required")
    }
    // check the email foramtting 
    if(! validator.validate(email)){
        throw new ApiError(400,"Email formating is incorrect")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(400,"User is not found")
    }
   // password checking
   const isPasswordValid =  await user.isPasswordCorrect(password)

   if(!isPasswordValid){
     throw new ApiError(400,"Invalid the user Password")
   }

   // genrate the access and referesh token
 const {accessToken,refreshToken}= await generateAccessTokenAndRefreshToken(user._id)


 // finally here we after adding the await keyword we fixed the undefined cookie problem
// because are  generateAccessTokenAndRefreshToken() is async fun so it should adding await



//  console.log("Access token ::->",accessToken)
//  console.log("Refresh token ::->",refreshToken)
 const loggedInUser = await User.findById(user._id).select(" -refreshToken -password ").populate("addToCart.product","_id name image price brand quantity,rating description category")
  .populate("FavouriteProducts","_id name image price brand quantity rating")
  
//  console.log(loggedInUser)

 //setting cookie

 return res.status(200)
 .cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:true,
    maxAge:10*24*60*60*1000
 })
 .cookie("accessToken",accessToken,{
    httpOnly:true,
    secure:true,
    maxAge:20*60*1000
 })
 .json(new ApiResponse(200,
    {user:loggedInUser},
    "User loggedIn successfully"

 ))
  })


  //  login with google
  const loginWithGoogle=asyncHandler(async(req,res)=>{

        const {username,email} = req.body

        if(!username){
          throw new ApiError(400,"Username is missing")
        }
         if(!email){
          throw new ApiError(400,"Email is missing")
        }

        //  find the user with this email if exist simply generate tokens and logged in 
        //  But--> if not then  create a user and then login
      let user =await User.findOne({email})

      if(!user){
        const newUser= await User.create({username,email,googleUser:true})
         if(!newUser){
          throw new ApiError(400,"Error while creating the user")
         }
         user=newUser
      }

       const {accessToken,refreshToken}= await generateAccessTokenAndRefreshToken(user._id)
       const LoggedInUser= await User.findById(user._id).select("-refreshToken")

       return res.status(200)
       .cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        maxAge:10*24*60*60*1000
     })
       .cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:true,
        maxAge:20*60*1000
 }).json(
  new ApiResponse(200,LoggedInUser,"User successfuly Logged In")
 )
  })

  // logout user
  const logoutUser = asyncHandler(async(req,res)=>{
    
    // auth middleware will add the user from where we get our user_id
       console.log(req.user)
    await User.findByIdAndUpdate(req.user_id,{
        $set:{
            refreshToken:undefined
        }
        } ,
        {
            new:true }
        )


  const options=
  {
 httpOnly:true,
 secure:true
 }

 return res.status(200)
 .clearCookie("accessToken",options)
 .clearCookie("refreshToken",options)
 .json(
    new ApiResponse(200,{},"User Logged Out")
 )


  })


  const refreshAccessToken = asyncHandler(async(req,res)=>{
     const incomingRefreshToken=req.cookies.refreshToken

     if(!incomingRefreshToken){
      throw new ApiError(400,"Unauthorized Request")
     }

     try {
       
      const decodedToken=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
       
       const user = await User.findById(decodedToken?._id)
       if(!user){
        throw new ApiError(400,"invalid refresh token")
       }
        
       if(incomingRefreshToken !==user?.refreshToken){
          throw new ApiError(401,"Refresh token is expired or used")
       }

       const options={
          httpOnly:true,
          secure:true,
          maxAge:20*60*1000  
       }
       const newAccessToken= user.generateAccessToken()
        return res
        .status(200)
        .cookie("accessToken",newAccessToken,options)
        .json(
          new ApiResponse(200,{
            newAccessToken,
            
          },"Access token refresh succesfully")
        )


     } catch (error) {
         console.log("Error in refresh Token controller-->",error.message)
         res.status(500).json({message:"server error",error:error.message})
     }
  })

// for admin --->  get all users
const getAllUsers=asyncHandler(async(req,res)=>{
    const users= await User.find({})
    if(!users){
      throw new ApiError(400,"Users are not feteched")
    }

    res.status(200).json(
      new ApiResponse(200,{users},"All users feteched successfully")
    )
})

 const getCurrentUserProfile= asyncHandler(async(req,res)=>{
    
  // so the users is authenticated
  const user= await User.findById(req.user?._id).select("-password -refreshToken")
  .populate("addToCart.product","_id name image price brand quantity,rating description category")
  .populate("FavouriteProducts","_id name image price brand quantity rating")

  if(!user){
    throw new ApiError(400,"user is not found")
  }
   res.status(200).json(
    new ApiResponse(200,{user},"user details get successfully")
   )
 })

 const updateCurrentUserProfile=asyncHandler(async(req,res)=>{

   const user= await User.findById(req.user._id)


   if(!user){
    throw new ApiError(400,"user is not found")
  }
   const {email,username,oldPassword,newPassword}=req.body

   if(!email && !username && !oldPassword &&newPassword){
       throw new ApiError(400,"No fild is provided for update")
   }

   if(email) user.email=email
   if(username) user.username=username
   if(oldPassword && newPassword){
     
    // now check whether the old password is correct or not
     const isPasswordValid =  await user.isPasswordCorrect(oldPassword)

   if(!isPasswordValid){
     throw new ApiError(400,"Invalid the old Password")
   }
     user.password=newPassword
   } 

   await user.save()
 
  res.status(200).json(
    new ApiResponse(200,{_id:user._id, username:user.username, email:user.email},
      "user details update successfully")
  )


})

const deleteUserById =(async(req,res)=>{
    const id= req.params.id
          console.log("id::",id)
          if(!isValidObjectId(id)){
            throw new ApiError(400,"Invalid user id")
          }
    const user= await User.findById(id)

    if(!user){
      throw new ApiError(400,"User doesnt exist")
    }

    if(user){
      if(user.isAdmin){
        throw new ApiError(400,"can not delete the admin user")
      }
    }

    await User.deleteOne({_id:user._id})

    res.status(200).json(
      new ApiResponse(200,{},"user deleted successfully")

    )
})

const getUserById=asyncHandler(async(req,res)=>{
  const id= req.params.id
  if(!id){
    throw new ApiError(400,"user id is not provided")

  }
   const user= await User.findById(id)
   if(!user){
    throw new ApiError(200,"user is not found")
   }

   res.status(200).json(
    new ApiResponse(200,{user},"user details fetech successfully")
   )
})

const updateUserById=asyncHandler(async(req,res)=>{
   const id= req.params.id
   if(!id){
    throw new ApiError(400,"user id is not provided")
   }

   const user = await User.findById(id)

   if(!user){
    throw new ApiError(200,"user is not found")
   }
  
   user.username= req.body.username || user.username
   user.email=req.body.email || user.email

   user.isAdmin=req.body.isAdmin

   const updatedUser = await user.save();

   res.status(200).json(
    new ApiResponse(200,{_id:updatedUser._id,
         username:updatedUser.username,
         email:updatedUser.email,
         isAdmin:updatedUser.isAdmin
    },
    "user details updated successfully"
  )
   )
})


// Add to Cart Features
 const AddToCart= asyncHandler(async(req,res)=>{
       // we will this product by id
       const {id}=req.params
       console.log("product id :",id)
       console.log("product id by params :",req.params.id)
       const user=req.user;
       if(!isValidObjectId(id)){
        throw new ApiError(400,"Inavlid Product iddddd")
       }

       // now the find the product is it available in db
       const product= await Product.findById(id)
       if(!product){
        throw new ApiError(400,"Product not found")
       }
       // now checked if the product is already in the cart or not
        const existingProduct=user.addToCart.find( item=>item.product.toString()===id)
         
        if(existingProduct){
          // console.log("quanity:",req.body.quantity)
          const qty=req.body?.quantity? Number(req.body.quantity) : 1;

          existingProduct.quantity+=qty
        }else{
          // else push the the item to the cart
          const cartItem={
            product:id
          }
          if(req.body?.quantity!==undefined){
            cartItem.quantity=Number(req.body?.quantity);
          }else{
            cartItem.quantity=1
          }
          user.addToCart.push(cartItem)
        }

        await user.save()
            const updatedUserProduct=await user.populate("addToCart.product", "_id name image price brand quantity rating  category");
           
           
            // console.log("Updated Cart::",updatedUserProduct.addToCart)
            const updatedAddToCart= updatedUserProduct.addToCart.find((item)=>item.product._id.toString()===id.toString())

            // console.log("added product::",updatedAddToCart)

        res.status(201).json(
          new ApiResponse(201,{updatedAddToCart
          },"Item Added to cart ")
        )
 })

  const removeFromCart=asyncHandler(async(req,res)=>{
     const {id}=req.params;
     if(!isValidObjectId(id)){
      throw new Error(400,"Proudct not  Existed ");

     }
      req.user.addToCart= await req.user.addToCart.filter(item=>item.product.toString()!==id)
        //  console.log("deleted product:",deletedProduct)
      await req.user.save();
      await req.user.populate("addToCart.product", "_id name image price brand quantity rating  category");

    res.status(200).json(
      new ApiResponse(200,req.user.addToCart,"product deleted successfully")
    )

  })


  const  addToFavourite=asyncHandler(async(req,res)=>{
     const {id}=req.params;
     const user=req.user;
     console.log("id:",id)
     if(!isValidObjectId(id)){
      throw new ApiError(400,"proudct id is incorrect")
     }
     console.log("1:ID check")
     const product= await Product.findById(id)
        if(!product){
          throw new ApiError(200,"Product not found")

        }
    //  console.log("2:product found")

        // now check if the product is already in favArray
        const existingFavProduct=user.FavouriteProducts.some((ID)=>ID.toString()===id)

    //  console.log("3:existed prodcut")

        if(existingFavProduct){
          throw new ApiError(400,"Product is already favourite")
        }
    //  console.log("4:Existed product true")

       user.FavouriteProducts.push(id);

    //  console.log("5:Product push")

         await user.save()
         await user.populate("FavouriteProducts", "_id name image price brand quantity rating description category");

      //  console.log("6:Product saved")

         res.status(200).json(
          new ApiResponse(200,user.FavouriteProducts,"Added to Favourite")
         )
  })
   const removeFromFav=asyncHandler(async(req,res)=>{

    const {id}=req.params
    const user=req.user;
     console.log("id:",id)

       if(!isValidObjectId(id)){
      throw new ApiError(400,"proudct id is incorrect")
     }
     
     user.FavouriteProducts=user.FavouriteProducts.filter(ID=>ID.toString()!==id)

     await user.save()
    await user.populate("FavouriteProducts", "_id name image price brand quantity rating description category");
res.status(200).json(
  new ApiResponse(200,user.FavouriteProducts,"Product removed from Favourite")
)

   })
     
 export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
     getUserById,
     updateUserById,
     loginWithGoogle,
     AddToCart,
     removeFromCart,
     addToFavourite,
     removeFromFav


 }