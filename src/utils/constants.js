export function formatCurrency(number, locale = 'id-ID', currency = 'IDR') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(number);
}

export const formatDateTime = (date) => {
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};