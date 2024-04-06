export const formatCurrencyToNumber = (currency: string) => Number(currency.replace(/[^0-9.-]+/g, ''));

export const formatCurrencyToString = (currency: string) => currency.replace(/[^0-9.-]+/g, '');
