import { IndebtedPeople, IndebtedPeopleTable } from '../../globalInterface';
import { formatValueToCurrency } from '../FormatNumberToCurrency';

export const formatIndebtedPeople = (indebtedPeople: IndebtedPeople[]): IndebtedPeopleTable[] => indebtedPeople.map((person) => ({
  ...person,
  amount: formatValueToCurrency({ amount: person.amount }),
  amountPaid: formatValueToCurrency({ amount: person.amountPaid }),
  restingDebt: formatValueToCurrency({ amount: Number(person.amount) - Number(person.amountPaid) }),
}));
