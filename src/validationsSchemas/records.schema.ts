import * as Yup from 'yup';
import {
  indebtedName, tagOrBudgetValidation, indebtedIsPaid, stringRequired,
} from './validations';

export const TagOrBudgetSchema = (name: string) => {
  const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
  return Yup.object({
    [name]: tagOrBudgetValidation(`${capitalizeName} cannot be added empty.`),
  });
};

export const IndebtedPeopleFormSchema = Yup.object({
  name: indebtedName,
  amount: stringRequired('Amount field is required'),
  amountPaid: stringRequired('Amount Paid field is required'),
  isPaid: indebtedIsPaid,
});

export const CreateRecordSchema = Yup.object({
  shortName: stringRequired('Short description is required'),
  category: stringRequired('Category is required'),
  subCategory: stringRequired('Subcategory is required'),
  amount: stringRequired('Amount is required'),
});
