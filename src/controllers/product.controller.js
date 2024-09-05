import { productService } from "../services/index.js"

class ProductController {
    async getProduct(req, res){
        try{        
            const products = await productService.getAll()
            if(products.length < 1){
                res.status(200).json("There are no products yet")
                return
            }
            res.status(200).json(products)
    
        }catch(error){
            res.status(500).json(`Error: ${error}`)
        }
    
    }

    async getProductById(req, res){
        try{        
            const { pid } = req.params
            const product = await productService.getById(pid)
    
            if(!product){
                res.status(400).json(`The ID ${pid} doesn't exist.`)
                return
            }
            res.status(200).json(product)
        }catch(error){
            res.status(500).json(`Error: ${error}`)
        }
    
    }

    async createProduct(req, res){
        const {title, description, code, price, status, stock, category, thumbnails} = req.body

        if(!title || !description || !code || !price || !stock || !category || !status){
            res.status(400).json("All this properties are required: title, description, code, price, status, stock, category")
            return
        }
    
        const newProduct = {
            title: title,
            code: code,
            description: description,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnails: thumbnails,
        }
        const product = await productService.create(newProduct)
        
        res.status(201).json(`The product ${title} was successfully created.`)
    
    }

    async editProduct(req, res){
        try{
            const {title, description, code, price, status, stock, category, thumbnails} = req.body
            const { pid } = req.params
    
            if(!pid){
                res.status(400).json(`The ID ${pid} doesn't exist.`)
                return
            }
    
            const product = await productService.update(pid, {$set: req.body})
    
        res.status(200).json(`The product ${title} was successfully edited.`)
    
        }catch(error){
            res.status(500).json(`Error: ${error}`)
        }
    
    }

    async deleteProduct(req, res){
        try{
            const { pid } = req.params
    
            if(!pid){
                res.status(400).json(`The ID ${pid} doesn't exist.`)
                return
            }
    
            const product = await productService.getById(pid)
            const productTitle = product.title
            await productService.delete(pid)
    
        res.status(200).json(`The product ${productTitle} was successfully deleted.`)
    
        }catch(error){
            res.status(500).json(`Error: ${error}`)
        }
    }
}

export const productController = new ProductController

