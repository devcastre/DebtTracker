export function formatPhoneNumber(phone) {
  const number = String(phone).replace(/\D/g, '');

  if (number.startsWith('63')) {
    return `0${number.slice(2)}`;
  }

  if (number.startsWith('0')) {
    return number;
  }

  return `0${number}`;
}

export function toInternationalPhone(phone) {
  return `63${String(phone).replace(/\D/g, '').replace(/^0/, '')}`;
}