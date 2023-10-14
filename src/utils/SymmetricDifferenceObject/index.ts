interface CustomObject {
  [key: string]: string;
}

export function symmetricDifferenceObjects(array1: CustomObject[], array2: CustomObject[], key: string) {
  const getKey = (obj: CustomObject) => obj[key];
  const diff1 = array1.filter((obj1) => !array2.some((obj2) => getKey(obj1) === getKey(obj2)));
  const diff2 = array2.filter((obj2) => !array1.some((obj1) => getKey(obj2) === getKey(obj1)));

  return {
    diff1,
    diff2,
    allDiference: [...diff1, ...diff2],
  };
}
