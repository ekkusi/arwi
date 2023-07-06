import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DesignView from ".";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import { defaultHeaderStyles } from "../config";
import { DesignStackParams } from "./types";

const { Navigator, Screen } = createNativeStackNavigator<DesignStackParams>();

export default function DesignStack() {
  return (
    <Navigator initialRouteName="design" screenOptions={defaultHeaderStyles}>
      <Screen name="design" component={DesignView} />
    </Navigator>
  );
}
