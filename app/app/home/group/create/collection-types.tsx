import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { CollectionTypeCategory } from "arwi-backend/src/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import CButton from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { COLORS } from "../../../../theme";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import GroupCreationBody, { SCROLL_TO_INPUT_EXTRA_HEIGHT } from "./_body";
import { getCollectionTypeTranslation } from "../../../../helpers/translation";
import SelectFormField from "../../../../components/form/SelectFormField";
import CText from "../../../../components/primitives/CText";
import CTextInput from "../../../../components/primitives/CTextInput";
import { dividePercentages } from "../../../../helpers/mathUtilts";
import CKeyboardAwareScrollView from "../../../../components/primitives/CKeyboardAwareScrollView";

type CollectionTypeOption = {
  name: string;
  category: CollectionTypeCategory;
};

type CollectionTypeInfo = CollectionTypeOption & {
  id: string;
};

const mapCollectionTypeInfo = (type: CollectionTypeOption, otherSelectedTypes: CollectionTypeOption[], noNameMap = false): CollectionTypeInfo => {
  let { name } = type;
  let id = type.category.toString();
  let matchingCount = 0;
  for (let i = 0; i < otherSelectedTypes.length; i += 1) {
    if (otherSelectedTypes[i].category === type.category) matchingCount += 1;
  }
  if (matchingCount > 0) {
    if (!noNameMap) name = `${type.name} ${matchingCount + 1}`;
    id = `${type.category}-${matchingCount + 1}`;
  }
  return {
    name,
    id,
    category: type.category,
  };
};

const mapCollectionTypeInfos = (types: CollectionTypeOption[]): CollectionTypeInfo[] => {
  const mappedTypes: CollectionTypeInfo[] = [];
  types.forEach((type) => {
    const mappedType = mapCollectionTypeInfo(type, mappedTypes, true);
    mappedTypes.push(mappedType);
  });
  return mappedTypes;
};

export default function GroupCollectionTypesView({
  navigation,
}: NativeStackScreenProps<GroupCreationStackParams, "group-create-collection-types", "home-stack">) {
  const { t } = useTranslation();

  const { group, setGroup } = useGroupCreationContext();
  const [selectedTypes, setSelectedTypes] = useState<CollectionTypeInfo[]>(() => mapCollectionTypeInfos(group.collectionTypes));
  const [error, setError] = useState<string | undefined>(undefined);

  const collectionTypeOptions: CollectionTypeOption[] = useMemo(() => {
    // const filteredTypes = Object.keys(CollectionTypeCategory).filter((key) => !selectedTypes.find((item) => item.value === key));
    return Object.keys(CollectionTypeCategory).map((key) => ({
      name: getCollectionTypeTranslation(t, key as CollectionTypeCategory),
      category: key as CollectionTypeCategory,
    }));
  }, [t]);

  const debouncedOnTypeChanged = debounce((type: CollectionTypeInfo) => {
    setError(undefined);
    setSelectedTypes((prev) => {
      const newTypes = prev.map((item) => (item.id === type.id ? type : item));
      return newTypes;
    });
  }, 200);

  const onTypeChanged = useCallback(debouncedOnTypeChanged, [debouncedOnTypeChanged]);

  const onRemoveType = (type: CollectionTypeInfo) => {
    setSelectedTypes((prev) => prev.filter((item) => item.id !== type.id));
  };

  const onSelectType = (type: CollectionTypeOption) => {
    const mappedType = mapCollectionTypeInfo(type, selectedTypes);

    setSelectedTypes((prev) => [...prev, mappedType]);
  };

  const validate = () => {
    if (selectedTypes.length === 0) return t("select-at-least-one-type", "Valitse vähintään yksi arviointityyppi");

    const hasDuplicates = selectedTypes.some((item, index) => selectedTypes.findIndex((i) => i.name === item.name) !== index);
    if (hasDuplicates) return t("collection-types-must-be-unique", "Arviointityypeillä ei saa olla samaa nimeä");
  };

  const onMoveToNextView = () => {
    const errorMessage = validate();

    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    const weights = dividePercentages(selectedTypes.length);

    setGroup({ ...group, collectionTypes: selectedTypes.map((item, i) => ({ category: item.category, name: item.name, weight: weights[i] })) });
    navigation.navigate("group-create-collection-type-weights");
  };

  const onMoveBack = () => {
    setGroup({ ...group, collectionTypes: selectedTypes.map((item) => ({ category: item.category, name: item.name, weight: 0 })) });
    navigation.goBack();
  };

  useEffect(() => {
    return () => {
      onTypeChanged.cancel();
    };
  }, [onTypeChanged]);

  return (
    <GroupCreationBody navigation={navigation} progressState={3} onMoveBack={onMoveBack} onMoveForward={onMoveToNextView}>
      {/* <CKeyboardAvoidingView style={{ flex: 1 }} behavior={undefined}> */}
      <CKeyboardAwareScrollView androidKeyboardAvoidProps={{ keyboardVerticalOffset: SCROLL_TO_INPUT_EXTRA_HEIGHT }}>
        <SelectFormField
          title={t("evaluation-types", "Arviointityypit")}
          options={collectionTypeOptions}
          getOptionValue={(item) => item.category}
          formatLabel={(item) => item.name}
          onSelect={onSelectType}
          selectAutomaticallyToInput={false}
        />
        <CView style={{ marginTop: "3xl" }}>
          <CText>{t("selected-evaluation-types", "Valitut arviointityypit")}</CText>
          {selectedTypes.length > 0 ? (
            selectedTypes.map((type) => (
              <CView key={`${type.id}`} style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
                <CTextInput
                  onChange={(event) => onTypeChanged({ ...type, name: event.nativeEvent.text })}
                  defaultValue={type.name}
                  style={{ width: "auto", flex: 1, marginRight: "lg" }}
                />
                <CButton variant="empty" onPress={() => onRemoveType(type)} style={{ paddingTop: "xl" }}>
                  <MaterialCommunityIcon size={20} name="trash-can-outline" color={COLORS.darkgray} />
                </CButton>
              </CView>
            ))
          ) : (
            <CText style={{ marginTop: "lg", color: "darkgray", fontWeight: "300" }}>
              {t("select-at-least-one-type", "Valitse vähintään yksi arviointityyppi")}
            </CText>
          )}
        </CView>
        {error && <CText style={{ color: "error", fontWeight: "600", marginTop: "lg" }}>{error}</CText>}
      </CKeyboardAwareScrollView>
      {/* </CKeyboardAvoidingView> */}
    </GroupCreationBody>
  );
}
