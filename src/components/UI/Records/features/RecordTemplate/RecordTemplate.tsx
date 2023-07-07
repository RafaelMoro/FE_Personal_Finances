/* eslint-disable no-console */
import { useRef } from 'react';
import { Close } from '@mui/icons-material';
import { Formik, Field } from 'formik';

import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { RecordTemplateProps, TagsAndBudgets } from './interface';
import { CategoriesAndSubcategories } from '../CategoriesAndSubcategories';
import {
  ParagraphTitle, InputForm, PrimaryButton, InputAdornment,
  CancelButton, AnchorButton, FlexContainer,
} from '../../../../../styles';
import { RecordTemplateMain, GoBackButton, FormContainer } from './RecordTemplate.styled';
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

  const initialValues = {
    amount: '',
    shortDescription: '',
    description: '',
    category: '',
    subcategory: '',
  };

  // Change the handle Submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    console.log({ ...values, ...tagsAndBudgets.current });
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
        {({ submitForm }) => (
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
            <Field
              component={InputForm}
              multiline
              rows={5}
              name="description"
              variant="standard"
              label="Description"
            />
            <CategoriesAndSubcategories />
            <AddChip name="tag" label="Tag" action="tag" updateData={updateTags} />
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
