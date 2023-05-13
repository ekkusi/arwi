import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import HomeStack from "./containers/HomeStack";
import ProfileStack from "./containers/ProfileStack";
import DesignStack from "./containers/DesignStack";

export type HomeStackParamList = {
  Home: {};
};
export type ProfileStackParamList = {
  Profile: {};
};
export type DesignStackParamList = {
  Design: {};
};

const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "darkgray",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case "HomeStack":
                return (
                  <MaterialCommunityIcon
                    name="home-outline"
                    size={size}
                    color={color}
                  />
                );
              case "ProfileStack":
                return (
                  <MaterialCommunityIcon
                    name="account-circle-outline"
                    size={size}
                    color={color}
                  />
                );
              case "DesignStack":
                return (
                  <MaterialCommunityIcon
                    name="pencil-ruler"
                    size={size}
                    color={color}
                  />
                );

              default:
                return null;
            }
            // You can return any component that you like here!
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "white",
          headerShown: false,
          tabBarStyle: { backgroundColor: "white" },
        })}
      >
        <BottomTab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: "Koti" }}
        />
        <BottomTab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{ title: "Profiili" }}
        />
        <BottomTab.Screen
          name="DesignStack"
          component={DesignStack}
          options={{ title: "Design" }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
