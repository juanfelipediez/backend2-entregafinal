export class CartDao {
    carts;
  
    constructor() {
      this.carts = [];
    }
  
    async getAll() {
      return this.carts;
    }
  
    async getById({ id }) {
      return this.carts.find((cart) => cart.id === id);
    }
  
    async create(cart) {
        if(this.carts.length){
          cart.id = this.carts[this.carts.length - 1].id + 1
      }else{
          cart.id = 1;
      }
  
      this.carts.push(cart);
    }
  }