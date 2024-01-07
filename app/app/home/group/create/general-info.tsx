import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native";
import { getModuleInfos } from "arwi-backend/src/utils/subjectUtils";
import { ModuleInfo } from "arwi-backend/src/types";
import { nameValidator } from "../../../../helpers/textValidation";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import GroupCreationBody from "./_body";
import TextFormField from "../../../../components/form/TextFormField";
import SelectFormField from "../../../../components/form/SelectFormField";
import CKeyboardAvoidingView from "../../../../components/primitives/CKeyboardAvoidingView";

export default function GroupNameSelectionView({
  navigation,
}: NativeStackScreenProps<GroupCreationStackParams, "group-create-general-info", "home-stack">) {
  const { t } = useTranslation();

  const { group, setGroup } = useGroupCreationContext();

  if (!group.subject) throw new Error("Unexpected error, subject is undefined");
  const modules: ModuleInfo[] = getModuleInfos(group.subject?.code);

  const inputRef = useRef<TextInput>(null);

  return (
    <GroupCreationBody navigation={navigation} progressState={2} moveForwardDisabled={group.name.length === 0 || group.module === undefined}>
      <CKeyboardAvoidingView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 30 }}>
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
          defaultValue={group.module}
          options={modules}
          onSelect={(item) => {
            setGroup({ ...group, module: item });
          }}
          getOptionValue={(item) => `${item.educationLevel}-${item.learningObjectiveGroupKey}`}
          formatLabel={(item) => item.label.fi}
        />
      </CKeyboardAvoidingView>
    </GroupCreationBody>
  );
}
