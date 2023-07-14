import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { COLORS, SPACING } from "../theme";

export const defaultHeaderStyles: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: COLORS.green,
  },
  headerTintColor: COLORS.white,
};

export const tabBarStyles = {
  backgroundColor: COLORS.white,
  height: 60,
  paddingTop: SPACING.md,
};
