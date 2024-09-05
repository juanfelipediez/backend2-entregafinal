import { productModel } from "../models/product.model.js"

class ProductService {
    async create(newProduct){
        return await productModel.create(newProduct)
    }
    
    async getById(pid){
        return await productModel.findById(pid)
    }
    
    async getAll(){
        return await productModel.find()
    }
    
    async update(pid, product){
        return await productModel.findByIdAndUpdate(pid, product)
    }
    
    async delete(pid){
        return await productModel.findByIdAndDelete(pid)
    }
}

export const productService = new ProductService