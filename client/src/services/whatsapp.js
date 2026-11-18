import { whatsappLink, whatsappNumber } from '../config/brand';
import { formatDisplayDate } from '../utils/format';

function line(label, value) {
  const text = String(value || '').trim();
  return `${label}: ${text || '-'}`;
}

export function buildWhatsAppMessage(values, mode) {
  if (mode === 'contact') {
    return [
      'Hello Scribblesslott! ❤️ I would like to get in touch.',
      '',
      line('Name', values.customerName),
      line('Phone', values.phone),
      line('City', values.city),
      line('Message', values.message),
      '',
      'Please let me know how we can help.',
    ].join('\n');
  }

  if (mode === 'custom') {
    return [
      'Hello Scribblesslott! ❤️ I would like a completely customized gift.',
      '',
      line('Name', values.customerName),
      line('Phone', values.phone),
      line('Occasion', values.occasion),
      line('Budget', values.budget),
      line('Gift idea', values.customization),
      line('Required Delivery Date', values.deliveryDate ? formatDisplayDate(values.deliveryDate) : ''),
      line('City', values.city),
      '',
      'Please let me know the pricing and delivery details.',
    ].join('\n');
  }

  return [
    'Hello Scribblesslott! ❤️ I would like to place an order.',
    '',
    line('Name', values.customerName),
    line('Phone', values.phone),
    line('Product', values.productName),
    line('Quantity', values.quantity),
    line('Occasion', values.occasion),
    line('Customization', values.customization),
    line('Budget', values.budget),
    line('Required Delivery Date', values.deliveryDate ? formatDisplayDate(values.deliveryDate) : ''),
    line('City', values.city),
    line('Additional Message', values.message),
    '',
    'Please let me know the pricing and delivery details.',
  ].join('\n');
}

export function createWhatsAppUrl(message) {
  if (!whatsappNumber) {
    throw new Error('Add VITE_WHATSAPP_NUMBER in client/.env to open WhatsApp.');
  }
  return whatsappLink(message);
}

export function openWhatsApp(message) {
  const url = createWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
