/* eslint-disable no-console */
import { useEffect, useState, useMemo } from 'react';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { userAtom } from '../../../../atoms';
import { Loader } from '../../../../animations/Loader';
import { Paragraph } from '../../../../styles';
import { SelectInput } from '../../SelectInput';
import { CategoriesResponse } from '../interface';
import { Category } from '../../../../globalInterface';
import { GET_CATEGORIES } from '../constants';
import { GetRequest } from '../../../../utils';
import { CATEGORIES_RECORDS } from '../../../../constants';
import { LoadingCategoriesContainer, RecordLoaderContainer } from '../Records.styled';

const CategoriesAndSubcategories = () => {
  const [user] = useAtom(userAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES_RECORDS);
  // If category has not been selected yet, disabled subcategory select input.
  const [categoryNotSelected, setCategoryNotSelected] = useState<boolean>(true);
  const [currentCategory, setCurrentCategory] = useState<Category>(CATEGORIES_RECORDS[0]);

  const onlyCategories = useMemo(() => categories.map((item) => item.categoryName), [categories]);

  useEffect(() => {
    const getCategories = async () => {
      const response: CategoriesResponse = await GetRequest(GET_CATEGORIES, bearerToken);

      if (response.error) {
      // handle error
        return;
      }

      if (response.categories.length === 0) {
        // there are no categories created
        return;
      }

      setTimeout(() => setIsLoading(false), 1000);
      setCategories([...categories, ...response.categories]);
    };

    if (!!user && bearerToken && categories.length === 12) getCategories();
  }, [bearerToken, categories, user]);

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
        fieldName="subcategory"
        stringOptions={currentCategory.subCategories}
        colorOptions={[]}
        disabled={categoryNotSelected}
      />
    </>
  );
};

export { CategoriesAndSubcategories };
