import {
  useEffect, useMemo,
} from 'react';
import { AxiosError } from 'axios';

import { Loader } from '../../../../../animations/Loader';
import { ErrorParagraphValidation, Paragraph } from '../../../../../styles';
import { SelectInput } from '../../../SelectInput';

import { EditCategory, User } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';
import { CATEGORIES_RECORDS, ERROR_MESSAGE_FETCH_CATEGORIES } from '../../../../../constants';
import { LoadingCategoriesContainer, RecordLoaderContainer } from '../../Records.styled';
import { useNotification } from '../../../../../hooks/useNotification';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { fetchCategories } from '../../../../../redux/slices/Categories/actions/fetchCategories';
import { toggleCategoryNotSelected, updateCurrentCategory } from '../../../../../redux/slices/Categories/categories.slice';

interface CategoriesAndSubcategoriesProps {
  errorCategory?: string;
  errorSubcategory?: string;
  touchedCategory?: boolean;
  touchedSubCategory?: boolean;
  categoryToBeEdited: EditCategory;
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
        dispatch(fetchCategories({ bearerToken })).unwrap();
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

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const response: CategoriesResponse = await GetRequest(GET_CATEGORIES, bearerToken);
  //     const categoriesFetched = response.categories;

  //     if (response.error) {
  //       setIsLoading(false);
  //       updateGlobalNotification({
  //         newTitle: NOTIFICATION_TITLE,
  //         newDescription: NOTIFICATION_DESCRIPTION,
  //         newStatus: SystemStateEnum.Error,
  //       });
  //       setTimeout(() => {
  //         setError(true);
  //       }, 3000);
  //       return;
  //     }

  //     if (response.categories.length === 0) {
  //       // there are no categories created, do not update the state and just set the loading flag as false.
  //       setIsLoading(false);
  //       return;
  //     }

  //     setIsLoading(false);

  //     // Filter the categories unique from the categories fetched and the local categories
  //     const allCategories = [...categories, ...categoriesFetched];
  //     const localCategoriesNames = categories.map((category) => category.categoryName);
  //     const notRepeatedFetchedCategories = allCategories.filter((category) => localCategoriesNames.indexOf(category.categoryName) === -1);
  //     const uniqueCategories = [...categories, ...notRepeatedFetchedCategories];

  //     setCategories(uniqueCategories);

  //     // Check if the category to be edited exists, if so, set current category
  //     if (categoryToBeEdited) {
  //       const newCurrentCategory = categories.find((category) => category.categoryName === categoryToBeEdited.categoryName);
  //       setCurrentCategory(newCurrentCategory ?? CATEGORIES_RECORDS[0]);
  //     }
  //   };

  //   // Fetch while the categories are 12 because are the total of the local categories.
  //   // If there are more, categories has been fetched already.
  //   if (!!userReduxState && bearerToken && categories.length === 11 && !error) getCategories();
  // }, [bearerToken, categories, error, updateGlobalNotification, categoryToBeEdited, userReduxState]);

  const setNewCategory = (name: string, value: string | string[]) => {
    if (name === 'category' && typeof value === 'string') {
      console.log('here no');
      const selectedCategory = categoriesState.categories.find((item) => item.categoryName === value) ?? CATEGORIES_RECORDS[0];
      // dispatch(updateCurrentCategory(selectedCategory));
      // dispatch(toggleCategoryNotSelected());
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
