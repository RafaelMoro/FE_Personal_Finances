import {
  useEffect, useMemo,
} from 'react';
import { FormControl, InputLabel, Typography } from '@mui/material';

import { Field } from 'formik';
import {
  AppColors, ErrorParagraphValidation, FlexContainer, MenuItem,
} from '../../../../../styles';
import { SelectInput } from '../../../SelectInput';

import { Category } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';
import { CATEGORIES_RECORDS, ERROR_CREATE_LOCAL_CATEGORIES, ERROR_MESSAGE_FETCH_CATEGORIES } from '../../../../../constants';
import { useNotification } from '../../../../../hooks/useNotification';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { isCategorySelected, updateCurrentCategory } from '../../../../../redux/slices/Categories/categories.slice';
import { LoadingSpinner } from '../../../LoadingSpinner';
import { useFetchCategoriesQuery } from '../../../../../redux/slices/Categories/categories.api';
import { useCreateLocalCategoriesMutation } from '../../../../../redux/slices/User/actions/createUser';
import { SelectCategory } from './SelectCategory';

interface CategoriesAndSubcategoriesProps {
  errorCategory?: string;
  errorSubcategory?: string;
  touchedCategory?: boolean;
  touchedSubCategory?: boolean;
  categoryToBeEdited: Category | null;
}

const CategoriesAndSubcategories = ({
  errorCategory, errorSubcategory, touchedCategory, touchedSubCategory, categoryToBeEdited,
}: CategoriesAndSubcategoriesProps) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.userInfo);
  const sub = userData?.user.sub ?? '';
  const bearerToken = userData?.bearerToken as string;
  const categoriesState = useAppSelector((state) => state.categories);
  const categoriesFieldName = 'category';
  const { updateGlobalNotification } = useNotification();
  const [createLocalCategoriesMutation, { isLoading: isLoadingCreateCategories }] = useCreateLocalCategoriesMutation();
  const {
    currentData, isError, isFetching,
  } = useFetchCategoriesQuery({ bearerToken }, { skip: !bearerToken });
  const onlyCategories = useMemo(() => (currentData ?? []).map((item) => item.categoryName), [currentData]);

  const handleCreateLocalCatergories = async () => {
    try {
      await createLocalCategoriesMutation({ sub }).unwrap();
    } catch (err) {
      updateGlobalNotification({
        newTitle: 'Error',
        newDescription: ERROR_CREATE_LOCAL_CATEGORIES,
        newStatus: SystemStateEnum.Error,
      });
    }
  };

  useEffect(() => {
    // If categories array is empty, create local categories.
    if (currentData && currentData.length === 0) {
      handleCreateLocalCatergories();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  useEffect(() => {
    if (categoryToBeEdited) {
      dispatch(updateCurrentCategory(categoryToBeEdited));
      dispatch(isCategorySelected());
    }
  }, [categoryToBeEdited, dispatch]);

  useEffect(() => {
    if (isError) {
      updateGlobalNotification({
        newTitle: 'Error',
        newDescription: ERROR_MESSAGE_FETCH_CATEGORIES,
        newStatus: SystemStateEnum.Error,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const setNewCategory = (value: string) => {
    const selectedCategory = (currentData ?? []).find((item) => item.categoryName === value);
    if (selectedCategory && categoriesState.currentCategory !== selectedCategory) {
      dispatch(updateCurrentCategory(selectedCategory));
      if (categoriesState.categoryNotSelected === true) dispatch(isCategorySelected());
    }
  };

  if (isFetching || isLoadingCreateCategories) {
    return (
      <>
        <SelectInput
          labelId="select-record-category"
          labelName={(
            <FlexContainer justifyContent="center" gap={3}>
              <LoadingSpinner color={AppColors.primary} borderSize="0.3" />
              <Typography>{ isLoadingCreateCategories ? 'Creating local categories' : 'Loading categories' }</Typography>
            </FlexContainer>
          )}
          fieldName="category"
          stringOptions={[]}
          disabled
        />
        <SelectInput
          labelId="select-record-category"
          labelName={(
            <FlexContainer justifyContent="center" gap={3}>
              <LoadingSpinner color={AppColors.primary} borderSize="0.3" />
              <Typography>{ isLoadingCreateCategories ? 'Creating local subcategories' : 'Loading subcategories' }</Typography>
            </FlexContainer>
          )}
          fieldName="category"
          stringOptions={[]}
          disabled
        />
      </>
    );
  }

  return (
    <>
      <FormControl variant="standard">
        <InputLabel id="select-record-category">Category</InputLabel>
        <Field name={categoriesFieldName} setNewCategory={setNewCategory} component={SelectCategory}>
          {
            (onlyCategories ?? []).map((option) => (
              <MenuItem key={`${categoriesFieldName}-${option}`} value={option}>{option}</MenuItem>
            ))
          }
        </Field>
      </FormControl>
      { (touchedCategory && errorCategory) && (
        <ErrorParagraphValidation variant="subText">{errorCategory}</ErrorParagraphValidation>
      ) }
      <SelectInput
        labelId="select-record-subcategory"
        labelName="Subcategory"
        fieldName="subCategory"
        stringOptions={(categoriesState.currentCategory ?? CATEGORIES_RECORDS[0]).subCategories}
        colorOptions={[]}
        disabled={categoriesState.categoryNotSelected}
      />
      { (touchedSubCategory && errorSubcategory) && (
        <ErrorParagraphValidation variant="subText">{errorSubcategory}</ErrorParagraphValidation>
      ) }
    </>
  );
};

export { CategoriesAndSubcategories };
