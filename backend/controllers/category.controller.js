import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Category from "../models/category.model.js";
import { isValidObjectId } from "mongoose";

const createCategory=asyncHandler(async(req,res)=>{
   const {name}=req.body;

   if(!name){
    throw new ApiError(400,"Name is required")
   }

   // find if the category with this name is existed or nnot
   const existedCategory= await Category.findOne({name})
   
   if(existedCategory){
    throw new ApiError(400,"category is already existed")
   }
 // new Category + save() is equal to Category.create()
   const category= await Category.create({name})
     
 

   if(!category){
    throw new ApiError(400,"something went wrong while creategory is category")
   }

   return res.status(201).json(
    new ApiResponse(201,category,'Category is successfully created')
   )
})

const updateCategory=asyncHandler(async(req,res)=>{
     
    const {name}=req.body
    const{id}=req.params

    if(!name){
        throw new ApiError(400,"Category name is required")
    }
    if(!isValidObjectId(id)){
        throw new ApiError(400,"Not valid object id")
    }
    // find the category and update it
    const updatedCategory= await Category.findByIdAndUpdate(id,{
      $set:{
        name,
      }
    },{
        new:true
    })
   
    if(!updatedCategory){
        throw new ApiError(400,"Category with this name not found")
    }

    return res.status(200).json(
        new ApiResponse(200,updatedCategory,"Category Updated successfully")
    )
    // now check the object id
})

const deleteCategory= asyncHandler(async(req,res)=>{
     
    const {id}=req.params

    if(!isValidObjectId(id)){
        throw new ApiError(400,"Not a valid Object id")
    }

    const deletedCategory= await Category.findByIdAndDelete(id)

    if(!deletedCategory){
        throw new ApiError(400,"Category not found")
    }

    return res.status(200).json(new ApiResponse(200,deletedCategory,"Category deledted successfully"))

})

const getAllCategory=asyncHandler(async(req,res)=>{
   
    const categories= await Category.find({})

    if(!categories){
        throw new ApiError(500,"something went wrong")
    }
    return res.status(200).json(new ApiResponse(200,categories,"Categories feteched successfully"))
})



export {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory
}