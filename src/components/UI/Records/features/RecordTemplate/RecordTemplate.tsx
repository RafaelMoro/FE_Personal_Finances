/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useRef } from 'react';
import { Close } from '@mui/icons-material';
import { Formik, Field } from 'formik';
import { Switch } from 'formik-mui';
import { DateTimePicker } from '@mui/x-date-pickers';

import { formatDateToString } from '../../../../../utils';
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { RecordTemplateProps, TagsAndBudgets } from './interface';
import { CategoriesAndSubcategories } from '../CategoriesAndSubcategories';
import {
  ParagraphTitle, InputForm, PrimaryButton, InputAdornment,
  CancelButton, AnchorButton, FlexContainer, FormControlLabel,
} from '../../../../../styles';
import {
  RecordTemplateMain, GoBackButton, FormContainer, ChipsContainer,
} from './RecordTemplate.styled';
import { AddChip } from '../AddChip/AddChip';

const RecordTemplate = ({ edit = false }: RecordTemplateProps) => {
  const action: string = edit ? 'Edit' : 'Create';
  const tagsAndBudgets = useRef<TagsAndBudgets>({
    budgets: [],
    tags: [],
  });

  const updateTags = (newTags: string[]):void => {
    tagsAndBudgets.current = { ...tagsAndBudgets.current, tags: newTags };
  };

  const updateBudgets = (newBudgets: string[]):void => {
    tagsAndBudgets.current = { ...tagsAndBudgets.current, budgets: newBudgets };
  };

  const initialValues = {
    amount: '',
    shortDescription: '',
    description: '',
    category: '',
    subcategory: '',
    isPaid: false,
    dateTime: new Date(),
  };

  // Change the handle Submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    const currentDate = values?.dateTime;
    const { fullDate, formattedTime } = formatDateToString(currentDate);
    console.log({ ...values, ...tagsAndBudgets.current });
    console.log(fullDate, formattedTime);
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
            { /** Mising date and time picker */ }
            <Field
              component={InputForm}
              name="shortDescription"
              type="text"
              variant="standard"
              label="Short Description"
            />
            <Field component={DateTimePicker} name="dateTime" onChange={(value: any) => setFieldValue('dateTime', value.$d)} label="Time" />
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
    </RecordTemplateMain>
  );
};

export { RecordTemplate };
