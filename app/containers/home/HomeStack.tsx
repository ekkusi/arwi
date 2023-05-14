import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { Teacher } from "../../mikanlelutyypit";
import GroupCreation from "./group/GroupCreation";
import GroupView from "./group/GroupView";
import HomeView from "./HomeView";
import { HomeStackParamList } from "./types";

export const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "darkgray",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const teacher: Teacher = {
  groups: [
    {
      id: "1",
      name: "8A",
      type: "sport",
    },
    {
      id: "2",
      name: "8A",
      type: "art",
    },
    {
      id: "3",
      name: "9A",
      type: "class",
    },
  ],
};

const HomeStackNavigator = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <HomeStackNavigator.Screen name="Home" component={HomeView} initialParams={{ teacher }} />
      <HomeStackNavigator.Screen name="GroupView" component={GroupView} />
      <HomeStackNavigator.Screen name="GroupCreation" component={GroupCreation} />
    </HomeStackNavigator.Navigator>
  );
}
