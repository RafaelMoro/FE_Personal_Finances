/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import { Formik, Field } from 'formik';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { RecordTemplateProps } from './interface';
import { CategoriesResponse } from '../../interface';
import {
  ParagraphTitle, InputForm, PrimaryButton, InputAdornment,
  CancelButton, AnchorButton, FlexContainer,
} from '../../../../../styles';
import { SelectInput } from '../../../SelectInput';
import { GET_CATEGORIES } from '../../constants';
import { CATEGORIES_RECORDS } from '../../../../../constants';
import { RecordTemplateMain, GoBackButton, FormContainer } from './RecordTemplate.styled';
import { userAtom } from '../../../../../atoms';
import { GetRequest } from '../../../../../utils';

const RecordTemplate = ({ edit = false }: RecordTemplateProps) => {
  const [user] = useAtom(userAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  const action: string = edit ? 'Edit' : 'Create';
  const categories: string[] = CATEGORIES_RECORDS.map((category) => category.category);
  const firstCategory: string = categories[0];
  const subcategoriesOfFirstCategory: string[] = CATEGORIES_RECORDS[0].subCategories;
  const [currentCategory, setCurrentCategory] = useState<string>(firstCategory);
  // eslint-disable-next-line max-len
  const [currentSubcategories, setCurrentSubcategories] = useState<string[]>(subcategoriesOfFirstCategory);

  const initialValues = {
    amount: '',
    shortDescription: '',
    description: '',
    category: firstCategory,
    subcategory: '',
  };

  useEffect(() => {
    const getCategories = async () => {
      const response: CategoriesResponse = await GetRequest(GET_CATEGORIES, bearerToken);

      if (response.error) {
      // handle error
      }

      if (response.categories.length === 0) {
        // there are no categories created
        return;
      }

      const userCategories = response.categories.map((item) => item.categoryName);
    };
    if (!!user && bearerToken) getCategories();
  }, [bearerToken, user]);

  useEffect(() => {
    const newSubcategories = CATEGORIES_RECORDS
      .filter((item) => currentCategory === item.category)
      .map((item) => item.subCategories)
      .flat();
    setCurrentSubcategories(newSubcategories);
  }, [currentCategory]);

  const setNewCategory = (name: string, value: string | string[]) => {
    if (name === 'category' && typeof value === 'string') {
      setCurrentCategory(value);
    }
  };

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
            <SelectInput
              labelId="select-record-category"
              labelName="Category"
              fieldName="category"
              stringOptions={categories}
              colorOptions={[]}
              processSelectDataFn={setNewCategory}
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
