import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';

import { Drawer } from '@mui/material';
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { useAppSelector } from '../../../../../redux/hooks';
import { AccountUI } from '../../../Account/interface';
import { CreateTransferValues } from '../../interface';
import { TypeOfRecord, ExpensePaid } from '../../../../../globalInterface';
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
import { SelectExpenses } from '../SelectExpenses';
import { resetLocalStorageWithUserOnly, symmetricDifferenceExpensesRelated } from '../../../../../utils';
import { getValuesIncomeAndExpense } from './Transfer.util';

interface TransferProps {
  action: string;
  typeOfRecord: TypeOfRecord;
  edit?: boolean;
}

const Transfer = ({ action, typeOfRecord, edit = false }: TransferProps) => {
  const {
    createTransfer,
    editExpense,
    editIncome,
    isLoadingCreateTransfer,
    isSuccessCreateTransfer,
  } = useRecords({});
  const recordToBeEdited = useAppSelector((state) => state.records.recordToBeModified);
  const categoryToBeEdited = recordToBeEdited?.category ?? null;
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
    isPaid: true,
    date: dayjs(new Date()),
    budgets: [],
    tag: [],
  });

  const destinationAccountId = useRef('');

  const showExpenseText = expensesSelected.length === 0 ? 'Add Expense' : 'Add or Remove Expense';
  const buttonText = `${action} transfer`;

  const setDestinationAsCredit = () => setIsCreditDestinationAcc(true);
  const setDestinationAsNonCredit = () => setIsCreditDestinationAcc(false);
  const closeShowExpenses = () => setShowExpenses(false);
  const updateDestinationAccountId = (id: string) => {
    destinationAccountId.current = id;
  };
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

  useEffect(() => {
    if (edit && recordToBeEdited) {
      const isIncome = !!recordToBeEdited?.expensesPaid;
      const newInitialValues: CreateTransferValues = {
        // Origin account is always the expense.
        originAccount: !isIncome ? recordToBeEdited.account : recordToBeEdited.transferRecord?.account ?? '',
        destinationAccount: isIncome ? recordToBeEdited.account : recordToBeEdited.transferRecord?.account ?? '',
        amount: String(recordToBeEdited.amount),
        shortName: recordToBeEdited.shortName,
        description: recordToBeEdited.description,
        category: recordToBeEdited.category.categoryName,
        subCategory: recordToBeEdited.subCategory,
        date: dayjs(recordToBeEdited.date),
        tag: recordToBeEdited.tag,
        budgets: recordToBeEdited.budgets,
      };
      updateDestinationAccountId(recordToBeEdited.transferRecord?.account ?? '');
      setInitialValues({
        ...newInitialValues,
        isPaid: true,
      });
    }
  }, [edit, recordToBeEdited, selectedAccount]);

  const handleEditTransfer = async (values: CreateTransferValues) => {
    const isExpense = !recordToBeEdited?.expensesPaid;
    const recordIdExpense = isExpense ? (recordToBeEdited?._id ?? '') : (recordToBeEdited?.transferRecord?.transferId ?? '');
    const recordIdIncome = !isExpense ? (recordToBeEdited?._id ?? '') : (recordToBeEdited?.transferRecord?.transferId ?? '');
    const incomeAccount = !isExpense ? (recordToBeEdited?.account ?? '') : (recordToBeEdited?.transferRecord?.account ?? '');
    const expenseAccount = isExpense ? (recordToBeEdited?.account ?? '') : (recordToBeEdited?.transferRecord?.account ?? '');

    let amountTouched = false;
    if (recordToBeEdited?.amount !== Number(values?.amount)) {
      amountTouched = true;
    }
    const { newValuesIncome, newValuesExpense } = getValuesIncomeAndExpense({ values, expensesSelected });

    const previousAmount = recordToBeEdited?.amount ?? 0;
    const userIdRecord = recordToBeEdited?.userId ?? '';
    resetLocalStorageWithUserOnly();
    await editExpense({
      values: newValuesExpense,
      recordId: recordIdExpense,
      amountTouched,
      previousAmount,
      userId: userIdRecord,
      accountId: expenseAccount,
    });

    const previousExpensesRelated = recordToBeEdited?.expensesPaid ?? [];
    const { oldRecords } = symmetricDifferenceExpensesRelated(previousExpensesRelated, expensesSelected);
    await editIncome({
      values: newValuesIncome,
      recordId: recordIdIncome,
      amountTouched,
      previousAmount,
      previousExpensesRelated: oldRecords,
      userId: userIdRecord,
      accountId: incomeAccount,
    });
  };

  const handleCreateTransfer = (values: CreateTransferValues) => {
    const { newValuesIncome, newValuesExpense } = getValuesIncomeAndExpense({ values, expensesSelected });
    createTransfer({ valuesExpense: newValuesExpense, valuesIncome: newValuesIncome });
  };

  const handleSubmit = edit ? handleEditTransfer : handleCreateTransfer;

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
                updateDestinationAccountId={updateDestinationAccountId}
              />
              <TransactionFormFields
                typeOfRecord={typeOfRecord}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                categoryToBeEdited={categoryToBeEdited}
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
                loading={isLoadingCreateTransfer}
                success={isSuccessCreateTransfer}
                disableSubmitButton={isLoadingCreateTransfer || isSuccessCreateTransfer}
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
        <SelectExpenses
          modifySelectedExpenses={addExpenseToIncome}
          selectedExpenses={expensesSelected}
          closeDrawer={closeShowExpenses}
          accountId={destinationAccountId.current}
        />
      </Drawer>
    </>
  );
};

export { Transfer };
