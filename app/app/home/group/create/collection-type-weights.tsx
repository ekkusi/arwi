import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { CreateCollectionTypeInput } from "arwi-backend/src/types";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import CButton from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { COLORS } from "../../../../theme";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import GroupCreationBody from "./_body";
import CText from "../../../../components/primitives/CText";
import CTextInput from "../../../../components/primitives/CTextInput";

export default function GroupCollectionTypeWeightsView({
  navigation,
}: NativeStackScreenProps<GroupCreationStackParams, "group-create-collection-type-weights", "home-stack">) {
  const { t } = useTranslation();

  const { group, setGroup } = useGroupCreationContext();
  const [error, setError] = useState<string | undefined>(undefined);

  const types = group.collectionTypes;

  const sum = types.reduce((acc, curr) => acc + curr.weight, 0);

  const validate = () => {
    if (sum !== 100) {
      return t("collection-type-weights-sum-error", "Arviointityyppien painotusten summan tulee olla 100");
    }
  };

  const onMoveToNextView = () => {
    const errorMessage = validate();

    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    // setGroup({ ...group, collectionTypes: selectedTypes.map((item) => ({ category: item.category, name: item.name, weight: 0 })) });
    navigation.navigate("group-create-students");
  };

  const onMoveBack = () => {
    // setGroup({ ...group, collectionTypes: selectedTypes.map((item) => ({ category: item.category, name: item.name, weight: 0 })) });
    navigation.goBack();
  };

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
    <GroupCreationBody navigation={navigation} progressState={3} style={{ paddingTop: "3xl", paddingHorizontal: "md" }}>
      <CView style={{ flex: 1 }}>
        <CText style={{ fontSize: "lg", marginBottom: "lg" }}>{t("select-collection-type-weights", "Valitse arviointityyppien painoarvot")}</CText>
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
        {error && <CText style={{ color: "error", fontWeight: "600", marginTop: "lg" }}>{error}</CText>}
      </CView>
      <CView style={{ flexDirection: "row", justifyContent: "space-between", padding: "xl" }}>
        <CButton onPress={onMoveBack}>
          <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
        </CButton>
        <CButton
          disabled={!!error}
          onPress={onMoveToNextView}
          leftIcon={<MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />}
        />
      </CView>
    </GroupCreationBody>
  );
}
