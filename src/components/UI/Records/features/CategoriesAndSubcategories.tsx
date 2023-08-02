import { useEffect, useState, useMemo } from 'react';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { userAtom } from '../../../../atoms';
import { Loader } from '../../../../animations/Loader';
import { Paragraph } from '../../../../styles';
import { SelectInput } from '../../SelectInput';
import { Notification } from '../../Notification';

import { CategoriesResponse } from '../interface';
import { Category } from '../../../../globalInterface';
import { SystemStateEnum } from '../../../../enums';
import { GET_CATEGORIES } from '../constants';
import { GetRequest } from '../../../../utils';
import { CATEGORIES_RECORDS } from '../../../../constants';
import { useNotification } from '../../../../hooks/useNotification';
import { LoadingCategoriesContainer, RecordLoaderContainer } from '../Records.styled';

const NOTIFICATION_DESCRIPTION = 'We could not get your categories. Please try again later';
const NOTIFICATION_STATUS = SystemStateEnum.Error;

const CategoriesAndSubcategories = () => {
  const [user] = useAtom(userAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  // If category has not been selected yet, disabled subcategory select input.
  const [categoryNotSelected, setCategoryNotSelected] = useState<boolean>(true);
  // Error flag to set to true if the response come with error and don't keep fetching.
  const [error, setError] = useState<boolean>(false);

  const [categories, setCategories] = useState<Category[]>(CATEGORIES_RECORDS);
  const [currentCategory, setCurrentCategory] = useState<Category>(CATEGORIES_RECORDS[0]);
  const onlyCategories = useMemo(() => categories.map((item) => item.categoryName), [categories]);

  const {
    notification, showNotification, notificationInfo, hideNotification,
  } = useNotification({
    title: 'Error', description: NOTIFICATION_DESCRIPTION, status: NOTIFICATION_STATUS,
  });

  useEffect(() => {
    const getCategories = async () => {
      const response: CategoriesResponse = await GetRequest(GET_CATEGORIES, bearerToken);

      if (response.error) {
        setTimeout(() => setIsLoading(false), 1000);
        showNotification();
        setError(true);
        return;
      }

      if (response.categories.length === 0) {
        // there are no categories created, do not update the state and just set the loading flag as false.
        setTimeout(() => setIsLoading(false), 1000);
        return;
      }

      setTimeout(() => setIsLoading(false), 1000);
      setCategories([...categories, ...response.categories]);
    };

    // Fetch while the categories are 12 because are the total of the local categories.
    // If there are more, categories has been fetched already.
    if (!!user && bearerToken && categories.length === 12 && !error) getCategories();
  }, [bearerToken, categories, error, showNotification, user]);

  const setNewCategory = (name: string, value: string | string[]) => {
    if (name === 'category' && typeof value === 'string') {
      const selectedCategory = categories.find((item) => item.categoryName === value) ?? CATEGORIES_RECORDS[0];
      setCurrentCategory(selectedCategory);
      setCategoryNotSelected(false);
    }
  };

  if (isLoading) {
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
      {notification && (
      <Notification
        title={notificationInfo.current.title}
        description={notificationInfo.current.description}
        status={notificationInfo.current.status}
        close={hideNotification}
      />
      )}
      <SelectInput
        labelId="select-record-category"
        labelName="Category"
        fieldName="category"
        stringOptions={onlyCategories}
        colorOptions={[]}
        processSelectDataFn={setNewCategory}
      />
      <SelectInput
        labelId="select-record-subcategory"
        labelName="Subcategory"
        fieldName="subCategory"
        stringOptions={currentCategory.subCategories}
        colorOptions={[]}
        disabled={categoryNotSelected}
      />
    </>
  );
};

export { CategoriesAndSubcategories };
