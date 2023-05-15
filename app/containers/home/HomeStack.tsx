import { TabRouter } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import CustomButton from "../../components/CustomButton";
import { Teacher } from "../../mikanlelutyypit";
import { COLORS } from "../../theme";
import GroupCreation from "./group/GroupCreation";
import GroupView from "./group/GroupView";
import HomeView from "./HomeView";
import { HomeStackParamList } from "./types";

export const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: COLORS.white,
  },
  headerTintColor: COLORS.darkgray,
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
      <HomeStackNavigator.Screen name="Home" component={HomeView} initialParams={{ teacher }} options={{ title: "Omat ryhmät" }} />
      <HomeStackNavigator.Screen name="GroupView" component={GroupView} options={({ route }) => ({ title: route.params.group.name })} />
      <HomeStackNavigator.Screen
        name="GroupCreation"
        component={GroupCreation}
        options={({ route }) => ({ title: "Luo ryhmä", headerRight: route.params.createGroupButton })}
      />
    </HomeStackNavigator.Navigator>
  );
}
