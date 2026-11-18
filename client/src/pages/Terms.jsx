import PageHero from '../components/PageHero';
import usePageTitle from '../hooks/usePageTitle';

export default function Terms() {
  usePageTitle('Terms and conditions');

  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="A simple note before you order"
        text="Scribblesslott is a handmade studio. These terms keep the order conversation clear."
      />
      <section className="section">
        <div className="container prose">
          <p>
            Prices on the website are sample prices. The final price, making time and delivery cost are confirmed
            with you on WhatsApp before any work begins. Placing a form does not charge you.
          </p>
          <p>
            Personalized pieces are made from the names, photographs and notes you share. Please check those details
            before we start. Handmade work can vary slightly from a photograph, and that small difference is part of
            it being made by hand.
          </p>
          <p>
            Delivery dates depend on the piece and your city. We send across India from Jaipur. If a date is very
            close, we will tell you honestly whether it can be done.
          </p>
          <p>Scribblesslott is based in Jaipur, Rajasthan, and is founded by Ayushi Bhardwaj.</p>
        </div>
      </section>
    </>
  );
}
