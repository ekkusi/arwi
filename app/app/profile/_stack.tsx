import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { defaultHeaderStyles } from "../config";
import ProfileView from ".";
import { ProfileStackParams } from "./types";

const ProfileStackNavigator = createNativeStackNavigator<ProfileStackParams>();

export default function ProfileStack() {
  return (
    <ProfileStackNavigator.Navigator initialRouteName="index" screenOptions={defaultHeaderStyles}>
      <ProfileStackNavigator.Screen name="index" component={ProfileView} />
    </ProfileStackNavigator.Navigator>
  );
}
