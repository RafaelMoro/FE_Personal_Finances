import dayjs from 'dayjs';
import { useState } from 'react';
import { Formik } from 'formik';

import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { useAppSelector } from '../../../../../redux/hooks';
import { AccountUI } from '../../../Account/interface';
import { CreateTransferValues } from '../../interface';
import { TypeOfRecord } from '../RecordTemplate/interface';
import { TransferSchema } from '../../../../../validationsSchemas/records.schema';
import { scrollToTop } from '../../../../../utils/ScrollToTop';

import { TransferAccountSelector } from '../TransferAccountSelector';
import { TransactionFormFields } from '../TransactionFormFields';
import { ActionButtonPanel } from '../../../../templates';
import { FormContainer } from '../RecordTemplate/RecordTemplate.styled';
import { useRecords } from '../../../../../hooks/useRecords';

interface TransferProps {
  action: string;
  typeOfRecord: TypeOfRecord;
}

const Transfer = ({ action, typeOfRecord }: TransferProps) => {
  const {
    createTransfer,
    isLoadingCreateExpense,
    isLoadingCreateIncome,
    isSucessCreateExpense,
    isSucessCreateIncome,
  } = useRecords({});
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const [initialValues, setInitialValues] = useState<CreateTransferValues>({
    originAccount: (selectedAccount as AccountUI)._id,
    destinationAccount: '',
    amount: '',
    shortName: '',
    description: '',
    category: '',
    subCategory: '',
    // If is credit, the prop is false, otherwise it's true because only credit is paid later.
    isPaid: true,
    date: dayjs(new Date()),
    budgets: [],
    tag: [],
  });

  const updateTags = (newChips: string[]) => {
    setInitialValues({ ...initialValues, tag: newChips });
  };

  const updateBudgets = (newBudgets: string[]) => {
    setInitialValues({ ...initialValues, budgets: newBudgets });
  };

  const buttonText = `${action} transfer`;
  // @TODO: Change this to the real values.
  const loadingMutation = isLoadingCreateExpense || isLoadingCreateIncome;
  const successMutation = isSucessCreateExpense && isSucessCreateIncome;

  const handleSubmit = (values: CreateTransferValues) => {
    const {
      isPaid, amount, destinationAccount, originAccount, ...restValues
    } = values;
    const amountToNumber = Number(amount);

    const newValuesExpense = {
      ...restValues,
      amount: amountToNumber,
      indebtedPeople: [],
      account: values.originAccount,
      isPaid: true,
    };
    const newValuesIncome = {
      ...restValues,
      amount: amountToNumber,
      indebtedPeople: [],
      expensesPaid: [],
      account: values.destinationAccount,
    };
    createTransfer({ valuesExpense: newValuesExpense, valuesIncome: newValuesIncome });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={TransferSchema}
      enableReinitialize
      validateOnMount
    >
      {({
        submitForm, errors, touched, setFieldValue,
      }) => {
        const hasErrors = Object.keys(errors).length > 0;
        return (
          <FormContainer>
            <TransferAccountSelector
              errorDestinationAccount={errors.destinationAccount}
              errorOriginAccount={errors.originAccount}
              touchedDestinationAccount={touched.destinationAccount}
              touchedOriginAccount={touched.originAccount}
            />
            <TransactionFormFields
              typeOfRecord={typeOfRecord}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              // @TODO Change this to the real value.
              categoryToBeEdited={null}
              updateBudgets={updateBudgets}
              updateTags={updateTags}
              tags={initialValues.tag}
              budgets={initialValues.budgets}
            />
            <ActionButtonPanel
              routeCancelButton={DASHBOARD_ROUTE}
              minWidthNumber="18"
              actionDataTestId="create-edit-transfer-button"
              submitButtonText={buttonText}
              loading={loadingMutation}
              success={successMutation}
              disableSubmitButton={loadingMutation || successMutation}
              submitForm={() => {
                if (hasErrors) {
                  scrollToTop();
                  submitForm();
                  return;
                }
                submitForm();
              }}
            />
          </FormContainer>
        );
      }}
    </Formik>
  );
};

export { Transfer };
