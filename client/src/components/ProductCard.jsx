import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';

export default function ProductCard({ product }) {
  const image = product.images[0];
  const orderUrl = `/custom-order?type=order&product=${encodeURIComponent(product.name)}`;
  const loved = product.sortOrder <= 3 && product.featured;

  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card__media" tabIndex={-1} aria-hidden="true">
        <img
          src={image}
          alt=""
          style={{ objectPosition: product.imagePosition || 'center' }}
        />
        <span className="product-card__badges">
          {loved ? <span className="pill pill--loved">Most loved</span> : null}
          {product.customizable ? <span className="pill">Customizable</span> : null}
        </span>
      </Link>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3>
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-card__text">{product.shortDescription}</p>
        <p className="product-card__price">{formatPrice(product.price)}</p>
        <div className="product-card__actions">
          <Link className="btn btn--small" to={orderUrl}>
            Order Now
          </Link>
          <Link className="btn btn--small btn--ghost" to={`/product/${product.slug}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
