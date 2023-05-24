import { Group } from "../../gql/graphql";

export type HomeStackParamList = {
  Home: {
    teacherId: string;
  };
  GroupView: {
    groupId: string;
  };
  GroupCreation?: {
    onCreated?: () => React.ReactNode;
  };
};
