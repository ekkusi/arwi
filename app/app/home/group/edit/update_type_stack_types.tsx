import { CollectionTypeFull } from "./UpdateTypesProvider";

export type UpdateTypesStackParams = {
  "group-edit-collection-types": {
    groupId: string;
    originalTypes: CollectionTypeFull[];
  };
  "group-edit-collection-types-weights": {
    groupId: string;
    originalTypes: CollectionTypeFull[];
    hideBackButton?: boolean;
  };
};
