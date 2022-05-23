const mongoose = require('mongoose');

const cartsCollectionName = 'carritos';

const cartsSchema = new mongoose.Schema(
  {
    productos: { type: Array, required: false },
  },
  { timestamps: true }
);


const CartsModel = mongoose.model(cartsCollectionName, cartsSchema);

module.exports = {CartsModel} ;

