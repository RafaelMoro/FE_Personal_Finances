/* eslint-disable @typescript-eslint/no-explicit-any */
export const sortByDate = (firstItem: any, secondItem: any) => +new Date(secondItem.date) - +new Date(firstItem.date);
