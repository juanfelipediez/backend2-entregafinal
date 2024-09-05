import { Router } from "express"
import { productController } from "../controllers/product.controller.js"
import { authorize } from "../middlewares/authorization.middleware.js"
import passport from 'passport'

const router = Router()
router.get("/", productController.getProduct)
router.get("/:pid", productController.getProductById)
router.post("/", passport.authenticate('current', {session: false}), authorize('admin'), productController.createProduct)
router.put('/:pid', passport.authenticate('current', {session: false}), authorize('admin'), productController.editProduct)
router.delete('/:pid', passport.authenticate('current', {session: false}), authorize('admin'), productController.deleteProduct)

export default router
