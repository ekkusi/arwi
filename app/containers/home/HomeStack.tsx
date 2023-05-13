import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import HomeView from "./HomeView";

export const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "darkgray",
  headerTitleStyle: {
    fontWeight: "normal",
  },
};

export type HomeStackParamList = {
  Home: {};
};

const HomeStackNavigator = createNativeStackNavigator<HomeStackParamList>();

export default function DesignStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <HomeStackNavigator.Screen name="Home" component={HomeView} initialParams={{}} />
    </HomeStackNavigator.Navigator>
  );
}
