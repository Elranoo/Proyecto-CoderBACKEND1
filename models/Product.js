const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
  category: String,
  thumbnails: [String]
});

// Agregamos paginación
productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('products', productSchema);
