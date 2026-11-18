import { useSearchParams } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import PageHero from '../components/PageHero';
import usePageTitle from '../hooks/usePageTitle';

export default function CustomOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('type') === 'custom' ? 'custom' : 'order';
  usePageTitle(mode === 'custom' ? 'Custom gifts' : 'Order');

  function changeMode(nextMode) {
    const next = new URLSearchParams(searchParams);
    next.set('type', nextMode);
    if (nextMode === 'custom') next.delete('product');
    setSearchParams(next);
  }

  return (
    <>
      <PageHero
        eyebrow={mode === 'custom' ? 'Custom gifts' : 'Order on WhatsApp'}
        title={mode === 'custom' ? 'Tell us the gift you can picture' : 'Order a Scribblesslott piece'}
        text="Fill in the details. We save your inquiry and open WhatsApp with a message you can send to us."
      />
      <section className="section">
        <div className="container form-layout">
          <OrderForm mode={mode} showSwitch onModeChange={changeMode} />
          <aside className="form-aside">
            <h2>How ordering works</h2>
            <ol>
              <li>Share the gift, the occasion and any names or photographs.</li>
              <li>Send the prepared WhatsApp message.</li>
              <li>We confirm the price, making time and delivery.</li>
            </ol>
            <p>There is no cart and no online payment. The conversation stays with the studio.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
