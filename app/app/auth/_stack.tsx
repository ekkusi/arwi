import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./welcome";
import LoginPage from "./login";
import SignupPage from "./signup";
import { AuthStackParams } from "./types";
import { COLORS } from "../../theme";
import ForgotPassword from "./ForgotPassword";
import CodeInput from "./CodeInput";
import UpdatePassword from "./UpdatePassword";

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParams>();

export default function AuthStack() {
  return (
    <Navigator initialRouteName="welcome" screenOptions={{ headerTransparent: true }}>
      <Screen name="welcome" component={LandingPage} options={{ title: "", statusBarColor: COLORS.primary }} />
      <Screen name="login" component={LoginPage} options={{ title: "", statusBarColor: COLORS.white }} />
      <Screen name="signup" component={SignupPage} options={{ title: "", statusBarColor: COLORS.white }} />
      <Screen name="forgot-password" component={ForgotPassword} options={{ title: "", statusBarColor: COLORS.white }} />
      <Screen name="code-input" component={CodeInput} options={{ title: "", statusBarColor: COLORS.white }} />
      <Screen name="update-password" component={UpdatePassword} options={{ title: "", statusBarColor: COLORS.white }} />
    </Navigator>
  );
}
