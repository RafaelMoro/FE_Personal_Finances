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

export const formatNumberToCurrency = (amount: number, currency: CurrencyOptions = 'USD'): string => {
  if (currency === 'MXN') return mexicanPeso.format(amount);
  return usDollar.format(amount);
};
