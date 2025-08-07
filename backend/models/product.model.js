import mongoose, {Schema} from "mongoose"


const reviewSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const productSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    image:[{
        type:String,
        required:true
    }],
    price:{
        type:Number,
        required:true,
        default:0,
        min:0,
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    reviews:[reviewSchema],

    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
       type:Number,
        required:true,
        default:0
    },
    
    countInStock:{
        type:Number,
        required:true,
        default:0
    }
},{timestamps:true})

const Product=mongoose.model("Product",productSchema)
export default Product