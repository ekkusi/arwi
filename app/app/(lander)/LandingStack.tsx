import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { LandingStackParamList } from "./types";

const LandingStackNavigator = createNativeStackNavigator<LandingStackParamList>();

export default function LandingStack() {
  return (
    <LandingStackNavigator.Navigator initialRouteName="LandingPage" screenOptions={{ headerTransparent: true }}>
      <LandingStackNavigator.Screen name="LandingPage" component={LandingPage} options={{ title: "" }} />
      <LandingStackNavigator.Screen name="LoginPage" component={LoginPage} options={{ title: "" }} />
      <LandingStackNavigator.Screen name="SignupPage" component={SignupPage} options={{ title: "" }} />
    </LandingStackNavigator.Navigator>
  );
}
