import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { formatPrice } from '../utils/format';
import usePageTitle from '../hooks/usePageTitle';

export default function ProductDetails() {
  const { slug } = useParams();
  const { products, loading } = useProducts();
  const product = products.find((item) => item.slug === slug || item.id === slug);
  const [activeImage, setActiveImage] = useState(0);
  usePageTitle(product?.name || 'Product');

  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <p className="muted">Opening this gift…</p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h1>We could not find that gift</h1>
          <Link className="btn" to="/shop">
            Back to the shop
          </Link>
        </div>
      </section>
    );
  }

  const image = product.images[activeImage] || product.images[0];
  const related = [
    ...products.filter((item) => item.slug !== product.slug && item.category === product.category),
    ...products.filter((item) => item.slug !== product.slug && item.featured && item.category !== product.category),
  ].slice(0, 4);

  return (
    <section className="section">
      <div className="container">
        <p className="breadcrumb">
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
            {product.category}
          </Link>
        </p>

        <div className="detail">
          <div>
            <div className="detail__image">
              <img src={image} alt={product.name} style={{ objectPosition: product.imagePosition || 'center' }} />
            </div>
            {product.images.length > 1 ? (
              <div className="detail__thumbs">
                {product.images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    className={index === activeImage ? 'is-active' : ''}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="detail__info">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="detail__price">{formatPrice(product.price)}</p>
            <p>{product.description}</p>
            <ul className="detail__meta">
              <li>
                <span>Customizable</span>
                <strong>{product.customizable ? 'Yes — tell us the details' : 'Ready in our studio style'}</strong>
              </li>
              {product.materials ? (
                <li>
                  <span>Materials</span>
                  <strong>{product.materials}</strong>
                </li>
              ) : null}
              <li>
                <span>Made in</span>
                <strong>Jaipur, with pan-India delivery</strong>
              </li>
            </ul>
            <div className="hero__actions">
              <Link className="btn" to={`/custom-order?type=order&product=${encodeURIComponent(product.name)}`}>
                Order Now
              </Link>
              <Link className="btn btn--ghost" to="/custom-order?type=custom">
                Ask for a variation
              </Link>
            </div>
            <p className="muted">Sample price. Final pricing is confirmed with you on WhatsApp.</p>
          </div>
        </div>

        {related.length ? (
          <div className="related">
            <div className="section__head">
              <p className="eyebrow">You may also like</p>
              <h2>Related gifts</h2>
            </div>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
