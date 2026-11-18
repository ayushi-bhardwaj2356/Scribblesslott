import { useEffect, useState } from 'react';
import { Instagram, Menu, MessageCircle, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { instagramUrl, whatsappLink } from '../config/brand';
import categories from '../data/categories';
import Logo from './Logo';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const location = useLocation();
  const chatLink = whatsappLink('Hello Scribblesslott! ❤️ I would like to know more about your gifts.');

  useEffect(() => {
    setOpen(false);
    setCategoriesOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav className="nav">
      <div className="container nav__inner">
        <Link to="/" className="brand" aria-label="Scribblesslott home">
          <Logo />
          <span>
            <strong>Scribblesslott</strong>
            <small>Where art heals one's soul</small>
          </span>
        </Link>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>

        <div id="site-menu" className={`nav__links ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/shop">Shop</NavLink>

          <div className={`dropdown ${categoriesOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="dropdown__button"
              aria-expanded={categoriesOpen}
              onClick={() => setCategoriesOpen((value) => !value)}
            >
              Categories
            </button>
            <div className="dropdown__menu">
              {categories.map((category) => (
                <Link key={category.slug} to={`/shop?category=${category.slug}`}>
                  {category.title || category.name}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/custom-order?type=custom">Custom Gifts</NavLink>
          <NavLink to="/about">Our Story</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          <div className="nav__icons">
            <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            {chatLink ? (
              <a href={chatLink} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
