import { Heart, Palette, Sparkles, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import categories from '../data/categories';
import { useProducts } from '../context/ProductsContext';
import usePageTitle from '../hooks/usePageTitle';

const reasons = [
  {
    icon: Heart,
    title: 'Handmade with Love',
    text: 'Every piece is made by hand, slowly, in Jaipur.',
  },
  {
    icon: Sparkles,
    title: 'Personalized Just for You',
    text: 'Names, photographs and little details that belong to one person.',
  },
  {
    icon: Palette,
    title: 'Affordable & Unique',
    text: 'Thoughtful gifts that do not need a luxury budget to feel special.',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    text: 'From Jaipur to doorsteps across the country.',
  },
];

const gallery = [
  { src: '/images/products/photo-magazine.jpg', alt: 'Customized photo magazine' },
  { src: '/images/products/photo-frame.jpg', alt: 'Personalized photo frame', position: '72% center' },
  { src: '/images/products/gift-hamper.jpg', alt: 'Wrapped gift hamper' },
  { src: '/images/products/collage-frame.jpg', alt: 'Photo collage frame' },
  { src: '/images/products/custom-bouquet.jpg', alt: 'Custom photo bouquet', position: '80% center' },
  { src: '/images/products/wooden-plaque.jpg', alt: 'Wooden photo plaque', position: '78% center' },
];

export default function Home() {
  usePageTitle('');
  const { products, loading } = useProducts();
  const featured = products.filter((product) => product.featured).slice(0, 8);

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="script">Turning emotions into timeless keepsakes</p>
            <h1>Where Art Heals One's Soul</h1>
            <p className="hero__lead">
              Thoughtful gifts, handmade creations & personalized memories — made with love just for you.
            </p>
            <div className="hero__actions">
              <Link className="btn" to="/shop">
                Explore Collection
              </Link>
              <Link className="btn btn--ghost" to="/custom-order?type=custom">
                Customize Your Gift
              </Link>
            </div>
          </div>

          <div className="hero__collage" aria-hidden="true">
            <figure>
              <img src="/images/products/photo-magazine.jpg" alt="" />
            </figure>
            <figure>
              <img src="/images/products/photo-frame.jpg" alt="" style={{ objectPosition: '72% center' }} />
            </figure>
            <figure>
              <img src="/images/products/gift-hamper.jpg" alt="" />
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">The collection</p>
            <h2>Shop by category</h2>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link key={category.slug} to={`/shop?category=${category.slug}`} className="category-card">
                <img src={category.image} alt="" style={{ objectPosition: category.imagePosition || 'center' }} />
                <span>
                  <strong>{category.title || category.name}</strong>
                  <small>{category.blurb}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--blush">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Most loved</p>
            <h2>Featured gifts</h2>
            <p>Customized photo magazines and frames are the pieces people come back for.</p>
          </div>
          {loading ? <p className="muted">Gathering the collection…</p> : null}
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="custom-band">
        <div className="container custom-band__inner">
          <p className="script">Made around your idea</p>
          <h2>Have something special in mind?</h2>
          <p>Tell us your idea, your occasion and your budget. We'll turn it into a thoughtful creation.</p>
          <Link className="btn" to="/custom-order?type=custom">
            Create Your Custom Gift
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Why Scribblesslott?</p>
            <h2>Gifts with a feeling in them</h2>
          </div>
          <div className="feature-grid">
            {reasons.map((reason) => (
              <article key={reason.title} className="feature">
                <reason.icon size={22} />
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--peach">
        <div className="container founder">
          <img src="/images/founder.jpg" alt="Ayushi Bhardwaj, founder of Scribblesslott" />
          <div>
            <p className="eyebrow">The founder</p>
            <h2>Ayushi Bhardwaj</h2>
            <p>
              What started with my love for art and creativity in 2022 has grown into Scribblesslott — a brand
              where creativity meets emotions. Every creation is made to turn little moments into memories that
              people cherish forever.
            </p>
            <Link className="btn btn--ghost" to="/about">
              Read our story
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head section__head--row">
            <div>
              <p className="eyebrow">From the studio</p>
              <h2>A glimpse of the work</h2>
            </div>
            <a className="btn btn--ghost" href="https://www.instagram.com/scribblesslott/" target="_blank" rel="noreferrer">
              Visit Instagram
            </a>
          </div>
          <div className="gallery">
            {gallery.map((item) => (
              <figure key={item.src}>
                <img src={item.src} alt={item.alt} style={{ objectPosition: item.position || 'center' }} />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
