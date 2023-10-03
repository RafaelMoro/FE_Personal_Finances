/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import { Drawer } from '@mui/material';
import { Formik, Field } from 'formik';
import { Switch } from 'formik-mui';
import { useAtom } from 'jotai';
import dayjs from 'dayjs';

import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { recordToBeModifiedAtom, selectedAccountAtom } from '../../../../../atoms';
import {
  RecordTemplateProps, AdditionalData, TypeOfRecord,
} from './interface';
import { CreateRecordValues } from '../../interface';
import { CategoriesAndSubcategories } from '../CategoriesAndSubcategories';
import { ShowExpenses } from '../ShowExpenses';
import { SelectExpenses } from '../SelectExpenses';
import {
  ParagraphTitle, InputForm, PrimaryButton, InputAdornment,
  CancelButton, AnchorButton, FlexContainer, FormControlLabel,
  SecondaryButton, ToggleButton,
} from '../../../../../styles';
import {
  RecordTemplateMain, GoBackButton, FormContainer, ChipsContainer, ToggleButtonGroup,
} from './RecordTemplate.styled';
import { AddChip } from '../AddChip/AddChip';
import { AddIndebtedPerson } from '../AddIndebtedPerson/AddIndebtedPerson';
import { EditCategory, ExpensePaid } from '../../../../../globalInterface';
import { ShowIndebtedPeople } from '../ShowIndebtedPeople/ShowIndebtedPeople';
import NumericFormatCustom from '../../../../Other/NumericFormatCustom';
import { CreateRecordSchema } from '../../../../../validationsSchemas/records.schema';
import { useRecords } from '../../../../../hooks/useRecords';
import { useIndebtedPeople } from '../../../../../hooks/useIndebtedPeople';
import { DateTimePickerValue } from '../../../DateTimePickerValue';

const RecordTemplate = ({ edit = false }: RecordTemplateProps) => {
  const { handleSubmitExpense, handleSubmitIncome } = useRecords({});
  const {
    modal: indebtedPersonModal,
    openModal,
    closeModal,
    indebtedPeople,
    addIndebtedPerson,
    deleteIndebtedPerson,
    updateIndebtedPerson,
    personToModify,
    fetchPersonToModify,
    action: indebtedPersonModalAction,
  } = useIndebtedPeople();

  const [recordToBeEdited] = useAtom(recordToBeModifiedAtom);
  const categoryToBeEdited = (recordToBeEdited?.category ?? '') as EditCategory;

  const action: string = edit ? 'Edit' : 'Create';
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const isCredit = selectedAccount?.accountType === 'Credit';
  const [typeOfRecord, setTypeOfRecord] = useState<TypeOfRecord>('expense');
  const isExpense = typeOfRecord === 'expense';
  const [showExpenses, setShowExpenses] = useState<boolean>(false);
  const startAdornment = isExpense
    ? <InputAdornment position="start">- $</InputAdornment>
    : <InputAdornment position="start">+ $</InputAdornment>;
  const [expensesSelected, setExpensesSelected] = useState<ExpensePaid[]>([]);
  const showExpenseText = expensesSelected.length === 0 ? 'Add Expense' : 'Add or Remove Expense';
  const [initialValues, setInitialValues] = useState<CreateRecordValues>({
    amount: '',
    shortName: '',
    description: '',
    category: '',
    subCategory: '',
    // If is credit, the prop is false, otherwise it's true because only credit is paid later.
    isPaid: !isCredit,
    date: dayjs(new Date()),
  });
  // This data is not included in initial values because are not part of the main form, hence, the data will be empty.
  const [additionalData, setAdditionalData] = useState<AdditionalData>({
    budgets: [],
    tag: [],
  });

  // Update edit data to the initial values
  useEffect(() => {
    if (edit && recordToBeEdited) {
      const newInitialValues: CreateRecordValues = {
        amount: String(recordToBeEdited.amount),
        shortName: recordToBeEdited.shortName,
        description: recordToBeEdited.description,
        category: categoryToBeEdited.categoryName,
        subCategory: recordToBeEdited.subCategory,
        isPaid: recordToBeEdited.isPaid ?? !isCredit,
        date: dayjs(recordToBeEdited.date),
      };
      const newAdditionalData: AdditionalData = {
        budgets: recordToBeEdited.budgets,
        tag: recordToBeEdited.tag,
      };

      setInitialValues(newInitialValues);
      setAdditionalData(newAdditionalData);
    }
  }, [categoryToBeEdited.categoryName, edit, isCredit, recordToBeEdited]);

  const openAddPersonModal = (values: any) => {
    // save initial values
    setInitialValues(values);
    openModal();
  };

  const toggleShowExpenses = (values: any) => {
    // save initial values
    setInitialValues(values);
    setShowExpenses(!showExpenses);
  };
  const closeShowExpenses = () => setShowExpenses(false);

  const changeTypeOfRecord = (event: React.MouseEvent<HTMLElement>, newTypeOfRecord: TypeOfRecord) => {
    setTypeOfRecord(newTypeOfRecord);
  };

  const addExpenseToIncome = (expenses: ExpensePaid[]) => setExpensesSelected(expenses);

  const updateTags = (newTags: string[]):void => {
    setAdditionalData({ ...additionalData, tag: newTags });
  };

  const updateBudgets = (newBudgets: string[]):void => {
    setAdditionalData({ ...additionalData, budgets: newBudgets });
  };

  // Change the handle Submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    const {
      isPaid, amount, ...restValues
    } = values;
    const amountToNumber = Number(amount);
    const newValues = isExpense ? {
      ...values,
      ...additionalData,
      amount: amountToNumber,
      indebtedPeople,
      account: selectedAccount?._id,
    } : {
      ...restValues,
      ...additionalData,
      amount: amountToNumber,
      indebtedPeople: [],
      expensesPaid: expensesSelected,
      account: selectedAccount?._id,
    };

    if (isExpense) {
      handleSubmitExpense(newValues);
      return;
    }

    handleSubmitIncome(newValues);
  };

  return (
    <RecordTemplateMain>
      <GoBackButton to={DASHBOARD_ROUTE}>
        <Close sx={{ fontSize: '3.5rem' }} />
      </GoBackButton>
      { (!edit) && (
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={typeOfRecord}
          onChange={changeTypeOfRecord}
          aria-label="Select type of record"
        >
          <ToggleButton value="expense">Expense</ToggleButton>
          <ToggleButton value="income">Income</ToggleButton>
        </ToggleButtonGroup>
      ) }
      <ParagraphTitle align="center">
        {' '}
        { action }
        {' '}
        { typeOfRecord }
      </ParagraphTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={CreateRecordSchema}
        enableReinitialize
        validateOnMount
      >
        {({
          submitForm, errors, touched, values,
        }) => (
          <FormContainer>
            <Field
              component={InputForm}
              name="amount"
              type="text"
              variant="standard"
              label="Amount"
              InputProps={{
                startAdornment,
                inputComponent: NumericFormatCustom as any,
              }}
            />
            <Field
              component={DateTimePickerValue}
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
              label="Description"
            />
            <CategoriesAndSubcategories
              errorCategory={errors.category}
              errorSubcategory={errors.subCategory}
              touchedCategory={touched.category}
              touchedSubCategory={touched.subCategory}
              categoryToBeEdited={categoryToBeEdited}
            />
            <ChipsContainer>
              <AddChip name="tag" label="Tag" action="tag" updateData={updateTags} chipsData={additionalData.tag} />
              <AddChip name="budget" label="Budget" action="budget" updateData={updateBudgets} chipsData={additionalData.budgets} />
            </ChipsContainer>
            { (isCredit && typeOfRecord === 'expense') && (
            <FormControlLabel
              control={(
                <Field
                  type="checkbox"
                  checked={values.isPaid}
                  label="Transaction paid"
                  name="isPaid"
                  component={Switch}
                />
              )}
              label="Transaction paid"
            />
            ) }
            { (typeOfRecord === 'expense') && (
            <>
              <ShowIndebtedPeople
                indebtedPeople={indebtedPeople}
                deleteIndebtedPerson={deleteIndebtedPerson}
                modifyIndebtedPerson={fetchPersonToModify}
              />
              <FlexContainer justifyContent="center">
                <SecondaryButton variant="contained" onClick={() => openAddPersonModal(values)} size="medium">Add Person</SecondaryButton>
              </FlexContainer>
            </>
            ) }
            { (typeOfRecord === 'income' && isCredit) && (
            <>
              <ShowExpenses usePagination expenses={expensesSelected} />
              <FlexContainer justifyContent="center">
                <SecondaryButton variant="contained" onClick={() => toggleShowExpenses(values)} size="medium">{showExpenseText}</SecondaryButton>
              </FlexContainer>
            </>
            ) }
            <FlexContainer justifyContent="space-between">
              <AnchorButton to={DASHBOARD_ROUTE}>
                <CancelButton variant="contained" size="medium">Cancel</CancelButton>
              </AnchorButton>
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">
                { action }
                {' '}
                Record
              </PrimaryButton>
            </FlexContainer>
          </FormContainer>
        )}
      </Formik>
      <AddIndebtedPerson
        addPerson={addIndebtedPerson}
        open={indebtedPersonModal}
        onClose={closeModal}
        indebtedPeople={indebtedPeople}
        indebtedPerson={personToModify}
        updatePerson={updateIndebtedPerson}
        modifyAction={indebtedPersonModalAction === 'Modify'}
      />
      <Drawer anchor="right" open={showExpenses} onClose={closeShowExpenses}>
        <SelectExpenses modifySelectedExpenses={addExpenseToIncome} selectedExpenses={expensesSelected} closeDrawer={closeShowExpenses} />
      </Drawer>
    </RecordTemplateMain>
  );
};

export { RecordTemplate };
