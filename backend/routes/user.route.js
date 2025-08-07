
import { Router } from "express";
import {
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
 } from "../controllers/user.controller.js"

 import { authenticatedUser,authorizeAdmin }from "../middlewares/auth.middleware.js"
 // make the router

 const router=Router()

 // register the route
 router.route("/register").post(registerUser)
 
 // login route
 router.route("/login").post(loginUser)

 // login or signed in with google
 router.route("/login-with-google").post(loginWithGoogle)
 
 // logout route
 router.route("/logout").post(authenticatedUser,logoutUser)
 router.route("/refresh-token").post(refreshAccessToken)

router.route("/profile")
.get(authenticatedUser,getCurrentUserProfile)
.put(authenticatedUser,updateCurrentUserProfile)

//Admin routes
router.route("/all-users").get(authenticatedUser,authorizeAdmin,getAllUsers)

router.route("/:id")
.delete(authenticatedUser,authorizeAdmin,deleteUserById)
.get(authenticatedUser,authorizeAdmin,getUserById)
.put(authenticatedUser,authorizeAdmin,updateUserById)


// cart route
router.route("/cart/:id")
.post(authenticatedUser,AddToCart)
.delete(authenticatedUser,removeFromCart)

// favourite
 router.route("/favourite/:id")
 .post(authenticatedUser,addToFavourite)
 .delete(authenticatedUser,removeFromFav)


 export default router