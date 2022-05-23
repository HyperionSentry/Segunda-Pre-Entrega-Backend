const {ProductsModel} = require('../models/products');

class Productos {
  constructor() {
    
  }

  async save(product) {
    await ProductsModel.create(product)
  }


  async getById(number) {
    try {
      const items = await ProductsModel.findById(number);
      return items
    } catch (error) {
      console.log(error);
    }

  }

  async getAll() {
    const items = await ProductsModel.find();
    return items
  }

  async deleteById(number) {
    try {
      const item = await ProductsModel.findByIdAndDelete(number);
      return item
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    await ProductsModel.deleteMany({})
  }

  async update(id, newData) {
    const idDocumento = id;
  const item = await ProductsModel.findByIdAndUpdate(
    idDocumento,
    {},
    newData
  );

  return item;
  }
}

const ProductosController = new Productos();

module.exports = {
  ProductosController: ProductosController,
};