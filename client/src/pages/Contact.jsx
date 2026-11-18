import { Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import OrderForm from '../components/OrderForm';
import PageHero from '../components/PageHero';
import { altPhone, contactEmail, formatPhone, instagramUrl, whatsappLink, whatsappNumber } from '../config/brand';
import usePageTitle from '../hooks/usePageTitle';

export default function Contact() {
  usePageTitle('Contact');
  const chatLink = whatsappLink('Hello Scribblesslott! ❤️ I would like to get in touch.');

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to the studio"
        text="Orders, custom ideas and questions all come back to a real conversation. WhatsApp is the quickest way."
      />

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-cards">
            {chatLink ? (
              <a className="contact-card" href={chatLink} target="_blank" rel="noreferrer">
                <MessageCircle />
                <span>
                  <strong>WhatsApp</strong>
                  <small>{formatPhone(whatsappNumber)}</small>
                </span>
              </a>
            ) : (
              <article className="contact-card">
                <MessageCircle />
                <span>
                  <strong>WhatsApp</strong>
                  <small>Add VITE_WHATSAPP_NUMBER in client/.env</small>
                </span>
              </article>
            )}

            {altPhone ? (
              <article className="contact-card">
                <MessageCircle />
                <span>
                  <strong>Also reachable</strong>
                  <small>{formatPhone(altPhone)}</small>
                </span>
              </article>
            ) : null}

            <a className="contact-card" href={instagramUrl} target="_blank" rel="noreferrer">
              <Instagram />
              <span>
                <strong>Instagram</strong>
                <small>@scribblesslott</small>
              </span>
            </a>

            <a className="contact-card" href={`mailto:${contactEmail}`}>
              <Mail />
              <span>
                <strong>Email</strong>
                <small>{contactEmail}</small>
              </span>
            </a>

            <article className="contact-card">
              <MapPin />
              <span>
                <strong>Studio</strong>
                <small>Jaipur, Rajasthan, India</small>
              </span>
            </article>
          </div>

          <OrderForm mode="contact" />
        </div>
      </section>
    </>
  );
}
