import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParams } from "../types";

export type GroupNavigationProps = {
  navigation: NativeStackScreenProps<HomeStackParams, "group">["navigation"];
};
