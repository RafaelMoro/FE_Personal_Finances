/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useRef, useState } from 'react';
import { Close } from '@mui/icons-material';
import { Formik, Field } from 'formik';
import { Switch } from 'formik-mui';

import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { RecordTemplateProps, AdditionalData } from './interface';
import { CategoriesAndSubcategories } from '../CategoriesAndSubcategories';
import {
  ParagraphTitle, InputForm, PrimaryButton, InputAdornment,
  CancelButton, AnchorButton, FlexContainer, FormControlLabel, DateTimePicker,
  SecondaryButton,
} from '../../../../../styles';
import {
  RecordTemplateMain, GoBackButton, FormContainer, ChipsContainer,
} from './RecordTemplate.styled';
import { AddChip } from '../AddChip/AddChip';
import { AddIndebtedPerson } from '../AddIndebtedPerson/AddIndebtedPerson';
import { IndebtedPeople } from '../../../../../globalInterface';

const RecordTemplate = ({ edit = false }: RecordTemplateProps) => {
  const action: string = edit ? 'Edit' : 'Create';
  const [addPersonModal, setAddPersonModal] = useState<boolean>(false);
  const additionalData = useRef<AdditionalData>({
    budgets: [],
    tags: [],
    indebtedPeople: [],
  });

  const openAddPersonModal = () => setAddPersonModal(true);
  const closeAddPersonModal = () => setAddPersonModal(false);

  const updateTags = (newTags: string[]):void => {
    additionalData.current = { ...additionalData.current, tags: newTags };
  };

  const updateBudgets = (newBudgets: string[]):void => {
    additionalData.current = { ...additionalData.current, budgets: newBudgets };
  };

  const updateIndebtedPeople = (indebtedPeople: IndebtedPeople):void => {
    const oldData = [...additionalData.current.indebtedPeople];
    oldData.push(indebtedPeople);
    additionalData.current = { ...additionalData.current, indebtedPeople: oldData };
  };

  const initialValues = {
    amount: '',
    shortDescription: '',
    description: '',
    category: '',
    subcategory: '',
    isPaid: false,
    date: new Date(),
  };

  // Change the handle Submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    console.log({ ...values, ...additionalData.current });
  };

  return (
    <RecordTemplateMain>
      <GoBackButton to={DASHBOARD_ROUTE}>
        <Close sx={{ fontSize: '3.5rem' }} />
      </GoBackButton>
      <ParagraphTitle align="center">
        {' '}
        { action }
        {' '}
        Record
      </ParagraphTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize
        validateOnMount
      >
        {({ submitForm, values, setFieldValue }) => (
          <FormContainer>
            <Field
              component={InputForm}
              name="amount"
              type="number"
              variant="standard"
              label="Amount"
              InputProps={{
                startAdornment: <InputAdornment position="start">- $</InputAdornment>,
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
              name="shortDescription"
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
            <SecondaryButton variant="contained" onClick={openAddPersonModal} size="medium">Add Person</SecondaryButton>
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
    </RecordTemplateMain>
  );
};

export { RecordTemplate };
