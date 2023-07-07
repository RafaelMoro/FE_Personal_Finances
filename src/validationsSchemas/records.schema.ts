import * as Yup from 'yup';
import { tagOrBudgetValidation } from './validations';

export const TagOrBudgetSchema = (name: string) => Yup.object({
  [name]: tagOrBudgetValidation,
});
