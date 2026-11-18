import mongoose from 'mongoose';
import Product from '../models/Product.js';

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function getProducts(_req, res, next) {
  try {
    const products = await Product.find().sort({ sortOrder: 1, createdAt: -1 });
    res.json({ products });
  } catch (error) {
    next(error);
  }
}

export async function getProduct(req, res, next) {
  try {
    const { id } = req.params;
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    const product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ message: 'We could not find that product.' });
    }

    res.json({ product });
  } catch (error) {
    next(error);
  }
}

export async function getCategories(_req, res, next) {
  try {
    const rows = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const categories = rows.map((row) => ({
      name: row._id,
      slug: toSlug(row._id),
      count: row.count,
    }));

    res.json({ categories });
  } catch (error) {
    next(error);
  }
}
