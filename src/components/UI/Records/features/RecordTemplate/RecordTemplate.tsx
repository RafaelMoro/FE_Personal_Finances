/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';
import { Formik, Field } from 'formik';
import { Switch } from 'formik-mui';
import { useAtom } from 'jotai';
import dayjs from 'dayjs';

/** Constants, atoms, interfaces, hooks */
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { recordToBeModifiedAtom, selectedAccountAtom } from '../../../../../atoms';
import { useRecords } from '../../../../../hooks/useRecords';
import { useIndebtedPeople } from '../../../../../hooks/useIndebtedPeople';
import {
  RecordTemplateProps, AdditionalData, TypeOfRecord,
} from './interface';
import { CreateRecordValues } from '../../interface';
import { EditCategory, ExpensePaid, IndebtedPeople } from '../../../../../globalInterface';

/** Components */
import { CategoriesAndSubcategories } from '../CategoriesAndSubcategories';
import { ShowExpenses } from '../ShowExpenses';
import { SelectExpenses } from '../SelectExpenses';
import { AddChip } from '../AddChip/AddChip';
import { AddIndebtedPerson } from '../AddIndebtedPerson/AddIndebtedPerson';
import { ShowIndebtedPeople } from '../ShowIndebtedPeople';
import { DateTimePickerValue } from '../../../DateTimePickerValue';
import {
  ParagraphTitle, InputForm, PrimaryButton, InputAdornment,
  CancelButton, AnchorButton, FlexContainer, FormControlLabel,
  SecondaryButton, ToggleButton,
} from '../../../../../styles';

/** Styles */
import {
  RecordTemplateMain, GoBackButton, FormContainer, AddChipContainer, ToggleButtonGroup, ShowIndebtedPeopleContainer,
} from './RecordTemplate.styled';

/** Utils */
import NumericFormatCustom from '../../../../Other/NumericFormatCustom';
import { CreateRecordSchema } from '../../../../../validationsSchemas/records.schema';
import { CloseIcon } from '../../../Icons';

const RecordTemplate = ({ edit = false }: RecordTemplateProps) => {
  const {
    createExpense, createIncome, editExpense, editIncome,
  } = useRecords({});
  const {
    modal: indebtedPersonModal,
    openModal,
    closeModal,
    indebtedPeople,
    addIndebtedPerson,
    addIndebtedPeopleForEdit,
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
    if (edit && recordToBeEdited?.shortName) {
      // Set record type to income if it's an income.
      if (recordToBeEdited?.expensesPaid) {
        setTypeOfRecord('income');
      }

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

      // If the expense has indebted people, update it.
      const newIndebtedPeople = (recordToBeEdited?.indebtedPeople ?? []) as IndebtedPeople[];
      if (newIndebtedPeople.length > 0) {
        addIndebtedPeopleForEdit(newIndebtedPeople);
      }

      // If the income has expenses paid, update it.
      const expensesPaid = (recordToBeEdited?.expensesPaid ?? []) as ExpensePaid[];
      if (expensesPaid.length > 0) {
        setExpensesSelected(expensesPaid);
      }

      setInitialValues(newInitialValues);
      setAdditionalData(newAdditionalData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryToBeEdited.categoryName, edit, isCredit]);

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
    // Flag to know if amount has a different value from the initial value. If so, the query to update account amount will be executed.
    let amountTouched = false;
    if (recordToBeEdited?.amount !== Number(values?.amount)) {
      amountTouched = true;
    }

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
      if (edit) {
        const recordId = recordToBeEdited?._id ?? '';
        const previousAmount = recordToBeEdited?.amount ?? 0;
        editExpense(newValues, recordId, amountTouched, previousAmount);
        return;
      }
      createExpense(newValues);
      return;
    }

    if (edit) {
      const recordId = recordToBeEdited?._id ?? '';
      const previousAmount = recordToBeEdited?.amount ?? 0;
      editIncome(newValues, recordId, amountTouched, previousAmount);
      return;
    }
    createIncome(newValues);
  };

  return (
    <RecordTemplateMain>
      <GoBackButton to={DASHBOARD_ROUTE}>
        <CloseIcon />
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
          submitForm, errors, touched, values, setFieldValue,
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
              label="Description"
            />
            <CategoriesAndSubcategories
              errorCategory={errors.category}
              errorSubcategory={errors.subCategory}
              touchedCategory={touched.category}
              touchedSubCategory={touched.subCategory}
              categoryToBeEdited={categoryToBeEdited}
            />
            <AddChipContainer>
              <AddChip name="tag" label="Tag" action="tag" updateData={updateTags} chipsData={additionalData.tag} />
              <AddChip name="budget" label="Budget" action="budget" updateData={updateBudgets} chipsData={additionalData.budgets} />
            </AddChipContainer>
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
              <ShowIndebtedPeopleContainer>
                <ShowIndebtedPeople
                  indebtedPeople={indebtedPeople}
                  deleteIndebtedPerson={deleteIndebtedPerson}
                  modifyIndebtedPerson={fetchPersonToModify}
                />
                <FlexContainer justifyContent="center">
                  <SecondaryButton variant="contained" onClick={() => openAddPersonModal(values)} size="medium">Add Person</SecondaryButton>
                </FlexContainer>
              </ShowIndebtedPeopleContainer>
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
