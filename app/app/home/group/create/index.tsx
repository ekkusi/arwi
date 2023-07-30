import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getClassYearInfos } from "arwi-backend/src/utils/subjectUtils";
import { useEffect } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Alert, BackHandler } from "react-native";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CView from "../../../../components/primitives/CView";
import ProgressBar from "../../../../components/ProgressBar";
import { nameValidator } from "../../../../helpers/textValidation";
import { COLORS } from "../../../../theme";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import { tabBarStyles } from "../../../config";
import GroupCreationBody from "./_body";
import TextFormField from "../../../../components/form/TextFormField";
import SelectFormField from "../../../../components/form/SelectFormField";

export default function GroupNameSelectionView({ navigation }: NativeStackScreenProps<GroupCreationStackParams, "name", "main-tab-bar">) {
  const { t } = useTranslation();

  useEffect(() => {
    navigation.getParent("main-tab-bar")?.setOptions({
      tabBarStyle: { display: "none" },
      tabBarOptions: { keyboardHidesTabBar: false },
    });
    const backAction = () => {
      Alert.alert("", t("GroupCreationStack.cancelPopUpMessage", "Oletko varma, että haluat perua ryhmän luonnin?"), [
        {
          text: t("Dialog.no", "Ei"),
          onPress: () => null,
          style: "cancel",
        },
        { text: t("Dialog.yes", "Kyllä"), onPress: () => navigation.getParent("main-tab-bar")?.navigate("index") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      navigation.getParent("main-tab-bar")?.setOptions({ tabBarStyle: tabBarStyles });
      backHandler.remove();
    };
  }, [navigation, t]);

  const classes = getClassYearInfos();
  const { group, setGroup } = useGroupCreationContext();
  return (
    <GroupCreationBody navigation={navigation}>
      <CView style={{ flex: 1, justifyContent: "space-between" }}>
        <CView style={{ flex: 8, padding: "md", alignItems: "center", justifyContent: "center", gap: 30 }}>
          <TextFormField
            title={t("group-name", "Ryhmän nimi")}
            placeholder={t("GroupNameSelection.groupName", "Ryhmän nimi")}
            value={group.name}
            onChange={(text) => setGroup({ ...group, name: text })}
            validate={nameValidator}
          />
          <SelectFormField
            title={t("class-year", "Luokka-aste")}
            placeholder={t("GroupNameSelection.selectClass", "Valitse luokka")}
            options={classes.map((obj) => ({ value: obj.code, label: obj.label }))}
            onSelect={(item) => {
              const selectedClass = classes.find((obj) => obj.code === item.value);
              setGroup({ ...group, class: selectedClass });
            }}
          />
        </CView>
        <CView style={{ justifyContent: "flex-end" }}>
          <CView style={{ flexDirection: "row", justifyContent: "flex-end", padding: "xl" }}>
            <CButton
              disabled={group.name.length === 0 || group.class === undefined}
              onPress={() => navigation.navigate("subject")}
              leftIcon={<MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />}
            />
          </CView>
          <ProgressBar color={COLORS.primary} progress={1 / 3} />
        </CView>
      </CView>
    </GroupCreationBody>
  );
}
