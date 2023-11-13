import { TranslatedString } from "arwi-backend/src/types";

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
  collection: {
    id: string;
    date: string;
    environmentLabel: TranslatedString;
    archived: boolean;
  };
  "collection-edit": {
    collectionId: string;
    onSaved?: (newEnvironmentLabel: TranslatedString, newDate: string) => void;
  };
  "collection-create": {
    groupId: string;
  };
  "edit-evaluation": {
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
  archive: undefined;
};
