import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { LandingStackParamList } from "./types";

const LandingStackNavigator = createNativeStackNavigator<LandingStackParamList>();

type LandingStackProps = {
  setTeacherId: (teacherId: string) => void;
};

export default function LandingStack({ setTeacherId }: LandingStackProps) {
  return (
    <LandingStackNavigator.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
      <LandingStackNavigator.Screen name="LandingPage" component={LandingPage} initialParams={{ setTeacherId }} />
      <LandingStackNavigator.Screen name="LoginPage" component={LoginPage} />
      <LandingStackNavigator.Screen name="SignupPage" component={SignupPage} />
    </LandingStackNavigator.Navigator>
  );
}
