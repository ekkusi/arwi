import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
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

const HomeStackNavigator = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <HomeStackNavigator.Screen name="Home" component={HomeView} initialParams={{}} />
      <HomeStackNavigator.Screen name="GroupView" component={GroupView} />
    </HomeStackNavigator.Navigator>
  );
}
