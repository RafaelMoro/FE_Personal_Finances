import { screen } from '@testing-library/react';
import { Formik } from 'formik';
import { useState } from 'react';
import fetchMock from 'jest-fetch-mock';

import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { CategoriesAndSubcategories } from './CategoriesAndSubcategories';
import { Category } from '../../../../../globalInterface';
import { TestCategorySchema } from '../../../../../validationsSchemas/records.schema';
import { mockCategories } from '../../Record.mocks';

interface CreateCategoryValues {
  category: string;
  subCategory: string;
}

const WrapperCategoriesAndSubcategories = ({ categoryToBeEdited = null }: { categoryToBeEdited?: Category | null }) => {
  const [initialValues] = useState<CreateCategoryValues>({
    category: '',
    subCategory: '',
  });
  const handleSubmit = jest.fn();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={TestCategorySchema}
      enableReinitialize
      validateOnMount
    >
      {({
        errors, touched,
      }) => (
        <CategoriesAndSubcategories
          errorCategory={errors.category}
          errorSubcategory={errors.subCategory}
          touchedCategory={touched.category}
          touchedSubCategory={touched.subCategory}
          categoryToBeEdited={categoryToBeEdited}
        />
      )}
    </Formik>
  );
};

const successfulResponseFetchCategories = {
  data: {
    categories: mockCategories,
  },
  error: null,
  message: null,
  success: true,
  version: '2.0.0',
};

describe('<CategoriesAndSubcategories />', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  test('Show category and subcategory inputs', () => {
    // fetchMock.once(JSON.stringify(successfulResponseFetchCategories));
    renderWithProviders(
      <WrapperCategoriesAndSubcategories />,
    );

    expect(screen.getByText(/loading categories/i)).toBeInTheDocument();
    expect(screen.getByText(/loading subcategories/i)).toBeInTheDocument();
    // expect(screen.getByRole('checkbox', { name: 'Category' })).toBeInTheDocument();
    // expect(screen.getByRole('checkbox', { name: 'Subcategory' })).toBeInTheDocument();
    // expect(screen.getByRole('checkbox', { name: 'Subcategory' })).toBeDisabled();
  });
});
