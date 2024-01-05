import { CollectionTypeCategory } from "arwi-backend/src/types";

export type CollectionTypeOption = {
  name: string;
  category: CollectionTypeCategory;
};

export type CollectionTypeInfo = CollectionTypeOption & {
  id: string;
};
