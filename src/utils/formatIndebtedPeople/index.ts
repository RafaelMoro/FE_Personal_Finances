import { IndebtedPeople, IndebtedPeopleTable } from '../../globalInterface';
import { formatNumberToCurrency } from '../FormatNumberToCurrency';

export const formatIndebtedPeople = (indebtedPeople: IndebtedPeople[]): IndebtedPeopleTable[] => indebtedPeople.map((person) => ({
  ...person,
  amount: formatNumberToCurrency(person.amount),
  amountPaid: formatNumberToCurrency(person.amountPaid),
  restingDebt: formatNumberToCurrency(person.amount - person.amountPaid),
}));
