const CURRENCY = 'currency';
const MEXICAN_CURRENCY = 'MXN';
const USD_CURRENCY = 'USD';

type CurrencyOptions = 'USD' | 'MXN';

const mexicanPeso = Intl.NumberFormat('es-ES', {
  style: CURRENCY,
  currency: MEXICAN_CURRENCY,
  minimumFractionDigits: 2,
});

const usDollar = Intl.NumberFormat('en-US', {
  style: CURRENCY,
  currency: USD_CURRENCY,
  minimumFractionDigits: 2,
});

/*
* This function formats a number to usd or mexican currency.
* The props are:
*   amount: amount as number
*   currency: it can only be 'USD' or 'MXN'
* It returns the number formatted.
*/

export const formatValueToCurrency = (amount: number | string, currency: CurrencyOptions = 'USD'): string => {
  const transformedAmount = typeof amount === 'number' ? amount : Number(amount);
  if (currency === 'MXN') return mexicanPeso.format(transformedAmount);
  return usDollar.format(transformedAmount);
};
