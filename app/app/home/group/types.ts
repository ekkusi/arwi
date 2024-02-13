import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParams } from "../types";
import { GroupOverviewPage_GetGroupQuery } from "../../../gql/graphql";

export type GroupNavigationProps = {
  navigation: NativeStackScreenProps<HomeStackParams, "group">["navigation"];
};
