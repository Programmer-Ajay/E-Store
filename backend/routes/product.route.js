
import {Router} from "express"
import { createProduct,
    deleteProduct,
    updateProductDetails,
    fetechAllProducts,
    fetechProducts,
    fetechProductById,
    addProductReview,
    fetchTopProduct,
    fetchNewProduct,
    filterProducts
} from "../controllers/products.controller.js";

import { uplaod } from "../middlewares/multer.js";
import { authenticatedUser,authorizeAdmin } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/")
.post(authenticatedUser,authorizeAdmin,uplaod.array("images",5),createProduct)
.get(fetechProducts)

router.route("/all-products").get(fetechAllProducts)
router.route("/new-products").get(fetchNewProduct)

router.route("/top-products").get(fetchTopProduct)

router.route("/:id/reviews").post(authenticatedUser,addProductReview)

router.route("/filtered-products").post(filterProducts)

router.route("/:id")
.get(fetechProductById)
.delete(authenticatedUser,authorizeAdmin,deleteProduct)
.put(authenticatedUser,authorizeAdmin,updateProductDetails)


export default router;