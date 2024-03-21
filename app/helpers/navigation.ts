import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function getCurrentRoute<T extends ParamListBase>(navigation: NativeStackNavigationProp<T>) {
  const { routes } = navigation.getState();
  return routes.length > 0 ? routes[routes.length - 1] : undefined;
}
