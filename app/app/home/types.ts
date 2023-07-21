export type HomeStackParams = {
  index: undefined;
  group: {
    id: string;
    name: string;
  };
  "group-create": undefined;
  student: {
    id: string;
    name: string;
  };
  collection: {
    id: string;
    date: string;
    environmentLabel: string;
  };
  "collection-create": {
    groupId: string;
  };
  evaluation: undefined;
};
