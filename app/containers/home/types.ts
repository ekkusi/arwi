import { Group } from "../../gql/graphql";

export type HomeStackParamList = {
  Home: {};
  GroupView: {
    groupId: string;
  };
  GroupCreation: {
    createGroupButton: () => React.ReactNode;
  };
};
