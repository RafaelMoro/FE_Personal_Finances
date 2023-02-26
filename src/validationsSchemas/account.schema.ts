import * as Yup from 'yup';
import { accountTitleValidation, accountAmountValidation } from './validations';

export const CreateAccountSchema = Yup.object({
  title: accountTitleValidation,
  amount: accountAmountValidation,
});
