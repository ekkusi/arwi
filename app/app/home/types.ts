export type HomeStackParams = {
  index: undefined;
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
  collection: {
    id: string;
    date: string;
    environmentLabel: string;
    archived: boolean;
  };
  "collection-edit": {
    collectionId: string;
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
    label: string;
    description: string;
    type: string;
  };
  "edit-all-evaluations": {
    collectionId: string;
  };
  archive: undefined;
};
