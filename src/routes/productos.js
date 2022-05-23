const express = require('express');
const { ProductosController } = require('../controller/productos');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  console.log("Autenticando");

  const isAdmin = true;

  if (isAdmin) {
    next()
  } else {
    res.status(401).json({
      msg:"No autorizado"
    })
  }
}


router.get('/', async (req, res) => {
  const productos = await ProductosController.getAll();
  res.json({
    data: productos,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params; 
  const producto = await ProductosController.getById(id);

  if (!producto)
    return res.status(404).json({
      msg: 'Producto no encontrado',
    });

  res.json({
    data: producto,
  });
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, price, thumbnail } = req.body;

  if (!title || !thumbnail || !price )
    return res.status(400).json({
      msg: 'Faltan datos requeridos',
    });

  const nuevoProducto = {
    title,
    thumbnail,
    price,
  };
  console.log(nuevoProducto);
  await ProductosController.save(nuevoProducto);

  res.json({
    msg: 'Producto agregado',
  });
});

router.put('/:id',authMiddleware, async (req, res) => {
  const { title, thumbnail, price } = req.body;
  const { id } = req.params;

  const producto = await ProductosController.getById(id);

  if (!producto)
    return res.status(404).json({
      msg: 'Producto no encontrado',
    });


  if (!title  || !thumbnail || !price)
    return res.status(400).json({
      msg: 'Faltan datos requeridos',
    });

  const nuevoProducto = {
    title,
    thumbnail,
    price,
  };
  
  const result = await ProductosController.update(id, nuevoProducto)

  res.json({
    data: result,
  });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params; 

  const producto = await ProductosController.deleteById(id)

  if (!producto)
  return res.status(404).json({
    msg: 'Producto no encontrado',
  });

  res.json({
    msg: `Producto con id: ${id} Eliminado`,
  });

});

router.delete('/', authMiddleware, async (req, res) => {

  ProductosController.deleteAll(
    
  )

  res.json({
    msg: `Productos eliminados`,
  });

});

module.exports = router;