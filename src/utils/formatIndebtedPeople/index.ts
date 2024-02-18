import { IndebtedPeople, IndebtedPeopleTable } from '../../globalInterface';
import { formatValueToCurrency } from '../FormatNumberToCurrency';

export const formatIndebtedPeople = (indebtedPeople: IndebtedPeople[]): IndebtedPeopleTable[] => indebtedPeople.map((person) => ({
  ...person,
  amount: formatValueToCurrency(Number(person.amount)),
  amountPaid: formatValueToCurrency(Number(person.amountPaid)),
  restingDebt: formatValueToCurrency(Number(person.amount) - Number(person.amountPaid)),
}));
