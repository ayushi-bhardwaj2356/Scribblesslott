import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import localProducts from '../data/products';
import { fetchProducts } from '../services/api';

const ProductsContext = createContext(null);

function normalize(product) {
  return {
    ...product,
    id: product._id || product.slug,
    images: product.images?.length ? product.images : ['/images/products/magazine-vogue.jpg'],
  };
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let active = true;

    fetchProducts()
      .then((list) => {
        if (!active) return;
        if (!list.length) {
          setProducts(localProducts.map(normalize));
          setUsingFallback(true);
          return;
        }
        setProducts(list.map(normalize));
        setUsingFallback(false);
      })
      .catch(() => {
        if (!active) return;
        setProducts(localProducts.map(normalize));
        setUsingFallback(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({ products, loading, usingFallback }),
    [products, loading, usingFallback]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return context;
}
