import { CollectionTypeCategory, TranslatedString } from "arwi-backend/src/types";

export type HomeStackParams = {
  home: undefined;
  group: {
    id: string;
    classYearId: string;
    name: string;
    archived: boolean;
  };
  "group-create": undefined;
  student: {
    id: string;
    name: string;
    archived: boolean;
  };
  "student-feedback": {
    id: string;
    name: string;
  };
  "default-evaluation-collection": {
    id: string;
    collectionId?: string;
    name: string;
    archived: boolean;
  };
  collection: {
    id: string;
    date: string;
    environmentLabel: TranslatedString;
    archived: boolean;
  };
  "edit-evaluation-types": {
    groupId: string;
  };
  "collection-edit": {
    collectionId: string;
    onSaved?: (newEnvironmentLabel: TranslatedString, newDate: string) => void;
  };
  "default-collection-edit": {
    collectionId: string;
  };
  "collection-create": {
    groupId: string;
  };
  "default-collection-create": {
    groupId: string;
    collectionTypeId: string;
  };
  "edit-evaluation": {
    evaluationId: string;
  };
  "edit-default-evaluation": {
    evaluationId: string;
  };
  "edit-students": {
    groupId: string;
  };
  profile: undefined;
  "learning-objective": {
    code: string;
    label: TranslatedString;
    description: TranslatedString;
    type: string;
  };
  "edit-all-evaluations": {
    collectionId: string;
  };
  "edit-all-default-evaluations": {
    collectionId: string;
  };
  archive: undefined;
};
