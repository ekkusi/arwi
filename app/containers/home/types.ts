import { Group, Teacher } from "../../mikanlelutyypit";

export type HomeStackParamList = {
  Home: {
    teacher: Teacher;
  };
  GroupView: {
    group: Group;
  };
  GroupCreation: {};
};
