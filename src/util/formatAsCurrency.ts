export default function formatAsCurrency(
    num: number,
    currency = 'USD',
) {
    const locale = window.navigator.languages[0] ?? 'en-US';
    return Number(num ?? 0).toLocaleString(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
     });
  }