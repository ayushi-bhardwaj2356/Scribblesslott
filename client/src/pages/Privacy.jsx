import PageHero from '../components/PageHero';
import { contactEmail } from '../config/brand';
import usePageTitle from '../hooks/usePageTitle';

export default function Privacy() {
  usePageTitle('Privacy policy');

  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="How we keep what you share"
        text="Scribblesslott only asks for what we need to make and deliver your gift."
      />
      <section className="section">
        <div className="container prose">
          <p>
            When you send an order or a question, we store your name, phone number, city and the details of the gift
            so we can reply and make it. We do not run customer accounts, and we do not take payment on this website.
          </p>
          <p>
            Messages continue on WhatsApp or email, which have their own privacy practices. We do not sell your
            details. Photographs you share for a custom piece are used only to make that piece.
          </p>
          <p>
            If you would like an inquiry removed, write to {contactEmail} and we will delete it from our records.
          </p>
        </div>
      </section>
    </>
  );
}
