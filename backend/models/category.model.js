 import {mongoose,Schema} from "mongoose";

 const categorySchema=new Schema({
     name:{
        type:String,
        required:true,
        maxLength:32,
        unique:true,
        trim:true
     }
 },
 {timestamps:true}
)

const Category=mongoose.model("Category",categorySchema)

export default Category