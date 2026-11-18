import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import { getCategories } from './controllers/productController.js';
import Product from './models/Product.js';
import { seedProducts } from './seed.js';

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  const database = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ status: 'ok', database, service: 'scribblesslott-api' });
});

app.get('/api/categories', getCategories);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.use('/api', (_req, res) => {
  res.status(404).json({ message: 'That API route does not exist.' });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  const status = error.message === 'Not allowed by CORS' ? 403 : 500;
  res.status(status).json({
    message: status === 403 ? 'This origin is not allowed.' : 'Something went wrong. Please try again.',
  });
});

const server = app.listen(port, async () => {
  console.log(`Scribblesslott API listening on http://localhost:${port}`);
  const connected = await connectDB();

  if (!connected) return;

  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await seedProducts();
    }
  } catch (error) {
    console.error('Could not prepare the catalogue:', error.message);
  }
});

server.on('error', (error) => {
  console.error(error.message);
  process.exit(1);
});
