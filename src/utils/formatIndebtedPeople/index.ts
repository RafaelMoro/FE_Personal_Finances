import { IndebtedPeople, IndebtedPeopleTable } from '../../globalInterface';
import { formatValueToCurrency } from '../FormatNumberToCurrency';

export const formatIndebtedPeople = (indebtedPeople: IndebtedPeople[]): IndebtedPeopleTable[] => indebtedPeople.map((person) => ({
  ...person,
  amount: formatValueToCurrency(person.amount),
  amountPaid: formatValueToCurrency(person.amountPaid),
  restingDebt: formatValueToCurrency(Number(person.amount) - Number(person.amountPaid)),
}));
