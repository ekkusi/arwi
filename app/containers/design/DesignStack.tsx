import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { screenOptions } from "../home/HomeStack";
import DesignView from "./DesignView";

export type DesignStackParamList = {
  Design: {};
};

const DesignStackNavigator = createNativeStackNavigator<DesignStackParamList>();

export default function DesignStack() {
  return (
    <View>
      <Text>Moi</Text>
    </View>
    // <DesignStackNavigator.Navigator initialRouteName="Design" screenOptions={screenOptions}>
    //  <DesignStackNavigator.Screen name="Design" component={DesignView} initialParams={{}} />
    // </DesignStackNavigator.Navigator>
  );
}
