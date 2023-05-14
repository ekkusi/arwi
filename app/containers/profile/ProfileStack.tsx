import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { screenOptions } from "../home/HomeStack";
import ProfileView from "./ProfileView";

export type ProfileStackParamList = {
  Profile: {};
};

const ProfileStackNavigator = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <View>
      <Text>Moi</Text>
    </View>
    // <ProfileStackNavigator.Navigator initialRouteName="Profile" screenOptions={screenOptions}>
    //  <ProfileStackNavigator.Screen name="Profile" component={ProfileView} initialParams={{}} />
    // </ProfileStackNavigator.Navigator>
  );
}
