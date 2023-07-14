import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import GroupNameSelectionView from ".";
import { defaultHeaderStyles } from "../../../config";
import { GroupCreationProvider } from "./GroupCreationProvider";
import GroupStudentsSelectionView from "./students";
import GroupSubjectSelectionView from "./subject";
import { GroupCreationStackParams } from "./types";

const { Navigator, Screen } = createNativeStackNavigator<GroupCreationStackParams>();

export default function GroupCreationStack() {
  const { t } = useTranslation();
  return (
    <GroupCreationProvider>
      <Navigator
        initialRouteName="index"
        screenOptions={{
          animationTypeForReplace: "push",
          title: t("GroupCreationStack.newGroup", "Uusi ryhmä"),
          animation: "slide_from_right",
          ...defaultHeaderStyles,
        }}
      >
        <Screen name="index" component={GroupNameSelectionView} />
        <Screen name="subject" component={GroupSubjectSelectionView} />
        <Screen name="students" component={GroupStudentsSelectionView} />
      </Navigator>
    </GroupCreationProvider>
  );
}
