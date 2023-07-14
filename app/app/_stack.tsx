import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SPACING } from "../theme";
import { tabBarStyles } from "./config";
import DesignStack from "./design/_stack";
import HomeStack from "./home/_stack";
import ProfileStack from "./profile/_stack";
import { RootStackParams } from "./types";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParams>();

export default function MainStack() {
  const { t } = useTranslation();
  return (
    <Navigator
      id="main-tab-bar"
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
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
        tabBarStyle: tabBarStyles,
        tabBarLabelStyle: { marginBottom: SPACING.lg },
        headerShown: false,
      })}
    >
      <Screen name="home" component={HomeStack} options={{ title: t("MainStack.home", "Koti") }} />
      <Screen name="profile" component={ProfileStack} options={{ title: t("MainStack.profile", "Profiili") }} />
      <Screen name="design" component={DesignStack} options={{ title: t("MainStack.design", "Design") }} />
    </Navigator>
  );
}
