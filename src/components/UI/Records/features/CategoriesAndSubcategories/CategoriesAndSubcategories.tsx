import {
  useEffect, useMemo,
} from 'react';
import { AxiosError } from 'axios';

import { Loader } from '../../../../../animations/Loader';
import { ErrorParagraphValidation, Paragraph } from '../../../../../styles';
import { SelectInput } from '../../../SelectInput';

import { Category, User } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';
import { ERROR_MESSAGE_FETCH_CATEGORIES } from '../../../../../constants';
import { LoadingCategoriesContainer, RecordLoaderContainer } from '../../Records.styled';
import { useNotification } from '../../../../../hooks/useNotification';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { fetchCategories } from '../../../../../redux/slices/Categories/actions/fetchCategories';
import { isCategorySelected, updateCurrentCategory } from '../../../../../redux/slices/Categories/categories.slice';

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
  const onlyCategories = useMemo(() => categoriesState.categories.map((item) => item.categoryName), [categoriesState.categories]);

  useEffect(() => {
    if (user?.email) {
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
  }, [user?.email, bearerToken]);

  const setNewCategory = (name: string, value: string | string[]) => {
    if (name === 'category' && typeof value === 'string') {
      const selectedCategory = categoriesState.categories.find((item) => item.categoryName === value);
      if (selectedCategory && categoriesState.currentCategory !== selectedCategory) {
        dispatch(updateCurrentCategory(selectedCategory));
        if (categoriesState.categoryNotSelected === true) dispatch(isCategorySelected());
      }
    }
  };

  if (categoriesState.loading) {
    return (
      <LoadingCategoriesContainer>
        <RecordLoaderContainer>
          <Loader />
        </RecordLoaderContainer>
        <Paragraph>Loading categories</Paragraph>
        <RecordLoaderContainer>
          <Loader />
        </RecordLoaderContainer>
        <Paragraph>Loading subcategories</Paragraph>
      </LoadingCategoriesContainer>
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
        <ErrorParagraphValidation>{errorCategory}</ErrorParagraphValidation>
      ) }
      <SelectInput
        labelId="select-record-subcategory"
        labelName="Subcategory"
        fieldName="subCategory"
        stringOptions={categoriesState.currentCategory.subCategories}
        colorOptions={[]}
        disabled={categoriesState.categoryNotSelected}
      />
      { (touchedSubCategory && errorSubcategory) && (
        <ErrorParagraphValidation>{errorSubcategory}</ErrorParagraphValidation>
      ) }
    </>
  );
};

export { CategoriesAndSubcategories };
