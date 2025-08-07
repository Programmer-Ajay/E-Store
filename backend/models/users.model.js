import mongoose from "mongoose";

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:function(){
            return !this.googleUser     // password is required if not a google user
        }
    },
    googleUser:{
        type:Boolean,
        default:false
    },
    isAdmin:
    {
     type:Boolean,
     required:true,
     default:false
    },

    refreshToken:{
        type:String
    },
    
     FavouriteProducts:{
        
         type: [
            {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
            }
        ],
        default:[]
     },
      

     addToCart: {
  type: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        default: 0
      }
    }
  ],
  default: []
}

     
},{timestamps:true, })


// middleware

userSchema.pre('save',async function(next){
   
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10)
        next()
    }else{
        return next()
    }
})

// methods()se hum bahut saare custom methods set kar sakte


userSchema.methods.isPasswordCorrect= async function(password) {
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken=function (){
  

      return jwt.sign({
        _id:this._id,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)


}

userSchema.methods.generateRefreshToken=function(){

      
     return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
{
expiresIn:process.env.REFRESH_TOKEN_EXPIRY
}

)

}


export const User =mongoose.model("User",userSchema)