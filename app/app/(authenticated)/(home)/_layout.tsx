import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import { COLORS } from "../../../theme";
import GroupCreationStack from "./group/creation/GroupCreationStack";
import GroupView from "./group/GroupView";
import HomeView from "./HomeView";
import { HomeStackParamList } from "./types";

export const screenOptions = {
  headerStyle: {
    backgroundColor: COLORS.green,
  },
  headerTintColor: COLORS.white,
};

export default function HomeStack() {
  return <Stack initialRouteName="Home" screenOptions={screenOptions} />;
}
