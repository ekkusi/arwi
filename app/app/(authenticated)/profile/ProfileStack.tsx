import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../(home)/HomeStack";
import ProfileView from "./ProfileView";

export type ProfileStackParamList = {
  Profile: {};
};

const ProfileStackNavigator = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <ProfileStackNavigator.Navigator initialRouteName="Profile" screenOptions={screenOptions}>
      <ProfileStackNavigator.Screen name="Profile" component={ProfileView} initialParams={{}} />
    </ProfileStackNavigator.Navigator>
  );
}
