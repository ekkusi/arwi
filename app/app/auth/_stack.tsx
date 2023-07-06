import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./welcome";
import LoginPage from "./login";
import SignupPage from "./signup";
import { AuthStackParams } from "./types";

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParams>();

export default function AuthStack() {
  return (
    <Navigator initialRouteName="welcome" screenOptions={{ headerTransparent: true }}>
      <Screen name="welcome" component={LandingPage} options={{ title: "" }} />
      <Screen name="login" component={LoginPage} options={{ title: "" }} />
      <Screen name="signup" component={SignupPage} options={{ title: "" }} />
    </Navigator>
  );
}
