import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
  shortDescription: { type: String, default: '', trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  images: { type: [String], default: [] },
  customizable: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  stock: { type: Number, default: null },
  materials: { type: String, default: '', trim: true },
  sortOrder: { type: Number, default: 0 },
  imagePosition: { type: String, default: 'center' },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
