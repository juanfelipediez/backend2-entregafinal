export class ProductDao {
  products;

  constructor() {
    this.products = [];
  }

  async getAll() {
    return this.products;
  }

  async getById({ id }) {
    return this.products.find((product) => product.id === id);
  }

  async create(product) {
      if(this.products.length){
        product.id = this.products[this.products.length - 1].id + 1
    }else{
        product.id = 1;
    }

    this.products.push(product);
  }
}