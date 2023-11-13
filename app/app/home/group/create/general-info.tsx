import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Alert, BackHandler, Keyboard, TextInput } from "react-native";
import { getModuleInfos } from "arwi-backend/src/utils/subjectUtils";
import { ModuleInfo } from "arwi-backend/src/types";
import CButton from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { nameValidator } from "../../../../helpers/textValidation";
import { COLORS } from "../../../../theme";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import GroupCreationBody from "./_body";
import TextFormField from "../../../../components/form/TextFormField";
import SelectFormField from "../../../../components/form/SelectFormField";
import ProgressBar from "../../../../components/ProgressBar";
import { useKeyboardListener } from "../../../../hooks-and-providers/keyboard";
import CTouchableWithoutFeedback from "../../../../components/primitives/CTouchableWithoutFeedback";

export default function GroupNameSelectionView({
  navigation,
}: NativeStackScreenProps<GroupCreationStackParams, "group-create-general-info", "home-stack">) {
  const { t } = useTranslation();

  const { group, setGroup } = useGroupCreationContext();

  if (!group.subject) throw new Error("Unexpected error, subject is undefined");
  const modules: ModuleInfo[] = getModuleInfos(group.subject?.code);

  const inputRef = useRef<TextInput>(null);

  const blurInput = useCallback(() => {
    inputRef.current?.blur();
  }, []);

  useKeyboardListener({ onHide: blurInput });

  useEffect(() => {
    const backAction = () => {
      Alert.alert("", t("GroupCreationStack.cancelPopUpMessage", "Oletko varma, että haluat perua ryhmän luonnin?"), [
        {
          text: t("Dialog.no", "Ei"),
          onPress: () => null,
          style: "cancel",
        },
        { text: t("Dialog.yes", "Kyllä"), onPress: () => navigation.getParent("home-stack")?.navigate("home") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      backHandler.remove();
    };
  }, [navigation, t]);

  return (
    <GroupCreationBody navigation={navigation}>
      <CView style={{ flex: 1, justifyContent: "space-between" }}>
        <CTouchableWithoutFeedback accessible={false} preventChildEvents={false} style={{ height: "100%" }} onPress={Keyboard.dismiss}>
          <CView style={{ flex: 8, padding: "md", alignItems: "center", justifyContent: "center", gap: 30 }}>
            <TextFormField
              ref={inputRef}
              title={t("group-name", "Ryhmän nimi")}
              placeholder={t("GroupNameSelection.groupName", "Ryhmän nimi")}
              value={group.name}
              onChange={(text) => setGroup({ ...group, name: text })}
              validate={nameValidator}
            />
            <SelectFormField
              title={t("class-year-or-module", "Luokka-aste tai moduuli")}
              placeholder={t("select-year-or-module", "Valitse luokka-aste tai moduuli")}
              options={modules}
              onSelect={(item) => {
                setGroup({ ...group, module: item });
              }}
              getOptionValue={(item) => `${item.educationLevel}-${item.learningObjectiveGroupKey}`}
              formatLabel={(item) => item.label.fi}
            />
          </CView>
          <CView style={{ justifyContent: "flex-end" }}>
            <CView style={{ flexDirection: "row", justifyContent: "space-between", padding: "xl" }}>
              <CButton style={{}} onPress={() => navigation.goBack()}>
                <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
              </CButton>
              <CButton
                disabled={group.name.length === 0 || group.module === undefined}
                onPress={() => navigation.navigate("group-create-students")}
                leftIcon={<MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />}
              />
            </CView>
            <ProgressBar color={COLORS.primary} progress={2 / 3} />
          </CView>
        </CTouchableWithoutFeedback>
      </CView>
    </GroupCreationBody>
  );
}
