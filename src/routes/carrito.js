const express = require('express');
const { CarritoController } = require('../controller/carrito');
const { ProductosController } = require('../controller/productos');

const router = express.Router();


router.get('/:id/productos', async (req, res) => {
  const { id } = req.params;

  const productsInCart = await CarritoController.listProduct(id)

  if (!productsInCart){
    return res.status(404).json({
      msg: 'Carrito no encontrado',
    });
  }else{
    res.json({
      productos: productsInCart,
    });
  }

});


router.post('/:id/productos', async (req, res) => {
  const { id } = req.params;
  const producto = await ProductosController.getById(id);

  if (!producto)
    return res.status(404).json({
      msg: 'Producto no encontrado',
    });

    const cartUpdated = await CarritoController.addToCart(producto);

    res.json({
      msg: "Producto añadido",
      carrito: cartUpdated,
    });

  
});

router.post('/', async (req, res) => {
    await CarritoController.newCart();

      res.json({
        msg: `CARRITO CREADO`,
      });
    });


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const carrito = await CarritoController.deleteCart(id)

  if (!carrito){
    return res.status(404).json({
      msg: 'Carrito no encontrado',
    });
  }else{
    res.json({
      msg: `Carrito con id ${id} Eliminado`,
    });
  }
  
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
  const { id, id_prod } = req.params;
  const producto = await ProductosController.getById(id_prod);

  if (!producto){
    return res.status(404).json({
      msg: 'Producto no encontrado',
    });
  } else {
    const carrito = await CarritoController.deleteProductFromCart(id, id_prod)
    if (!carrito){
      return res.status(404).json({
        msg: 'Carrito o producto dentro de carrito no encontrado',
      });
    }else{
      res.json({
        msg: `Producto eliminado del carrito`,
      });     
    }
  }


  
});

module.exports = router;