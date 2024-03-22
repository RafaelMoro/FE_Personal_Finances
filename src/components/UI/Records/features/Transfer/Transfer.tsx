import dayjs from 'dayjs';
import { useState } from 'react';
import { Formik } from 'formik';

import { Drawer } from '@mui/material';
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
import { FormContainer, SecondaryButtonForm } from '../RecordTemplate/RecordTemplate.styled';
import { useRecords } from '../../../../../hooks/useRecords';
// Reuse imports on RecordTemplate
import { ShowExpenses } from '../ShowExpenses';
import { FlexContainer } from '../../../../../styles';
import { ExpensePaid } from '../../../../../globalInterface';
import { SelectExpenses } from '../SelectExpenses';

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
  const [isCreditDestinationAcc, setIsCreditDestinationAcc] = useState<boolean>(false);
  // Reuse show expenses and expenses selected state
  const [expensesSelected, setExpensesSelected] = useState<ExpensePaid[]>([]);
  const [showExpenses, setShowExpenses] = useState<boolean>(false);
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

  const showExpenseText = expensesSelected.length === 0 ? 'Add Expense' : 'Add or Remove Expense';

  const setDestinationAsCredit = () => setIsCreditDestinationAcc(true);
  const setDestinationAsNonCredit = () => setIsCreditDestinationAcc(false);
  const closeShowExpenses = () => setShowExpenses(false);
  const addExpenseToIncome = (expenses: ExpensePaid[]) => setExpensesSelected(expenses);
  const toggleShowExpenses = (values: CreateTransferValues) => {
    // save initial values
    setInitialValues(values);
    setShowExpenses(!showExpenses);
  };

  const updateTags = (newChips: string[]) => {
    setInitialValues({ ...initialValues, tag: newChips });
  };

  const updateBudgets = (newBudgets: string[]) => {
    setInitialValues({ ...initialValues, budgets: newBudgets });
  };

  const buttonText = `${action} transfer`;
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
      expensesPaid: expensesSelected,
      account: values.destinationAccount,
    };
    createTransfer({ valuesExpense: newValuesExpense, valuesIncome: newValuesIncome });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={TransferSchema}
        enableReinitialize
        validateOnMount
      >
        {({
          submitForm, errors, touched, setFieldValue, values,
        }) => {
          const hasErrors = Object.keys(errors).length > 0;
          return (
            <FormContainer>
              <TransferAccountSelector
                errorDestinationAccount={errors.destinationAccount}
                errorOriginAccount={errors.originAccount}
                touchedDestinationAccount={touched.destinationAccount}
                touchedOriginAccount={touched.originAccount}
                setDestinationAsCredit={setDestinationAsCredit}
                setDestinationAsNonCredit={setDestinationAsNonCredit}
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
              { (isCreditDestinationAcc) && (
              <>
                <ShowExpenses usePagination expenses={expensesSelected} />
                <FlexContainer justifyContent="center">
                  <SecondaryButtonForm variant="contained" onClick={() => toggleShowExpenses(values)} size="medium">
                    {showExpenseText}
                  </SecondaryButtonForm>
                </FlexContainer>
              </>
              ) }
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
      <Drawer anchor="right" open={showExpenses} onClose={closeShowExpenses}>
        <SelectExpenses modifySelectedExpenses={addExpenseToIncome} selectedExpenses={expensesSelected} closeDrawer={closeShowExpenses} />
      </Drawer>
    </>
  );
};

export { Transfer };
