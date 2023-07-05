import { Redirect, Tabs } from "expo-router";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import { COLORS, SPACING } from "../../theme";

export const defaultHeaderStyles = {
  headerStyle: {
    backgroundColor: COLORS.green,
  },
  headerTintColor: COLORS.white,
};

export default function MainStack() {
  const { authState } = useAuth();
  return authState.authenticated ? (
    <Tabs
      initialRouteName="(home)"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "(home)":
              return <MaterialCommunityIcon name="home-outline" size={size} color={color} />;
            case "profile":
              return <MaterialCommunityIcon name="account-circle-outline" size={size} color={color} />;
            case "design":
              return <MaterialCommunityIcon name="pencil-ruler" size={size} color={color} />;

            default:
              return null;
          }
          // You can return any component that you like here!
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.darkgray,
        tabBarStyle: { backgroundColor: COLORS.white, height: 60, paddingTop: SPACING.md },
        tabBarLabelStyle: { marginBottom: SPACING.lg },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="(home)" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="design" options={{ title: "Design" }} />
    </Tabs>
  ) : (
    <Redirect href="/auth/welcome" />
  );
}
