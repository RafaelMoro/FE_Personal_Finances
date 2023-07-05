/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Close } from '@mui/icons-material';
import { Formik, Field } from 'formik';

import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { RecordTemplateProps } from './interface';
import {
  ParagraphTitle, InputForm, PrimaryButton, InputAdornment,
  CancelButton, AnchorButton, FlexContainer,
} from '../../../../../styles';
import { SelectInput } from '../../../SelectInput';
import { CATEGORIES_RECORDS } from '../../../../../constants';
import { RecordTemplateMain, GoBackButton, FormContainer } from './RecordTemplate.styled';
import { selectInputInfoAtom } from '../../../../../atoms';

const RecordTemplate = ({ edit = false }: RecordTemplateProps) => {
  const [selectInputInfo] = useAtom(selectInputInfoAtom);
  const action = edit ? 'Edit' : 'Create';
  const onlyCategories = CATEGORIES_RECORDS.map((category) => category.category);
  const firstCategory = onlyCategories[0];
  const subcategoriesOfFirstCategory = CATEGORIES_RECORDS[0].subCategories;
  const [currentSubcategories, setCurrentSubcategories] = useState(subcategoriesOfFirstCategory);
  console.log(subcategoriesOfFirstCategory);

  const initialValues = {
    amount: '',
    shortDescription: '',
    description: '',
    category: firstCategory,
    subcategory: subcategoriesOfFirstCategory,
  };

  useEffect(() => {
    const newSubcategories = CATEGORIES_RECORDS
      .filter((item) => selectInputInfo.value === item.category)
      .map((item) => item.subCategories)
      .flat();
    setCurrentSubcategories(newSubcategories);
  }, [selectInputInfo.value]);

  // Change the handle Submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    console.log(values);
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
            <SelectInput
              labelId="select-record-category"
              labelName="Category"
              fieldName="category"
              stringOptions={onlyCategories}
              colorOptions={[]}
            />
            <SelectInput
              labelId="select-record-subcategory"
              labelName="Subcategory"
              fieldName="subcategory"
              stringOptions={currentSubcategories}
              colorOptions={[]}
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
