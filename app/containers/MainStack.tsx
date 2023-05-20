import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../theme";
import DesignStack from "./design/DesignStack";
import HomeStack from "./home/HomeStack";
import ProfileStack from "./profile/ProfileStack";
import { MainStackParamList } from "./types";

const BottomTab = createBottomTabNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "HomeStack":
              return <MaterialCommunityIcon name="home-outline" size={size} color={color} />;
            case "ProfileStack":
              return <MaterialCommunityIcon name="account-circle-outline" size={size} color={color} />;
            case "DesignStack":
              return <MaterialCommunityIcon name="pencil-ruler" size={size} color={color} />;

            default:
              return null;
          }
          // You can return any component that you like here!
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.darkgray,
        headerShown: false,
        tabBarStyle: { backgroundColor: COLORS.white },
      })}
    >
      <BottomTab.Screen name="HomeStack" component={HomeStack} options={{ title: "Koti" }} />
      <BottomTab.Screen name="ProfileStack" component={ProfileStack} options={{ title: "Profiili" }} />
      <BottomTab.Screen name="DesignStack" component={DesignStack} options={{ title: "Design" }} />
    </BottomTab.Navigator>
  );
}
