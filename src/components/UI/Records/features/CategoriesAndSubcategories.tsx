import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { userAtom } from '../../../../atoms';
import { CategoriesResponse } from '../interface';
import { GET_CATEGORIES } from '../constants';
import { GetRequest } from '../../../../utils';
import { CATEGORIES_RECORDS } from '../../../../constants';
import { SelectInput } from '../../SelectInput';

const CategoriesAndSubcategories = () => {
  const [user] = useAtom(userAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const categories: string[] = CATEGORIES_RECORDS.map((category) => category.category);
  const firstCategory: string = categories[0];
  const subcategoriesOfFirstCategory: string[] = CATEGORIES_RECORDS[0].subCategories;

  const [currentCategory, setCurrentCategory] = useState<string>(firstCategory);
  // eslint-disable-next-line max-len
  const [currentSubcategories, setCurrentSubcategories] = useState<string[]>(subcategoriesOfFirstCategory);

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
