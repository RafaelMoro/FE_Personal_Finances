import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { userAtom } from '../../../../atoms';
import { Loader } from '../../../../animations/Loader';
import { Paragraph } from '../../../../styles';
import { SelectInput } from '../../SelectInput';
import { CategoriesResponse } from '../interface';
import { GET_CATEGORIES } from '../constants';
import { GetRequest } from '../../../../utils';
import { CATEGORIES_RECORDS } from '../../../../constants';
import { LoadingCategoriesContainer, RecordLoaderContainer } from '../Records.styled';

const CategoriesAndSubcategories = () => {
  const [user] = useAtom(userAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const defaultCategories: string[] = CATEGORIES_RECORDS.map((category) => category.categoryName);
  const firstCategory: string = defaultCategories[0];
  const subcategoriesOfFirstCategory: string[] = CATEGORIES_RECORDS[0].subCategories;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>(firstCategory);
  const [categories, setCategories] = useState(defaultCategories);
  // eslint-disable-next-line max-len
  const [categoriesAndSubcategories, setCategoriesAndSubcategories] = useState(CATEGORIES_RECORDS);
  // eslint-disable-next-line max-len
  const [currentSubcategories, setCurrentSubcategories] = useState<string[]>(subcategoriesOfFirstCategory);

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
      // // eslint-disable-next-line max-len
      // setCategoriesAndSubcategories([...categoriesAndSubcategories, ...response.categories]);
      // const userCategories = response.categories.map((item) => item.categoryName);
      // setCategories({
      //   ...categories,
      //   ...userCategories,
      // });
    };
    if (!!user && bearerToken) getCategories();
  }, [bearerToken, categories, categoriesAndSubcategories, user]);

  useEffect(() => {
    const newSubcategories = categoriesAndSubcategories
      .filter((item) => category === item.categoryName)
      .map((item) => item.subCategories)
      .flat();
    setCurrentSubcategories(newSubcategories);
  }, [categoriesAndSubcategories, category]);

  const setNewCategory = (name: string, value: string | string[]) => {
    if (name === 'category' && typeof value === 'string') {
      setCategory(value);
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
    </>
  );
};

export { CategoriesAndSubcategories };
