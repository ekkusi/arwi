import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParams } from "../types";
import { ResultOf } from "@/graphql";
import { GroupOverviewPage_GetGroup_Query } from "./graphql";

type GroupNavigationProps = {
  navigation: NativeStackScreenProps<HomeStackParams, "group">["navigation"];
};

export type GroupOverviewProps = ResultOf<typeof GroupOverviewPage_GetGroup_Query> & GroupNavigationProps;
