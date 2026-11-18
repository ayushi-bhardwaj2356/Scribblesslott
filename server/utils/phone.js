export function normalizePhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
  if (!/^[6-9]\d{9}$/.test(local)) return '';
  return `+91${local}`;
}

export function isValidIndianPhone(value) {
  return Boolean(normalizePhone(value));
}
