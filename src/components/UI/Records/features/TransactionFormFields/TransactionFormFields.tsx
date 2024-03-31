/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FormikErrors, FormikTouched } from 'formik';
import { CreateRecordValues, CreateTransferValues } from '../../interface';
import { Category, TypeOfRecord } from '../../../../../globalInterface';

import { CurrencyAdornment } from './CurrencyAdornment';
import NumericFormatCustom from '../../../../Other/NumericFormatCustom';
import { DateTimePickerValue } from '../../../DateTimePickerValue';
import { CategoriesAndSubcategories } from '../CategoriesAndSubcategories';
import { AddChip } from '../AddChip';
import { InputForm } from '../../../../../styles';
import { AddChipContainer } from '../RecordTemplate/RecordTemplate.styled';

interface TransactionFormFieldsProps {
  typeOfRecord: TypeOfRecord;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  values: CreateRecordValues;
  errors: FormikErrors<CreateRecordValues | CreateTransferValues>;
  touched: FormikTouched<CreateRecordValues | CreateTransferValues>;
  categoryToBeEdited: Category | null;
  // @TODO: Fix any type using generic type
  updateTags: ({ values, newChips }: { values: any, newChips: string[] }) => void;
  updateBudgets: ({ values, newBudgets }: { values: any, newBudgets: string[] }) => void;
  tags: string[];
  budgets: string[];
}

const TransactionFormFields = ({
  typeOfRecord, setFieldValue, errors, touched, categoryToBeEdited, updateTags, updateBudgets, tags, budgets, values,
}: TransactionFormFieldsProps) => (
  <>
    <Field
      component={InputForm}
      name="amount"
      type="text"
      variant="standard"
      label="Amount"
      InputProps={{
        startAdornment: CurrencyAdornment({ typeOfRecord }),
        inputComponent: NumericFormatCustom as any,
      }}
    />
    <Field
      component={DateTimePickerValue}
      setFieldValueCb={setFieldValue}
      disableFuture
      name="date"
      label="Date and Time"
    />
    <Field
      component={InputForm}
      name="shortName"
      type="text"
      variant="standard"
      label="Short Description"
    />
    <Field
      component={InputForm}
      multiline
      rows={5}
      name="description"
      variant="standard"
      label="Description (Optional)"
    />
    <CategoriesAndSubcategories
      errorCategory={errors.category}
      errorSubcategory={errors.subCategory}
      touchedCategory={touched.category}
      touchedSubCategory={touched.subCategory}
      categoryToBeEdited={categoryToBeEdited}
    />
    <AddChipContainer>
      <AddChip name="tag" label="Tag (Optional)" action="tag" updateData={(newChips) => updateTags({ values, newChips })} chipsData={tags} />
      <AddChip
        name="budget"
        label="Budget (Optional)"
        action="budget"
        updateData={(newBudgets) => updateBudgets({ values, newBudgets })}
        chipsData={budgets}
      />
    </AddChipContainer>
  </>
);

export { TransactionFormFields };
