import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import usePageTitle from '../hooks/usePageTitle';

const notes = [
  'Founded in 2022 in Jaipur',
  '2,500+ orders made with love',
  'Most new orders still arrive because someone told someone',
  'Delivered across India',
  'Top 100 Startups of Rajasthan — iStart BuilderX 2025',
  'Incubated at Poornima Business Incubation Centre',
  'GSEA semi-finalist, Jaipur',
  'Represented at Pravasi Rajasthani Divas 2025',
];

export default function About() {
  usePageTitle('Our Story');

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A small studio for gifts that feel like someone thought of you"
        text="Scribblesslott began in 2022 with a love for art, handmade work and the kind of gift a person keeps."
      />

      <section className="section">
        <div className="container about-intro">
          <img src="/images/founder.jpg" alt="Ayushi Bhardwaj, founder of Scribblesslott" />
          <div>
            <p className="eyebrow">Founder</p>
            <h2>Ayushi Bhardwaj</h2>
            <p>
              What started with a love for art and creativity has grown into a brand where memories, emotions and
              relationships are turned into handmade gifts. Ayushi blends that creative work with a practical wish:
              personalized gifting should be meaningful, and it should also be affordable.
            </p>
            <p>
              Scribblesslott is founder-led. The magazines, frames, hampers, resin pieces and bouquets are made to
              be specific to someone — a name, a photograph, a day — rather than pulled from a pile of identical
              things.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--peach">
        <div className="container story-grid">
          <article>
            <h2>Mission</h2>
            <p>
              To make thoughtful, handmade and personalized gifts that people can actually give — pieces that hold a
              feeling, without asking for a luxury budget.
            </p>
          </article>
          <article>
            <h2>Vision</h2>
            <p>
              To build India’s most loved personalized gifting brand by turning everyday moments into lasting
              memories, and by making room for emerging artists along the way.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container quote-block">
          <p className="script">A feeling, not just an object</p>
          <blockquote>People don’t just want to gift something. They want to gift a feeling.</blockquote>
          <p>
            That is the work: affordable customization, a wide emotional range of products, and care that stays with
            the founder. We would rather sell the feeling than a stack of inventory.
          </p>
        </div>
      </section>

      <section className="section section--blush">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Along the way</p>
            <h2>Still a studio. Already trusted.</h2>
          </div>
          <ul className="note-list">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="about-artists">
            Part of the longer hope is simple: support creative artists, keep handmade work alive, and create a way
            for students and emerging makers to earn from it.
          </p>
          <Link className="btn" to="/custom-order?type=custom">
            Create a custom gift
          </Link>
        </div>
      </section>
    </>
  );
}
