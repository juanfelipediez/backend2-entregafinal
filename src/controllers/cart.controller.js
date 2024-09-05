import { productService, cartService, ticketService, userService, mailService } from "../services/index.js"
import { v4 as uuidv4 } from "uuid";

class CartController {
    async createCart(req, res) {
        try{
            const newCart = await cartService.create()
            res.status(201).json(`A new cart was created.`)
        }catch(error){
            res.status(500).json(`Error: ${error}`)
        }
    }

    async getCart(req, res){
        try{
        const { cid } = req.params
            const cart = await cartService.getByIdAndPopulate(cid)

            if(!cart){
                res.status(400).json(`The cart with number ID ${cid} doesn't exist`)
                return
            }
            
            res.status(200).json(cart)
    
        }catch(error){
            res.status(500).json(`Error: ${error}`)
        }
    }

    async addProductToCart(req, res) {
        try{
            const { pid } = req.params
            const user = await userService.getByEmail({email: req.user.user.email})
            const cart = await cartService.getById(user.cart)
            const product = await productService.getById(pid)
            if (!product) {
                return res.status(404).json(`Product not found`)
            }
            const alreadyIncludedProduct = cart.includedProducts.find((el) => el.product.toString() === pid)
            if(alreadyIncludedProduct){
                alreadyIncludedProduct.quantity++
                await cartService.update(cart._id, cart.includedProducts)
                res.status(200).json(`One item of the product (${product.title}) was added to the cart`)
            }else{
                cart.includedProducts.push({product: pid, quantity: 1})
                await cartService.update(cart._id, cart.includedProducts)
                res.status(200).json(`The product ${product.title} was added to the cart`)
            }
        } catch(error){
            res.status(500).json(`Error: ${error}`)
        }
    }

    async editProductQuantity(req, res) {
        try{
            const { cid, pid } = req.params
            const {quantity} = req.body
            const cart = await cartService.getById(cid)
            const product = await productService.getById(pid)
            const includedProduct = cart.includedProducts.find( el => el.product == pid)
            includedProduct.quantity = quantity
    
            await cartService.update(cid, cart.includedProducts)

    
            res.status(200).json(`The product ${product.title} now has ${quantity} items.`)
        }catch(error){
            res.status(500).json(`Error: ${error}`)
        }
    }

    async editWholeCart(req, res) {
        try {    
            const { cid } = req.params;
            const { includedProducts } = req.body;
            
            const cart = await cartService.getById(cid);
            if (!cart) {
                return res.status(404).json(`El carrito con id ${cid} no existe`);
            }
            await cartService.update(cid, includedProducts)
    
            res.status(200).json(`The content of this cart was updated.`);
        } catch (error) {
            res.status(500).json(`Error: ${error}`);
        }    
    }

    async emptyCart(req, res){
        try{
            const {cid} = req.params
            const cart = await cartService.getById(cid)
            if(!cart){
                return res.status(404).json(`The cart with id ${cid} doesn't exist`)
            }
            await cartService.update(cid, [])
    
            res.status(200).json(`The cart is now empty.`)
        }catch(error){
            res.status(500).json(`Error: ${error}`)
        }
    }

    async deleteProductFromCart(req, res){
        try{
            const user = await userService.getByEmail({email: req.user.user.email})        
            const cart = await cartService.getById(user.cart)    
            const {pid} = req.params
            const product = await productService.getById(pid)
    
            const includedProduct = cart.includedProducts.find((el) => el.product == pid)
            cart.includedProducts.splice(cart.includedProducts.indexOf(includedProduct), 1)
            await cartService.update(cart._id, cart.includedProducts)
            res.status(200).json(`The product ${product.title} has been deleted.`)
        }catch(error){
            res.status(500).json(`Error: ${error}`)
        }
    }

    async makePurchase(req, res){
        try{
            const user = await userService.getByEmail({email: req.user.user.email})        
            const cart = await cartService.getByIdAndPopulate(user.cart)
            const availableProducts = cart.includedProducts.filter( (el) => el.quantity <= el.product.stock)
            cart.includedProducts = cart.includedProducts.filter( (el) => el.quantity > el.product.stock)
            const amount = availableProducts.reduce((partialAmount, el) => partialAmount + (el.product.price * el.quantity), 0)
            await cartService.update(cart._id, cart.includedProducts)
            const newTicket = await ticketService.create({
                code: uuidv4(),
                purchase_datetime: new Date(),
                amount: amount,
                purchaser: user.email,
            })
                        
            for (const availableProduct of availableProducts) {
                await productService.update(
                { _id: availableProduct.product._id },         
                { $inc: {stock: - availableProduct.quantity}}  
                );
            }

            const noProcesedProducts = []
            
            cart.includedProducts.forEach(el => noProcesedProducts.push({ 
                    product: el.product.title,
                    id: el.product._id,
                })
            )

            await mailService.sendMail({
                to: user.email,
                subject: "Purchase details",
                html: `<h1>Purchase details:</h1><p>${newTicket}</p><h1>Excluded products:</h1><p>${noProcesedProducts}</p>`,
            })

            res.status(200).json({Ticket: newTicket, Products_without_stock: noProcesedProducts})

        }catch(error){
            res.status(500).json(`Error: ${error}`)
        }
    }
}



export const cartController = new CartController
