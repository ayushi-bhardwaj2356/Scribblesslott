import { Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactEmail, formatPhone, instagramUrl, whatsappLink, whatsappNumber, altPhone } from '../config/brand';
import categories from '../data/categories';
import Logo from './Logo';

export default function Footer() {
  const chatLink = whatsappLink('Hello Scribblesslott! ❤️ I would like to place an order.');

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="brand brand--footer">
            <Logo size={48} />
            <strong>Scribblesslott</strong>
          </div>
          <p className="footer__tagline">Where Art Heals One's Soul</p>
          <p>Handmade gifts, personalized with care in Jaipur and sent across India.</p>
        </div>

        <div>
          <h2>Visit</h2>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/custom-order?type=custom">Custom Gifts</Link>
          <Link to="/about">Our Story</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h2>Categories</h2>
          {categories.map((category) => (
            <Link key={category.slug} to={`/shop?category=${category.slug}`}>
              {category.title || category.name}
            </Link>
          ))}
        </div>

        <div>
          <h2>Say hello</h2>
          {chatLink ? (
            <a href={chatLink} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> WhatsApp {formatPhone(whatsappNumber)}
            </a>
          ) : null}
          {altPhone ? <p className="footer__note">Also on {formatPhone(altPhone)}</p> : null}
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            <Instagram size={16} /> Instagram
          </a>
          <a href={`mailto:${contactEmail}`}>
            <Mail size={16} /> {contactEmail}
          </a>
          <p className="footer__note">
            <MapPin size={16} /> Jaipur, Rajasthan, India
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Scribblesslott. Made with love in Jaipur.</p>
        <div>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms and conditions</Link>
        </div>
      </div>
    </footer>
  );
}
