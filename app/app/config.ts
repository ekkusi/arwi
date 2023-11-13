import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { COLORS, SPACING } from "../theme";

export const defaultHeaderStyles: NativeStackNavigationOptions = {
  statusBarColor: COLORS.primary,
  headerStyle: {
    backgroundColor: COLORS.green,
  },
  headerTintColor: COLORS.white,
};

export const tabBarStyles = {
  backgroundColor: COLORS.white,
  height: 75,
  paddingTop: SPACING.lg,
  paddingBottom: Platform.OS === "ios" ? SPACING.lg : SPACING.md,
};
