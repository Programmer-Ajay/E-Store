import  jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import { User } from "../models/users.model.js"


const authenticatedUser = asyncHandler(async(req,_,next)=>{
 
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if (!token){
            throw new ApiError(400,"Unauthorized request")

        }
 
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToekn")

        if (!user){
            throw new ApiError(401,"Invalid Access Token") 
        }
        req.user=user
        next()

    } catch (error) {
         throw new ApiError(401,error?.message || "Invalid Acess Token")
    }

})


const authorizeAdmin=asyncHandler(async(req,_,next)=>{
    if( req.user && req.user.isAdmin){
        next()
    }
    else{
        throw new ApiError(400,"Not authorized as Admin")
    }
})
    export { authenticatedUser ,authorizeAdmin }