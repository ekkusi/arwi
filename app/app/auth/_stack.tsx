import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./welcome";
import LoginPage from "./login";
import SignupPage from "./signup";
import { AuthStackParams } from "./types";
import { COLORS } from "../../theme";
import ForgotPassword from "./ForgotPassword";
import CodeInput from "./CodeInput";
import UpdatePassword from "./UpdatePassword";
import VerifyEmail from "./verify-email";

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParams>();

export default function AuthStack() {
  return (
    <Navigator initialRouteName="welcome" screenOptions={{ statusBarColor: COLORS.primary, headerTransparent: true }}>
      <Screen name="welcome" component={LandingPage} options={{ title: "" }} />
      <Screen name="login" component={LoginPage} options={{ title: "" }} />
      <Screen name="signup" component={SignupPage} options={{ title: "" }} />
      <Screen name="forgot-password" component={ForgotPassword} options={{ title: "" }} />
      <Screen name="code-input" component={CodeInput} options={{ title: "" }} />
      <Screen name="update-password" component={UpdatePassword} options={{ title: "" }} />
      <Screen name="verify-email" component={VerifyEmail} options={{ title: "" }} />
    </Navigator>
  );
}
