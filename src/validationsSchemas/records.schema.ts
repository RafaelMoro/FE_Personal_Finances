import * as Yup from 'yup';
import {
  indebtedName, tagOrBudgetValidation, indebtedIsPaid, stringRequired, shortNameValidation,
} from './validations';

export const TagOrBudgetSchema = (name: string) => {
  const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
  return Yup.object({
    [name]: tagOrBudgetValidation(`${capitalizeName} cannot be added empty.`),
  });
};

export const IndebtedPeopleFormSchema = Yup.object({
  name: indebtedName,
  amount: stringRequired('Amount is required'),
  amountPaid: stringRequired('Amount Paid is required'),
  isPaid: indebtedIsPaid,
});

const createRecordValidation = {
  shortName: shortNameValidation,
  description: Yup.string().min(3, 'Description is too short').max(300, 'Description is too long'),
  category: stringRequired('Category is required'),
  subCategory: stringRequired('Subcategory is required'),
  amount: stringRequired('Amount is required'),
};

export const CreateRecordSchema = Yup.object(createRecordValidation);

export const TransferSchema = Yup.object({
  ...createRecordValidation,
  originAccount: stringRequired('Origin account is required'),
  destinationAccount: stringRequired('Destination account is required'),
});
