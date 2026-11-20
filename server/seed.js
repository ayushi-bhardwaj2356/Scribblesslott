import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';
import products from './data/products.js';

export async function seedProducts() {
  const slugs = products.map((product) => product.slug);

  for (const product of products) {
    await Product.findOneAndUpdate({ slug: product.slug }, product, {
      upsert: true,
      returnDocument: 'after',
      setDefaultsOnInsert: true,
    });
  }

  const removed = await Product.deleteMany({ slug: { $nin: slugs } });
  console.log(`Seeded ${products.length} products. Removed ${removed.deletedCount} old products.`);
}

const runDirectly = process.argv[1] && process.argv[1].endsWith('seed.js');

if (runDirectly) {
  const connected = await connectDB();
  if (!connected) {
    console.error('Cannot seed without a MongoDB connection.');
    process.exit(1);
  }

  try {
    await seedProducts();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}
