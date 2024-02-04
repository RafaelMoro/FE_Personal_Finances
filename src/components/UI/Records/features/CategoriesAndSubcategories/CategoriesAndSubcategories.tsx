import {
  useEffect, useMemo,
} from 'react';
import { AxiosError } from 'axios';
import { Typography } from '@mui/material';

import {
  AppColors, ErrorParagraphValidation, FlexContainer,
} from '../../../../../styles';
import { SelectInput } from '../../../SelectInput';

import { Category, User } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';
import { CATEGORIES_RECORDS, ERROR_MESSAGE_FETCH_CATEGORIES } from '../../../../../constants';
import { useNotification } from '../../../../../hooks/useNotification';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { fetchCategories } from '../../../../../redux/slices/Categories/actions/fetchCategories';
import { isCategorySelected, updateCurrentCategory } from '../../../../../redux/slices/Categories/categories.slice';
import { LoadingSpinner } from '../../../LoadingSpinner';

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
  const user = useAppSelector((state) => state.user.userInfo);
  const { bearerToken } = user as User;
  const categoriesState = useAppSelector((state) => state.categories);
  const { updateGlobalNotification } = useNotification();
  const onlyCategories = useMemo(() => (categoriesState.categories ?? []).map((item) => item.categoryName), [categoriesState.categories]);

  useEffect(() => {
    if (user && bearerToken && !categoriesState.categories) {
      try {
        dispatch(fetchCategories({ bearerToken, categoryToBeEdited })).unwrap();
      } catch (err) {
        const errorCatched = err as AxiosError;
        updateGlobalNotification({
          newTitle: 'Error',
          newDescription: ERROR_MESSAGE_FETCH_CATEGORIES,
          newStatus: SystemStateEnum.Error,
        });
        // eslint-disable-next-line no-console
        console.error('Error while fetching categories', errorCatched.message);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, bearerToken, categoriesState.categories]);

  const setNewCategory = (name: string, value: string | string[]) => {
    if (name === 'category' && typeof value === 'string') {
      const selectedCategory = (categoriesState.categories ?? []).find((item) => item.categoryName === value);
      if (selectedCategory && categoriesState.currentCategory !== selectedCategory) {
        dispatch(updateCurrentCategory(selectedCategory));
        if (categoriesState.categoryNotSelected === true) dispatch(isCategorySelected());
      }
    }
  };

  if (categoriesState.loading) {
    return (
      <>
        <SelectInput
          labelId="select-record-category"
          labelName={(
            <FlexContainer justifyContent="center" gap="2">
              <LoadingSpinner color={AppColors.primary} borderSize="0.3" />
              <Typography>Loading categories</Typography>
            </FlexContainer>
          )}
          fieldName="category"
          stringOptions={[]}
          colorOptions={[]}
          processSelectDataFn={setNewCategory}
          disabled
        />
        <SelectInput
          labelId="select-record-category"
          labelName={(
            <FlexContainer justifyContent="center" gap="2">
              <LoadingSpinner color={AppColors.primary} borderSize="0.3" />
              <Typography>Loading subcategories</Typography>
            </FlexContainer>
          )}
          fieldName="category"
          stringOptions={[]}
          colorOptions={[]}
          processSelectDataFn={setNewCategory}
          disabled
        />
      </>
    );
  }

  return (
    <>
      <SelectInput
        labelId="select-record-category"
        labelName="Category"
        fieldName="category"
        stringOptions={onlyCategories}
        colorOptions={[]}
        processSelectDataFn={setNewCategory}
      />
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
