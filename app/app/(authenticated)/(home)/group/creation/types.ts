import { Student } from "../../../../../gql/graphql";

export type GroupCreationStackParams = {
  GroupNameSelectionView: {};
  GroupSubjectSelectionView: {};
  GroupStudentCreationView: {
    students: string[];
  };
};
