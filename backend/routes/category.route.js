import { Router } from "express";
import { createCategory,
         updateCategory,
         deleteCategory,
         getAllCategory
 } from "../controllers/category.controller.js";

 import { authenticatedUser,authorizeAdmin } from "../middlewares/auth.middleware.js";

 const router=Router()

 router.route("/").post(authenticatedUser,authorizeAdmin,createCategory)
 
 router.route("/categories").get(getAllCategory)
 router.route("/:id")
 .put(authenticatedUser,authorizeAdmin,updateCategory)
 .delete(authenticatedUser,authorizeAdmin,deleteCategory)







 export default router