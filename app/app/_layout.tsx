import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Slot, Stack, Tabs } from "expo-router";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ApolloProvider from "../hooks-and-providers/ApolloProvider";
import { AuthProvider } from "../hooks-and-providers/AuthProvider";
import { COLORS, SPACING } from "../theme";
import DesignStack from "./(authenticated)/design/_layout";
import HomeStack from "./(authenticated)/(home)/HomeStack";
import ProfileStack from "./(authenticated)/profile/ProfileStack";
import { MainStackParamList } from "./types";

export default function MainStack() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Slot initialRouteName="HomeView" />
      </ApolloProvider>
    </AuthProvider>
  );
}
