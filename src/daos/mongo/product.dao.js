import { productModel } from "../../models/product.model.js"

export class ProductDao {
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

