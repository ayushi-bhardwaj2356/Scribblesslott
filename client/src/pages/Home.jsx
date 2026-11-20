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
  { src: '/images/products/magazine-udaipur.jpg', alt: 'Customized photo magazine' },
  { src: '/images/products/frame-couple.jpg', alt: 'Personalized photo frame' },
  { src: '/images/products/photo-bouquet.jpg', alt: 'Custom photo bouquet' },
  { src: '/images/products/lippan-peacock.jpg', alt: 'Handmade lippan art' },
  { src: '/images/products/chocolate-bouquet.jpg', alt: 'Chocolate bouquet' },
  { src: '/images/products/resin-tray.jpg', alt: 'Floral resin tray' },
];

export default function Home() {
  usePageTitle('');
  const { products, loading } = useProducts();
  const photoGifts = products
    .filter((product) => product.featured && product.category === 'Photo Gifts')
    .slice(0, 3);
  const handmadeGifts = products
    .filter((product) => product.featured && product.category !== 'Photo Gifts')
    .slice(0, 5);

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
              <img src="/images/products/magazine-vogue.jpg" alt="" />
            </figure>
            <figure>
              <img src="/images/products/frame-collage.jpg" alt="" />
            </figure>
            <figure>
              <img src="/images/products/ribbon-roses.jpg" alt="" />
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
            <h2>Photo magazines & frames</h2>
            <p>These are the gifts people come back for. A name, a date, and photographs that already belong to someone.</p>
          </div>
          {loading ? <p className="muted">Gathering the collection…</p> : null}
          <div className="product-grid">
            {photoGifts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Also made to order</p>
            <h2>Bouquets, hampers & art</h2>
            <p>Handmade pieces for birthdays, home, and the days that need more than a card.</p>
          </div>
          <div className="product-grid">
            {handmadeGifts.map((product) => (
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
            <p className="eyebrow">A note from the founder</p>
            <h2>I make gifts the way I would want to receive them.</h2>
            <p>
              In 2022 I started Scribblesslott from a small table in Jaipur, because the gifts I wanted to give
              were not sitting in shops. I wanted a magazine with someone’s name on the cover. A frame that held
              a whole friendship, not one stiff photograph. A hamper that felt chosen, not packed.
            </p>
            <p>
              That is still the work. Every order comes to me with a name, a few photographs, an occasion and a
              budget. I make it by hand in Jaipur, then send it across India. If you have an idea that is not on
              this page, write to me. The best pieces usually begin that way.
            </p>
            <p className="founder__sign">Ayushi Bhardwaj</p>
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
