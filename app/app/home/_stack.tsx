import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeView from ".";
import { defaultHeaderStyles } from "../config";
import GroupView from "./group";
import GroupCreationStack from "./group/create/_stack";
import { HomeStackParams } from "./types";

const HomeStackNavigator = createNativeStackNavigator<HomeStackParams>();

export default function HomeStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="home" screenOptions={defaultHeaderStyles}>
      <HomeStackNavigator.Screen name="home" component={HomeView} options={{ title: "Omat ryhmät" }} />
      <HomeStackNavigator.Screen name="group" component={GroupView} />
      <HomeStackNavigator.Screen name="group-create" component={GroupCreationStack} options={{ title: "Uusi ryhmä", headerShown: false }} />
    </HomeStackNavigator.Navigator>
  );
}
