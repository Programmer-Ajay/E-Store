import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from 'cors'


// crerating the app
const app=express()

// middleware
 app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
 }))

 app.use(express.json({
    limit:"30kb"
 }))

//  ☝️☝️
  //yaha pe hum express.json ko configuare akr rahe hai ki agar data json fromat mein aaya toh kya kare and kitna data le put limit


// agar data url se data ayega toh kya yeh config kare
app.use(express.urlencoded({
    extended:true,
    limit:"30kb"
}))

app.use(express.static("public"))

app.use(cookieParser())


// route declarataion
import userRouter from "./routes/user.route.js"
import categoryRouter from "./routes/category.route.js"
import productRouter from "./routes/product.route.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/products",productRouter)

export  {app}