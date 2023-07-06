import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { COLORS } from "../theme";

export const defaultHeaderStyles: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: COLORS.green,
  },
  headerTintColor: COLORS.white,
};
