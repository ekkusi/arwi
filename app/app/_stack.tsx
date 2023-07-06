import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../hooks-and-providers/AuthProvider";
import { COLORS, SPACING } from "../theme";
import DesignStack from "./design/_stack";
import HomeStack from "./home/_stack";
import ProfileStack from "./profile/_stack";
import { RootStackParams } from "./types";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParams>();

export default function MainStack() {
  const { authState } = useAuth();
  const { t } = useTranslation();

  console.log("Returning tabs");
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          console.log(route.name);
          switch (route.name) {
            case "home":
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
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: 60,
          paddingTop: SPACING.md,
          // display: route !== "/group/create" ? "flex" : "none",
        },
        tabBarLabelStyle: { marginBottom: SPACING.lg },
        headerShown: false,
      })}
    >
      <Screen name="home" component={HomeStack} options={{ title: "Home" }} />
      <Screen name="profile" component={ProfileStack} options={{ title: "Profile" }} />
      <Screen name="design" component={DesignStack} options={{ title: "Design" }} />
    </Navigator>
  );
}
