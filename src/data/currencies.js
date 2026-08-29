export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0, name: 'US Dollar ($)' },
  { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro (€)' },
  { code: 'GBP', symbol: '£', rate: 0.78, name: 'British Pound (£)' },
  { code: 'JPY', symbol: '¥', rate: 150.0, name: 'Japanese Yen (¥)' },
  { code: 'AUD', symbol: 'A$', rate: 1.50, name: 'Australian Dollar (A$)' },
  { code: 'CAD', symbol: 'C$', rate: 1.35, name: 'Canadian Dollar (C$)' }
];

export function formatCurrency(amount, currencyCode = 'USD') {
  const curr = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
  const converted = Math.round(amount * curr.rate);
  return `${curr.symbol}${converted.toLocaleString()}`;
}
