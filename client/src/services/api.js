import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 12000,
});

export async function fetchProducts() {
  const { data } = await api.get('/products');
  return data.products || [];
}

export async function fetchProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data.product;
}

export async function createInquiry(payload) {
  const { data } = await api.post('/inquiries', payload);
  return data;
}

export default api;
