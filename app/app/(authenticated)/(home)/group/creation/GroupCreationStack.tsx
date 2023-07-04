import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { COLORS } from "../../../../../theme";
import GroupNameSelectionView from "./GroupNameSelectionView";
import GroupStudentCreationView from "./GroupStudentCreationView";
import GroupSubjectSelectionView from "./GroupSubjectSelectionView";
import { GroupCreationStackParams } from "./types";

const HomeStackNavigator = createNativeStackNavigator<GroupCreationStackParams>();

export default function GroupCreationStack() {
  return (
    <HomeStackNavigator.Navigator
      initialRouteName="GroupNameSelectionView"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.green,
        },
        headerTintColor: COLORS.white,
        animationTypeForReplace: "push",
        title: "Uusi ryhmä",
      }}
    >
      <HomeStackNavigator.Screen name="GroupNameSelectionView" component={GroupNameSelectionView} />
      <HomeStackNavigator.Screen name="GroupSubjectSelectionView" component={GroupSubjectSelectionView} />
      <HomeStackNavigator.Screen name="GroupStudentCreationView" component={GroupStudentCreationView} />
    </HomeStackNavigator.Navigator>
  );
}
