import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import CView from "../../../../components/primitives/CView";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import GroupCreationBody from "./_body";
import CText from "../../../../components/primitives/CText";
import CTextInput from "../../../../components/primitives/CTextInput";
import CKeyboardAwareScrollView from "../../../../components/primitives/CKeyboardAwareScrollView";

export default function GroupCollectionTypeWeightsView({
  navigation,
}: NativeStackScreenProps<GroupCreationStackParams, "group-create-collection-type-weights", "home-stack">) {
  const { t } = useTranslation();

  const { group, setGroup } = useGroupCreationContext();

  const types = group.collectionTypes;

  const sum = types.reduce((acc, curr) => acc + curr.weight, 0);

  const onWeightChanged = (index: number, weightString: string) => {
    const weight = parseInt(weightString, 10);
    if (Number.isNaN(weight)) {
      return;
    }

    const newTypes = [...types];
    newTypes[index].weight = weight;
    setGroup((prev) => ({ ...prev, collectionTypes: newTypes }));
  };

  return (
    <GroupCreationBody navigation={navigation} progressState={4} moveForwardDisabled={sum !== 100}>
      <CKeyboardAwareScrollView>
        <CText style={{ fontSize: "lg", marginBottom: "2xl" }}>{t("select-collection-type-weights", "Valitse arviointityyppien painoarvot")}</CText>
        <CView style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 28 }}>
          <CText>%</CText>
        </CView>
        {types.map((type, index) => (
          <CView key={`${type.category}-${index}`} style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
            <CText style={{ flex: 1 }}>{type.name}</CText>
            <CTextInput
              keyboardType="number-pad"
              onChange={(event) => onWeightChanged(index, event.nativeEvent.text)}
              defaultValue={type.weight.toString()}
              maxLength={3}
              style={{ width: 50, marginRight: "lg", textAlign: "center" }}
            />
          </CView>
        ))}
        <CView style={{ width: "100%", flexDirection: "row", marginTop: "lg" }}>
          <CText style={{ color: "darkgray", fontWeight: "300", flex: 1 }}>{t("total", "Yhteensä")}</CText>
          <CText style={{ fontWeight: "500", color: sum !== 100 ? "error" : "darkgray", marginRight: 20 }}>{sum}</CText>
        </CView>
      </CKeyboardAwareScrollView>
    </GroupCreationBody>
  );
}
