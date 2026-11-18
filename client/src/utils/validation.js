export function isValidIndianPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local);
}

export function validateInquiry(values, mode) {
  const errors = {};
  const name = values.customerName.trim();

  if (name.length < 2) {
    errors.customerName = 'Please enter your full name.';
  } else if (name.length > 80) {
    errors.customerName = 'Name should be under 80 characters.';
  }

  if (!isValidIndianPhone(values.phone)) {
    errors.phone = 'Enter a valid 10-digit mobile number.';
  }

  if (mode === 'order') {
    if (!values.productName.trim()) {
      errors.productName = 'Tell us which gift you would like.';
    }
    const quantity = Number(values.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      errors.quantity = 'Quantity should be between 1 and 99.';
    }
  }

  if (mode === 'custom' && values.customization.trim().length < 8) {
    errors.customization = 'Share a little about the gift you have in mind.';
  }

  if (mode === 'contact' && values.message.trim().length < 8) {
    errors.message = 'Write a short message so we know how to help.';
  }

  if (values.deliveryDate) {
    const selected = new Date(`${values.deliveryDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selected.getTime()) || selected < today) {
      errors.deliveryDate = 'Choose today or a future date.';
    }
  }

  return errors;
}
