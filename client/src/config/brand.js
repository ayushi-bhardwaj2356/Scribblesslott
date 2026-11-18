function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

export const whatsappNumber = onlyDigits(import.meta.env.VITE_WHATSAPP_NUMBER);
export const altPhone = onlyDigits(import.meta.env.VITE_ALT_PHONE);
export const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'scribblesslott@gmail.com';
export const instagramUrl =
  import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/scribblesslott/';

export function formatPhone(value) {
  const raw = onlyDigits(value);
  const local = raw.length === 12 && raw.startsWith('91') ? raw.slice(2) : raw;
  if (local.length !== 10) return '';
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
}

export function whatsappLink(text) {
  if (!whatsappNumber) return '';
  const base = `https://wa.me/${whatsappNumber}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
