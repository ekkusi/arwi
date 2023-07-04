import { Tabs } from "expo-router";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SPACING } from "../../theme";

export default function MainStack() {
  return (
    <Tabs
      initialRouteName="HomeView"
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
        headerShown: false,
        tabBarStyle: { backgroundColor: COLORS.white, height: 60, paddingTop: SPACING.md },
        tabBarLabelStyle: { marginBottom: SPACING.lg },
      })}
    >
      <Tabs.Screen name="(home)" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="design" options={{ title: "Design" }} />
    </Tabs>
  );
}
