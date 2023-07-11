import * as Yup from 'yup';
import {
  indebtedName, tagOrBudgetValidation, indebtedAmount, indebtedIsPaid,
} from './validations';

export const TagOrBudgetSchema = (name: string) => Yup.object({
  [name]: tagOrBudgetValidation,
});

export const IndebtedPeopleFormSchema = Yup.object({
  name: indebtedName,
  amount: indebtedAmount,
  amountPaid: indebtedAmount,
  isPaid: indebtedIsPaid,
});
