import { app } from "./app.js";
import dotenv from "dotenv"
  import connectDB from "./db/db.js";
// config the the dotenv
 dotenv.config({
    path:'./.env' 
 })

 
   connectDB().then(()=>{
    //if the connection is not get possible then

    app.on('error',(error)=>{
        console.log("ERROR",error)
        throw error
    })

     app.listen(process.env.PORT || 3000 ,()=>{
    console.log(`server is running on the ${process.env.PORT}`)

 })
   }).catch((error)=>{
    console.log("MonogoDb connection failed !!!")
   })

 
