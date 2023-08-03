/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useRef, useState } from 'react';
import { Close } from '@mui/icons-material';
import { Drawer } from '@mui/material';
import { Formik, Field } from 'formik';
import { Switch } from 'formik-mui';
import { useAtom } from 'jotai';

import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { selectedAccountAtom } from '../../../../../atoms';
import { RecordTemplateProps, AdditionalData, TypeOfRecord } from './interface';
import { CreateRecordValues, ExpensePaid } from '../../interface';
import { CategoriesAndSubcategories } from '../CategoriesAndSubcategories';
import { ShowExpenses } from '../ShowExpenses';
import { SelectExpenses } from '../SelectExpenses';
import {
  ParagraphTitle, InputForm, PrimaryButton, InputAdornment,
  CancelButton, AnchorButton, FlexContainer, FormControlLabel, DateTimePicker,
  SecondaryButton, ToggleButton,
} from '../../../../../styles';
import {
  RecordTemplateMain, GoBackButton, FormContainer, ChipsContainer, ToggleButtonGroup,
} from './RecordTemplate.styled';
import { AddChip } from '../AddChip/AddChip';
import { AddIndebtedPerson } from '../AddIndebtedPerson/AddIndebtedPerson';
import { IndebtedPeople } from '../../../../../globalInterface';
import { ShowIndebtedPeople } from '../ShowIndebtedPeople/ShowIndebtedPeople';
import NumericFormatCustom from '../../../../Other/NumericFormatCustom';

const RecordTemplate = ({ edit = false }: RecordTemplateProps) => {
  const action: string = edit ? 'Edit' : 'Create';
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const isCredit = selectedAccount?.accountType === 'Credit';
  const [addPersonModal, setAddPersonModal] = useState<boolean>(false);
  const [typeOfRecord, setTypeOfRecord] = useState<TypeOfRecord>('expense');
  const isExpense = typeOfRecord === 'expense';
  const [showExpenses, setShowExpenses] = useState<boolean>(false);
  const startAdornment = isExpense
    ? <InputAdornment position="start">- $</InputAdornment>
    : <InputAdornment position="start">+ $</InputAdornment>;
  const [indebtedPeople, setIndebtedPeople] = useState<IndebtedPeople []>([]);
  const [expensesSelected, setExpensesSelected] = useState<ExpensePaid[]>([]);
  const initialValues = useRef<CreateRecordValues>({
    amount: '',
    shortName: '',
    description: '',
    category: '',
    subCategory: '',
    // If is credit, the prop is false, otherwise it's true because only credit is paid later.
    isPaid: !isCredit,
    date: new Date(),
  });

  // This data is not included in initial values because are not part of the main form, hence, the data will be empty.
  const additionalData = useRef<AdditionalData>({
    budgets: [],
    tag: [],
  });

  const openAddPersonModal = (values: any) => {
    // save initial values
    initialValues.current = values;
    setAddPersonModal(true);
  };
  const closeAddPersonModal = () => setAddPersonModal(false);

  const toggleShowExpenses = (values: any) => {
    // save initial values
    initialValues.current = values;
    setShowExpenses(!showExpenses);
  };
  const closeShowExpenses = () => setShowExpenses(false);

  const changeTypeOfRecord = (event: React.MouseEvent<HTMLElement>, newTypeOfRecord: TypeOfRecord) => {
    setTypeOfRecord(newTypeOfRecord);
  };

  const addExpenseToIncome = (expenses: ExpensePaid[]) => setExpensesSelected(expenses);

  const updateTags = (newTags: string[]):void => {
    additionalData.current = { ...additionalData.current, tag: newTags };
  };

  const updateBudgets = (newBudgets: string[]):void => {
    additionalData.current = { ...additionalData.current, budgets: newBudgets };
  };

  const updateIndebtedPeople = (indebtedPerson: IndebtedPeople):void => {
    const newData = [...indebtedPeople];
    newData.push(indebtedPerson);
    setIndebtedPeople(newData);
  };

  // Change the handle Submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    const { isPaid, ...restValues } = values;
    const newValues = isExpense ? {
      ...values,
      ...additionalData.current,
      indebtedPeople,
      account: selectedAccount?._id,
    } : {
      ...restValues,
      ...additionalData.current,
      indebtedPeople: [],
      expensesPaid: expensesSelected,
      account: selectedAccount?._id,
    };
    // Agregar signo de peso al mandar el amount.
    console.log(newValues);
  };

  return (
    <RecordTemplateMain>
      <GoBackButton to={DASHBOARD_ROUTE}>
        <Close sx={{ fontSize: '3.5rem' }} />
      </GoBackButton>
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
      <ParagraphTitle align="center">
        {' '}
        { action }
        {' '}
        { typeOfRecord }
      </ParagraphTitle>
      <Formik
        initialValues={initialValues.current}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize
        validateOnMount
      >
        {({ submitForm, values, setFieldValue }) => (
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
              component={DateTimePicker}
              disableFuture
              name="date"
              onChange={(value: any) => setFieldValue('date', value.$d)}
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
            <CategoriesAndSubcategories />
            <ChipsContainer>
              <AddChip name="tag" label="Tag" action="tag" updateData={updateTags} />
              <AddChip name="budget" label="Budget" action="budget" updateData={updateBudgets} />
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
                <ShowIndebtedPeople indebtedPeople={indebtedPeople} />
                <FlexContainer justifyContent="center">
                  <SecondaryButton variant="contained" onClick={() => openAddPersonModal(values)} size="medium">Add Person</SecondaryButton>
                </FlexContainer>
              </>
            ) }
            { (typeOfRecord === 'income') && (
              <>
                <ShowExpenses expenses={expensesSelected} />
                <FlexContainer justifyContent="center">
                  <SecondaryButton variant="contained" onClick={() => toggleShowExpenses(values)} size="medium">Add Expense</SecondaryButton>
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
      <AddIndebtedPerson updateData={updateIndebtedPeople} open={addPersonModal} onClose={closeAddPersonModal} />
      <Drawer anchor="right" open={showExpenses} onClose={closeShowExpenses}>
        <SelectExpenses modifySelectedExpenses={addExpenseToIncome} selectedExpenses={expensesSelected} closeDrawer={closeShowExpenses} />
      </Drawer>
    </RecordTemplateMain>
  );
};

export { RecordTemplate };
