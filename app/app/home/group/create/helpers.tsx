import { CollectionTypeInfo, CollectionTypeOption } from "./types_body";

export const mapCollectionTypeInfo = (
  type: CollectionTypeOption,
  otherSelectedTypes: CollectionTypeOption[],
  noNameMap = false
): CollectionTypeInfo => {
  const { name } = type;
  let id = type.category.toString();
  let matchingCount = 0;
  for (let i = 0; i < otherSelectedTypes.length; i += 1) {
    if (otherSelectedTypes[i].category === type.category) matchingCount += 1;
  }
  id = `${type.category}-${matchingCount + 1}`;
  return {
    name,
    id,
    category: type.category,
  };
};

export const mapCollectionTypeInfos = (types: CollectionTypeOption[]): CollectionTypeInfo[] => {
  const mappedTypes: CollectionTypeInfo[] = [];
  types.forEach((type) => {
    const mappedType = mapCollectionTypeInfo(type, mappedTypes, true);
    mappedTypes.push(mappedType);
  });
  return mappedTypes;
};
