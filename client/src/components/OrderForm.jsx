import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createInquiry } from '../services/api';
import { buildWhatsAppMessage, createWhatsAppUrl, openWhatsApp } from '../services/whatsapp';
import { todayInputValue } from '../utils/format';
import { validateInquiry } from '../utils/validation';

const occasions = ['Birthday', 'Anniversary', 'Wedding', 'Raksha Bandhan', 'Farewell', 'Festival', 'Just because'];

const budgetRanges = ['Under ₹500', '₹500 – ₹1,000', '₹1,000 – ₹2,500', '₹2,500 – ₹5,000', 'Above ₹5,000'];

const emptyValues = {
  customerName: '',
  phone: '',
  productName: '',
  quantity: 1,
  occasion: '',
  customization: '',
  budget: '',
  deliveryDate: '',
  city: '',
  message: '',
};

function Field({ id, label, error, children, required = false }) {
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? <p className="field__error">{error}</p> : null}
    </div>
  );
}

export default function OrderForm({ mode = 'order', showSwitch = false, onModeChange }) {
  const [searchParams] = useSearchParams();
  const prefilledProduct = searchParams.get('product') || '';
  const [values, setValues] = useState(() => ({
    ...emptyValues,
    productName: prefilledProduct,
  }));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!prefilledProduct) return;
    setValues((current) => ({ ...current, productName: prefilledProduct }));
  }, [prefilledProduct]);
  const [status, setStatus] = useState('idle');
  const [notice, setNotice] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const minDate = todayInputValue();

  const heading = useMemo(() => {
    if (mode === 'contact') return 'Send a message';
    if (mode === 'custom') return 'Design a custom gift';
    return 'Place your order';
  }, [mode]);

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function resetForm() {
    setValues({ ...emptyValues, productName: mode === 'order' ? prefilledProduct : '' });
    setErrors({});
    setStatus('idle');
    setNotice('');
    setWhatsappUrl('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateInquiry(values, mode);
    setErrors(nextErrors);
    setNotice('');

    if (Object.keys(nextErrors).length) {
      setStatus('idle');
      return;
    }

    let message = '';
    try {
      message = buildWhatsAppMessage(values, mode);
      const url = createWhatsAppUrl(message);
      setWhatsappUrl(url);
      openWhatsApp(message);
    } catch (error) {
      setStatus('idle');
      setNotice(error.message);
      return;
    }

    setStatus('saving');

    try {
      await createInquiry({
        customerName: values.customerName.trim(),
        phone: values.phone.trim(),
        productName: mode === 'order' ? values.productName.trim() : '',
        quantity: mode === 'order' ? Number(values.quantity) : 1,
        occasion: values.occasion.trim(),
        customization: values.customization.trim(),
        budget: values.budget.trim(),
        deliveryDate: values.deliveryDate,
        city: values.city.trim(),
        message: values.message.trim(),
        inquiryType: mode,
      });
      setStatus('success');
      setNotice('Your inquiry is saved. WhatsApp should be open with your message — please press send.');
    } catch (error) {
      setStatus('warning');
      setNotice(
        error.response?.data?.message ||
          'We could not save this on the server, but WhatsApp is open so your inquiry is not lost. Please send the message.'
      );
    }
  }

  if (status === 'success' || status === 'warning') {
    return (
      <section className="form-card success-card" aria-live="polite">
        <p className="eyebrow">{status === 'success' ? 'Next step' : 'Please still send it'}</p>
        <h2>{status === 'success' ? 'Your message is ready on WhatsApp' : 'WhatsApp is open'}</h2>
        <p>{notice}</p>
        {whatsappUrl ? (
          <a className="btn" href={whatsappUrl} target="_blank" rel="noreferrer">
            Open WhatsApp again
          </a>
        ) : null}
        <button type="button" className="btn btn--ghost" onClick={resetForm}>
          Send another inquiry
        </button>
      </section>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-card__head">
        <p className="eyebrow">WhatsApp order</p>
        <h2>{heading}</h2>
        <p>No payment on the website. Share the details, then send the ready message on WhatsApp.</p>
      </div>

      {showSwitch ? (
        <div className="form-switch" role="tablist" aria-label="Inquiry type">
          <button
            type="button"
            className={mode === 'order' ? 'is-active' : ''}
            onClick={() => onModeChange?.('order')}
          >
            Order a product
          </button>
          <button
            type="button"
            className={mode === 'custom' ? 'is-active' : ''}
            onClick={() => onModeChange?.('custom')}
          >
            Design a custom gift
          </button>
        </div>
      ) : null}

      {notice ? <p className="form-notice">{notice}</p> : null}

      <div className="form-grid">
        <Field id="customerName" label="Full name" required error={errors.customerName}>
          <input
            id="customerName"
            name="customerName"
            value={values.customerName}
            onChange={update}
            autoComplete="name"
            placeholder="Your name"
          />
        </Field>

        <Field id="phone" label="Phone number" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            value={values.phone}
            onChange={update}
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile number"
          />
        </Field>

        {mode === 'order' ? (
          <>
            <Field id="productName" label="Product name" required error={errors.productName}>
              <input
                id="productName"
                name="productName"
                value={values.productName}
                onChange={update}
                placeholder="Which gift?"
              />
            </Field>
            <Field id="quantity" label="Quantity" required error={errors.quantity}>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                max="99"
                value={values.quantity}
                onChange={update}
              />
            </Field>
          </>
        ) : null}

        {mode !== 'contact' ? (
          <Field id="occasion" label="Occasion" error={errors.occasion}>
            <input
              id="occasion"
              name="occasion"
              value={values.occasion}
              onChange={update}
              placeholder="Birthday, wedding, just because…"
            />
          </Field>
        ) : null}

        {mode === 'custom' ? (
          <Field id="budget" label="Budget range" error={errors.budget}>
            <select id="budget" name="budget" value={values.budget} onChange={update}>
              <option value="">Choose a range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        {mode === 'order' ? (
          <Field id="budget" label="Budget" error={errors.budget}>
            <input
              id="budget"
              name="budget"
              value={values.budget}
              onChange={update}
              placeholder="Optional, for example ₹800"
            />
          </Field>
        ) : null}

        {mode !== 'contact' ? (
          <Field id="deliveryDate" label="Required delivery date" error={errors.deliveryDate}>
            <input
              id="deliveryDate"
              name="deliveryDate"
              type="date"
              min={minDate}
              value={values.deliveryDate}
              onChange={update}
            />
          </Field>
        ) : null}

        <Field id="city" label="Delivery city" error={errors.city}>
          <input id="city" name="city" value={values.city} onChange={update} placeholder="City" />
        </Field>
      </div>

      {mode !== 'contact' ? (
        <div className="occasion-picks">
          {occasions.map((occasion) => (
            <button
              key={occasion}
              type="button"
              className={values.occasion === occasion ? 'is-active' : ''}
              onClick={() => setValues((current) => ({ ...current, occasion }))}
            >
              {occasion}
            </button>
          ))}
        </div>
      ) : null}

      {mode === 'order' ? (
        <Field id="customization" label="Customization details" error={errors.customization}>
          <textarea
            id="customization"
            name="customization"
            rows="4"
            value={values.customization}
            onChange={update}
            placeholder="Names, colours, photographs, wording…"
          />
        </Field>
      ) : null}

      {mode === 'custom' ? (
        <Field id="customization" label="Gift idea / details" required error={errors.customization}>
          <textarea
            id="customization"
            name="customization"
            rows="5"
            value={values.customization}
            onChange={update}
            placeholder="Tell us the idea, the person and anything we should include."
          />
        </Field>
      ) : null}

      <Field
        id="message"
        label={mode === 'contact' ? 'Message' : 'Additional message'}
        required={mode === 'contact'}
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          rows="4"
          value={values.message}
          onChange={update}
          placeholder={mode === 'contact' ? 'How can we help?' : 'Optional note'}
        />
      </Field>

      <button className="btn btn--full" type="submit" disabled={status === 'saving'}>
        {status === 'saving'
          ? 'Saving your inquiry…'
          : mode === 'contact'
            ? 'Send message / Continue to WhatsApp'
            : mode === 'custom'
              ? 'Submit inquiry / Continue to WhatsApp'
              : 'Submit order / Continue to WhatsApp'}
      </button>
    </form>
  );
}
