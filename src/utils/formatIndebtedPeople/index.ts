import { IndebtedPeople, IndebtedPeopleTable } from '../../globalInterface';
import { formatNumberToCurrency } from '../FormatNumberToCurrency';

export const formatIndebtedPeople = (indebtedPeople: IndebtedPeople[]): IndebtedPeopleTable[] => indebtedPeople.map((person) => ({
  ...person,
  amount: formatNumberToCurrency(Number(person.amount)),
  amountPaid: formatNumberToCurrency(Number(person.amountPaid)),
  restingDebt: formatNumberToCurrency(Number(person.amount) - Number(person.amountPaid)),
}));
