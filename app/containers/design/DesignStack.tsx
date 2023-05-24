import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";

export type DesignStackParamList = {
  Design: {};
};

const DesignStackNavigator = createNativeStackNavigator<DesignStackParamList>();

export default function DesignStack() {
  return (
    <CView>
      <CText>Moi</CText>
    </CView>
    // <DesignStackNavigator.Navigator initialRouteName="Design" screenOptions={screenOptions}>
    //  <DesignStackNavigator.Screen name="Design" component={DesignView} initialParams={{}} />
    // </DesignStackNavigator.Navigator>
  );
}
