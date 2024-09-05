export class CartService {
    constructor(dao) {
      this.dao = dao;
    }
  
    async getAll() {
      return await this.dao.getAll();
    }
  
    async getById( id ) {
      return await this.dao.getById( id );
    }
  
    async create(cart) {
      return await this.dao.create(cart);
    }

    async update(id, includedProducts){
      return await this.dao.getByIdAndUpdate( id, includedProducts )
    }

    async getByIdAndPopulate(id){
      return await this.dao.getByIdAndPopulate( id )
    }
  }