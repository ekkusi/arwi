import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { screenOptions } from "../(home)/_layout";

export default function DesignStack() {
  return <Stack initialRouteName="Design" screenOptions={screenOptions} />;
}
