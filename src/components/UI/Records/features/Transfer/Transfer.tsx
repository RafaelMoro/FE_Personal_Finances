import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';

import { Drawer } from '@mui/material';
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { useAppSelector } from '../../../../../redux/hooks';
import { useRecords } from '../../../../../hooks/useRecords';
import { useCurrencyField } from '../../../../Other/CurrencyField/useCurrencyField';
import { CreateTransferValues } from '../../interface';
import { TypeOfRecord, ExpensePaid } from '../../../../../globalInterface';
import { TransferSchema } from '../../../../../validationsSchemas/records.schema';
import { scrollToTop } from '../../../../../utils/ScrollToTop';
import { getOriginAccount, getValuesIncomeAndExpense } from './Transfer.util';
import { formatCurrencyToString, resetLocalStorageWithUserOnly, symmetricDifferenceExpensesRelated } from '../../../../../utils';

import { TransferAccountSelector } from '../TransferAccountSelector';
import { TransactionFormFields } from '../TransactionFormFields';
import { ActionButtonPanel } from '../../../../templates';
import { FormContainer, SecondaryButtonForm } from '../RecordTemplate/RecordTemplate.styled';
// Reuse imports on RecordTemplate
import { ShowExpenses } from '../ShowExpenses';
import { FlexContainer } from '../../../../../styles';
import { SelectExpenses } from '../SelectExpenses';
import { useGuestUser } from '../../../../../hooks/useGuestUser/useGuestUser';
import { EditExpenseProps, EditIncomeProps } from '../../../../../hooks/useRecords/interface';

interface TransferProps {
  action: string;
  typeOfRecord: TypeOfRecord;
  edit?: boolean;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const Transfer = ({ action, typeOfRecord, edit = false }: TransferProps) => {
  const {
    createTransfer,
    createTransferLocal,
    editExpense,
    editIncome,
    editTransferLocal,
    isLoadingCreateTransfer,
    isSuccessCreateTransfer,
  } = useRecords({});
  const { initialAmount, updateAmount, verifyAmountEndsPeriod } = useCurrencyField();
  const { isGuestUser } = useGuestUser();

  const recordToBeEdited = useAppSelector((state) => state.records.recordToBeModified);
  const isIncome = !!recordToBeEdited?.expensesPaid;
  const categoryToBeEdited = recordToBeEdited?.category ?? null;
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const accounts = useAppSelector((state) => state.accounts.accounts);

  const [isCreditDestinationAcc, setIsCreditDestinationAcc] = useState<boolean>(false);
  // Reuse show expenses and expenses selected state
  const [expensesSelected, setExpensesSelected] = useState<ExpensePaid[]>([]);
  const [showExpenses, setShowExpenses] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<CreateTransferValues>({
    originAccount: getOriginAccount({
      isIncome, selectedAccount, recordToBeEdited, edit,
    }),
    destinationAccount: '',
    amount: '',
    shortName: '',
    description: '',
    category: '',
    subCategory: '',
    isPaid: true,
    date: dayjs().tz('America/Mexico_City'),
    budgets: [],
    tag: [],
  });

  // It's used to pass the destination account id to the SelectExpenses component
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

  const updateTags = ({ values, newChips }: { values: CreateTransferValues, newChips: string[] }) => {
    setInitialValues({ ...values, tag: newChips });
  };

  const updateBudgets = ({ values, newBudgets }: { values: CreateTransferValues, newBudgets: string[] }) => {
    setInitialValues({ ...values, budgets: newBudgets });
  };

  useEffect(() => {
    if (edit && recordToBeEdited) {
      const destinationAccount = isIncome ? recordToBeEdited.account : recordToBeEdited.transferRecord?.account ?? '';
      const newInitialValues: CreateTransferValues = {
        originAccount: getOriginAccount({
          isIncome, selectedAccount, recordToBeEdited, edit,
        }),
        destinationAccount,
        amount: String(recordToBeEdited.amount),
        shortName: recordToBeEdited.shortName,
        description: recordToBeEdited.description,
        category: recordToBeEdited.category.categoryName,
        subCategory: recordToBeEdited.subCategory,
        date: dayjs(recordToBeEdited.date),
        tag: recordToBeEdited.tag,
        budgets: recordToBeEdited.budgets,
      };
      // Show add expense button if destination is credit
      const destinationIsCredit = accounts?.find((account) => account._id === newInitialValues.destinationAccount)?.accountType === 'Credit';
      if (destinationIsCredit) {
        setDestinationAsCredit();
      }
      updateDestinationAccountId(destinationAccount);
      setInitialValues({
        ...newInitialValues,
        isPaid: true,
      });

      const expensesPaid = (recordToBeEdited?.expensesPaid ?? []) as ExpensePaid[];
      if (expensesPaid.length > 0) {
        setExpensesSelected(expensesPaid);
      }
    }
  }, [accounts, edit, isIncome, recordToBeEdited, selectedAccount]);

  const handleEditTransfer = async (values: CreateTransferValues) => {
    const isExpense = !recordToBeEdited?.expensesPaid;
    const recordIdExpense = isExpense ? (recordToBeEdited?._id ?? '') : (recordToBeEdited?.transferRecord?.transferId ?? '');
    const recordIdIncome = !isExpense ? (recordToBeEdited?._id ?? '') : (recordToBeEdited?.transferRecord?.transferId ?? '');
    const incomeAccount = !isExpense ? (recordToBeEdited?.account ?? '') : (recordToBeEdited?.transferRecord?.account ?? '');
    const expenseAccount = isExpense ? (recordToBeEdited?.account ?? '') : (recordToBeEdited?.transferRecord?.account ?? '');

    let amountTouched = false;
    if (recordToBeEdited?.amount !== Number(initialAmount.current)) {
      amountTouched = true;
    }
    const amountFormatted = formatCurrencyToString(values.amount);
    const newAmount = verifyAmountEndsPeriod(initialAmount.current || amountFormatted);
    const { amount, ...restValues } = values;
    const newValues = { ...restValues, amount: newAmount };
    const { newValuesIncome, newValuesExpense } = getValuesIncomeAndExpense({ values: newValues, expensesSelected });

    const previousAmount = recordToBeEdited?.amount ?? 0;
    const userIdRecord = recordToBeEdited?.userId ?? '';

    const expensePayload: EditExpenseProps = {
      values: newValuesExpense,
      recordId: recordIdExpense,
      amountTouched,
      previousAmount,
      userId: userIdRecord,
      accountId: expenseAccount,
    };

    if (!isGuestUser) {
      resetLocalStorageWithUserOnly();
      await editExpense(expensePayload);
    }

    const previousExpensesRelated = recordToBeEdited?.expensesPaid ?? [];
    const { oldRecords } = symmetricDifferenceExpensesRelated(previousExpensesRelated, expensesSelected);
    const incomePayload: EditIncomeProps = {
      values: newValuesIncome,
      recordId: recordIdIncome,
      amountTouched,
      previousAmount,
      previousExpensesRelated: oldRecords,
      userId: userIdRecord,
      accountId: incomeAccount,
    };

    if (!isGuestUser) {
      await editIncome(incomePayload);
    } else {
      editTransferLocal({ payloadIncome: incomePayload, payloadExpense: expensePayload });
    }
  };

  const handleCreateTransfer = (values: CreateTransferValues) => {
    const { amount, ...restValues } = values;
    const newAmount = verifyAmountEndsPeriod(initialAmount.current);
    const newValues = { ...restValues, amount: newAmount };
    const { newValuesIncome, newValuesExpense } = getValuesIncomeAndExpense({ values: newValues, expensesSelected });

    if (isGuestUser) {
      createTransferLocal({ valuesExpense: newValuesExpense, valuesIncome: newValuesIncome });
      return;
    }

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
                originAccountId={initialValues.originAccount}
              />
              <TransactionFormFields<CreateTransferValues>
                values={values}
                amount={values.amount}
                updateAmount={updateAmount}
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
