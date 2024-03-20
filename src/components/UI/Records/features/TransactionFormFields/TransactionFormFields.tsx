/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FormikErrors, FormikTouched } from 'formik';
import { InputForm } from '../../../../../styles';
import { TypeOfRecord } from '../RecordTemplate/interface';
import { CurrencyAdornment } from './CurrencyAdornment';
import NumericFormatCustom from '../../../../Other/NumericFormatCustom';
import { DateTimePickerValue } from '../../../DateTimePickerValue';
import { CategoriesAndSubcategories } from '../CategoriesAndSubcategories';
import { CreateRecordValues, CreateTransferValues } from '../../interface';
import { Category } from '../../../../../globalInterface';

interface TransactionFormFieldsProps {
  typeOfRecord: TypeOfRecord;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  errors: FormikErrors<CreateRecordValues | CreateTransferValues>;
  touched: FormikTouched<CreateRecordValues | CreateTransferValues>;
  categoryToBeEdited: Category | null;
}

const TransactionFormFields = ({
  typeOfRecord, setFieldValue, errors, touched, categoryToBeEdited,
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
  </>
);

export { TransactionFormFields };
