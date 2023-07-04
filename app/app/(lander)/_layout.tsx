import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { LandingStackParamList } from "./types";

export default function LandingStack() {
  return <Stack initialRouteName="LandingPage" screenOptions={{ headerTransparent: true }} />;
}
