import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import GroupNameSelectionView from "./general-info";
import { defaultHeaderStyles } from "../../../config";
import { GroupCreationProvider } from "./GroupCreationProvider";
import GroupStudentsSelectionView from "./students";
import GroupSubjectSelectionView from "./subject";
import { GroupCreationStackParams } from "./types";
import GroupCollectionTypesView from "./collection-types";
import GroupCollectionTypeWeightsView from "./collection-type-weights";

const { Navigator, Screen } = createNativeStackNavigator<GroupCreationStackParams>();

export default function GroupCreationStack() {
  const { t } = useTranslation();

  return (
    <GroupCreationProvider>
      <Navigator
        initialRouteName="group-create-subject"
        screenOptions={() => ({
          animationTypeForReplace: "push",
          title: t("GroupCreationStack.newGroup", "Uusi ryhmä"),
          animation: "slide_from_right",
          ...defaultHeaderStyles,
        })}
      >
        <Screen name="group-create-general-info" component={GroupNameSelectionView} />
        <Screen name="group-create-subject" component={GroupSubjectSelectionView} />
        <Screen name="group-create-students" component={GroupStudentsSelectionView} />
        <Screen name="group-create-collection-types" component={GroupCollectionTypesView} />
        <Screen name="group-create-collection-type-weights" component={GroupCollectionTypeWeightsView} />
      </Navigator>
    </GroupCreationProvider>
  );
}
