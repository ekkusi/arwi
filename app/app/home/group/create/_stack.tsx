import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler/lib/typescript/components/touchables";
import Entypo from "react-native-vector-icons/Entypo";
import GroupNameSelectionView from ".";
import PopUpDialog from "../../../../components/PopUpDialog";
import CButton from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { COLORS } from "../../../../theme";
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
        initialRouteName="name"
        screenOptions={({ navigation }) => ({
          animationTypeForReplace: "push",
          title: t("GroupCreationStack.newGroup", "Uusi ryhmä"),
          animation: "slide_from_right",
          ...defaultHeaderStyles,
        })}
      >
        <Screen name="name" component={GroupNameSelectionView} />
        <Screen name="subject" component={GroupSubjectSelectionView} />
        <Screen name="students" component={GroupStudentsSelectionView} />
      </Navigator>
    </GroupCreationProvider>
  );
}
