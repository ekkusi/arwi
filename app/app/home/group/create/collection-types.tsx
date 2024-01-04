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
import Card from "../../../../components/Card";
import CTouchableOpacity from "../../../../components/primitives/CTouchableOpacity";
import CImage from "../../../../components/primitives/CImage";
import CModal from "../../../../components/CModal";
import TextFormField from "../../../../components/form/TextFormField";

type CollectionTypeOption = {
  name: string;
  category: CollectionTypeCategory;
};

type CollectionTypeInfo = CollectionTypeOption & {
  id: string;
};

const mapCollectionTypeInfo = (type: CollectionTypeOption, otherSelectedTypes: CollectionTypeOption[], noNameMap = false): CollectionTypeInfo => {
  const { name } = type;
  let id = type.category.toString();
  let matchingCount = 0;
  for (let i = 0; i < otherSelectedTypes.length; i += 1) {
    if (otherSelectedTypes[i].category === type.category) matchingCount += 1;
  }
  id = `${type.category}-${matchingCount + 1}`;
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
  const defaultType = { name: getCollectionTypeTranslation(t, "EXAM" as CollectionTypeCategory), category: "EXAM" as CollectionTypeCategory, id: "" };

  const { group, setGroup } = useGroupCreationContext();
  const [selectedTypes, setSelectedTypes] = useState<CollectionTypeInfo[]>(() => mapCollectionTypeInfos(group.collectionTypes));
  const [error, setError] = useState<string | undefined>(undefined);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [targetOnEdit, setTargetOnEdit] = useState<CollectionTypeInfo>(defaultType);

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
        <CView style={{ gap: 15 }}>
          <CView style={{ gap: 15 }}>
            <CText style={{ fontSize: "md", color: "darkgray", fontWeight: "500" }}>{t("evaluation-types", "Arviointikohteet")}</CText>
            {selectedTypes.length > 0 ? (
              <CView style={{ gap: 3 }}>
                {selectedTypes.map((type) => (
                  <Card key={type.id} disabled={type.category === "CLASS_PARTICIPATION"} style={{}}>
                    <CView style={{ flex: 6, flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "flex-start" }}>
                      <CView style={{ flexGrow: 1, gap: 2 }}>
                        <CView style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                          <CText style={{ fontWeight: "700", color: "darkgray", flex: 1 }}>{type.name}</CText>
                        </CView>
                        <CView style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 5 }}>
                          <CText>
                            {type.category === "CLASS_PARTICIPATION" ? (
                              <CText />
                            ) : (
                              <CText style={{ fontSize: "sm", color: "gray" }}>
                                {getCollectionTypeTranslation(t, type.category as CollectionTypeCategory)},{" "}
                              </CText>
                            )}
                            <CText style={{ fontSize: "sm", color: "gray" }}>
                              {type.category === "CLASS_PARTICIPATION"
                                ? t("evaluated-continuously", "jatkuvasti arvioitava")
                                : t("evaluated-once", "Kerran arvioitava").toLocaleLowerCase()}
                            </CText>
                          </CText>
                        </CView>
                      </CView>
                      <CView style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                        {type.category !== "CLASS_PARTICIPATION" && (
                          <CView style={{ flexDirection: "row" }}>
                            <CTouchableOpacity
                              onPress={() => {
                                setTargetOnEdit(type);
                                setEditModalOpen(true);
                              }}
                              style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }}
                            >
                              <MaterialCommunityIcon name="pencil-outline" color={COLORS.primary} size={24} />
                            </CTouchableOpacity>
                            <CTouchableOpacity
                              onPress={() => onRemoveType(type)}
                              style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }}
                            >
                              <MaterialCommunityIcon name="trash-can-outline" color={COLORS.primary} size={24} />
                            </CTouchableOpacity>
                          </CView>
                        )}
                      </CView>
                    </CView>
                  </Card>
                ))}
              </CView>
            ) : (
              <CText style={{ marginTop: "lg", color: "darkgray", fontWeight: "300" }}>
                {t("select-at-least-one-type", "Valitse vähintään yksi arviointityyppi")}
              </CText>
            )}
            {/* <CText style={{ fontSize: "md", fontWeight: "400" }}>{t("add-evaluation-type", "Lisää arviointityyppi")}</CText>
            <CView style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap: 1, width: "100%" }}>
              {collectionTypeOptions
                .filter((type) => type.category !== "CLASS_PARTICIPATION")
                .map((type) => (
                  <CButton
                    key={type.category}
                    title={type.name}
                    variant="outline"
                    size="small"
                    colorScheme="darkgray"
                    style={{ margin: 3, paddingHorizontal: "md", gap: "sm", justifyContent: "space-between" }}
                    onPress={() => onSelectType(type)}
                    rightIcon={<MaterialCommunityIcon name="plus" size={24} color={COLORS.darkgray} />}
                  />
                ))}
                </CView> */}

            <CButton
              colorScheme="primary"
              title={t("add-evaluation-target", "Uusi arviointikohde")}
              onPress={() => {
                setTargetOnEdit(defaultType);
                setEditModalOpen(true);
              }}
            />
          </CView>
        </CView>
        {error && <CText style={{ color: "error", fontWeight: "600", marginTop: "lg" }}>{error}</CText>}
        <CModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          placement="bottom"
          title={t("add-evaluation-target", "Uusi arviointikohde")}
          innerViewStyles={{ paddingBottom: 0 }}
          closeButton={
            <CButton
              title={t("save", "Tallenna")}
              variant="empty"
              colorScheme="primary"
              textStyle={{ color: "primary" }}
              onPress={() => {
                if (targetOnEdit.id === "") {
                  const modifiedTarget = mapCollectionTypeInfo({ name: targetOnEdit.name, category: targetOnEdit.category }, selectedTypes);
                  setSelectedTypes([...selectedTypes, modifiedTarget]);
                } else {
                  const selectedTargets = selectedTypes.filter((type) => type.id !== targetOnEdit.id);
                  setSelectedTypes([...selectedTargets, targetOnEdit]);
                }
                setEditModalOpen(false);
              }}
            />
          }
        >
          <CView style={{ height: "100%", gap: 10 }}>
            <TextFormField title={t("name", "Nimi")} value={targetOnEdit.name} onChange={(val) => setTargetOnEdit({ ...targetOnEdit, name: val })} />
            <SelectFormField
              title={t("evaluation-type", "Arviointityyppi")}
              defaultValue={targetOnEdit.category}
              options={collectionTypeOptions.map((obj) => obj.category).filter((type) => type !== "CLASS_PARTICIPATION")}
              getOptionValue={(cat) => cat}
              formatLabel={(cat) => getCollectionTypeTranslation(t, cat)}
              onSelect={(val) => setTargetOnEdit({ ...targetOnEdit, category: val })}
            />
          </CView>
        </CModal>
      </CKeyboardAwareScrollView>
      {/* </CKeyboardAvoidingView> */}
    </GroupCreationBody>
  );
}
