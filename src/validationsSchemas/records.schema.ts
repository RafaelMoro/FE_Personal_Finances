import * as Yup from 'yup';
import {
  indebtedName, tagOrBudgetValidation, indebtedAmount, indebtedIsPaid, stringRequired,
} from './validations';

export const TagOrBudgetSchema = (name: string) => Yup.object({
  [name]: tagOrBudgetValidation,
});

export const IndebtedPeopleFormSchema = Yup.object({
  name: indebtedName,
  amount: indebtedAmount(true),
  amountPaid: indebtedAmount(),
  isPaid: indebtedIsPaid,
});

export const CreateRecordSchema = Yup.object({
  shortName: stringRequired('Short name is required'),
  category: stringRequired('Category is required'),
  subCategory: stringRequired('Subcategory is required'),
  amount: stringRequired('Amount is required'),
});
