import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { COLORS } from "../../theme";
import GroupCreationStack from "./group/creation/GroupCreationStack";
import GroupView from "./group/GroupView";
import HomeView from "./HomeView";
import { HomeStackParamList } from "./types";

export const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: COLORS.green,
  },
  headerTintColor: COLORS.white,
};

const HomeStackNavigator = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <HomeStackNavigator.Screen name="Home" component={HomeView} options={{ title: "Omat ryhmät" }} />
      <HomeStackNavigator.Screen name="GroupView" component={GroupView} />
      <HomeStackNavigator.Screen name="GroupCreation" component={GroupCreationStack} options={{ title: "Uusi ryhmä", headerShown: false }} />
    </HomeStackNavigator.Navigator>
  );
}
