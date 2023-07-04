import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import { screenOptions } from "../(home)/_layout";
import ProfileView from "./ProfileView";

export default function ProfileStack() {
  return <Stack initialRouteName="Profile" screenOptions={screenOptions} />;
}
