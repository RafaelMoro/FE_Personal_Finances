/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FormikErrors, FormikTouched } from 'formik';
import { CreateRecordValues, CreateTransferValues } from '../../interface';
import { Category, TypeOfRecord } from '../../../../../globalInterface';

import { DateTimePickerValue } from '../../../DateTimePickerValue';
import { CategoriesAndSubcategories } from '../CategoriesAndSubcategories';
import { AddChip } from '../AddChip';
import { InputForm } from '../../../../../styles';
import { AddChipContainer } from '../RecordTemplate/RecordTemplate.styled';
import { CurrencyField } from '../../../../Other/CurrencyField';

interface TransactionFormFieldsProps<CreateAnyRecord> {
  typeOfRecord: TypeOfRecord;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  values: CreateAnyRecord;
  amount: string;
  updateAmount: (amount: string) => void;
  errors: FormikErrors<CreateRecordValues | CreateTransferValues>;
  touched: FormikTouched<CreateRecordValues | CreateTransferValues>;
  categoryToBeEdited: Category | null;
  updateTags: ({ values, newChips }: { values: CreateAnyRecord, newChips: string[] }) => void;
  updateBudgets: ({ values, newBudgets }: { values: CreateAnyRecord, newBudgets: string[] }) => void;
  tags: string[];
  budgets: string[];
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
const TransactionFormFields = <CreateAnyRecord,>({
  typeOfRecord, setFieldValue, errors, touched, categoryToBeEdited,
  updateTags, updateBudgets, tags, budgets, values, amount, updateAmount,
}: TransactionFormFieldsProps<CreateAnyRecord>) => (
  <>
    <CurrencyField
      setFieldValue={setFieldValue}
      amount={amount}
      updateAmount={updateAmount}
      typeOfRecord={typeOfRecord}
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
