const {CartsModel} = require('../models/carts');

class Carrito {
  constructor() {
  }

  async addToCart(productToAdd) {
    const cart = await CartsModel.find();
    let cartId = (cart[0].id).toString();
    let cartProducts = cart[0].productos;
    
    if (cartProducts[0] == undefined) {
      cartProducts = [productToAdd]

    } else {
      cartProducts.push(productToAdd)

    }

    const cartUpdated = await CartsModel.findByIdAndUpdate(
      cartId,
      {productos: cartProducts},
      { new: true }
    );

    return cartUpdated
  }


  async newCart() {

    const nuevoCarrito ={
    productos: [],
    }
    await CartsModel.create(nuevoCarrito)

  }


  async listProduct(id) {
    try {
      const carrito = await CartsModel.findById(id);
      return carrito.productos
    } catch (error) {
      console.log(error);    
    }
  }


  async deleteCart(id) {
    try {
      await CartsModel.findByIdAndDelete(id);
      return true
    } catch (error) {
      console.log(error);    
    }
   
  }


  async deleteProductFromCart(id, id_prod) {
    try {
      const cart = await CartsModel.findById(id);
      let cartProducts = cart.productos;
      if (cartProducts[0] == undefined) {
        return false
  
      } else {
        const newProductsArray = cartProducts.filter( (product) => product._id != id_prod);
        const cartUpdated = await CartsModel.findByIdAndUpdate(
          id,
          {productos: newProductsArray},
          { new: true }
        );
        return cartUpdated
      }

    } catch (error) {
      console.log(error);    
    }    
  }
  
}

const CarritoController = new Carrito('carrito.json');

module.exports = {
    CarritoController: CarritoController,
  };