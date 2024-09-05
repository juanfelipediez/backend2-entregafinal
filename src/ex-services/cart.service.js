
import { cartModel } from "../models/carts.model.js"

class CartService {
    async create() {
        return await cartModel.create({})
    }

    async findById(cid){
        return await cartModel.findById(cid)
    }
    
    async findByIdAndUpdate(cid, cart){
         return await cartModel.findByIdAndUpdate(cid, {
            $set: {
                includedProducts: cart
            }
        })
    }

    async findByIdAndPopulate(cid){
        return await cartModel.find({_id: cid}).populate('includedProducts.product')
    }
}

export const cartService = new CartService


