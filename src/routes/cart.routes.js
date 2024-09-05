import { Router } from "express"
import { cartController } from "../controllers/cart.controller.js"
import { authorize } from "../middlewares/authorization.middleware.js"
import passport from "passport"

const router = Router()
router.post("/", cartController.createCart)
router.get("/:cid", cartController.getCart)
router.post("/product/:pid", passport.authenticate('current', {session: false}), authorize('user'), cartController.addProductToCart)
router.put("/:cid/product/:pid", cartController.editProductQuantity)

// Reemplazar array interno del carrito
// Ejemplo del req.body enviado por postman:
//      {
//          "includedProducts": [
//              { "product": "66821d8be7e12918a21ab30b", "quantity": 22 },
//              { "product": "6681e39cfe5467bc0e684f80", "quantity": 44 }
//          ]
//      }

router.put("/:cid", cartController.editWholeCart);
router.delete(('/:cid'), passport.authenticate('current', {session: false}), authorize('user'), cartController.emptyCart) 
router.delete('/product/:pid', passport.authenticate('current', {session: false}), authorize('user'), cartController.deleteProductFromCart)
router.post('/purchase', passport.authenticate('current', {session: false}), authorize('user'), cartController.makePurchase)

export default router 


