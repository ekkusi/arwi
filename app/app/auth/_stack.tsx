import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./welcome";
import LoginPage from "./login";
import SignupPage from "./signup";
import { AuthStackParams } from "./types";
import { COLORS } from "../../theme";

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParams>();

export default function AuthStack() {
  return (
    <Navigator initialRouteName="welcome" screenOptions={{ headerTransparent: true }}>
      <Screen name="welcome" component={LandingPage} options={{ title: "", statusBarColor: COLORS.primary }} />
      <Screen name="login" component={LoginPage} options={{ title: "", statusBarColor: COLORS.white }} />
      <Screen name="signup" component={SignupPage} options={{ title: "", statusBarColor: COLORS.white }} />
    </Navigator>
  );
}
