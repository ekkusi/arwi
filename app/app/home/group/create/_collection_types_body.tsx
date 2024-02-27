import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLLECTION_TYPE_CATEGORIES, CollectionTypeCategory } from "arwi-backend/src/types";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { Alert } from "react-native";
import Card from "../../../../components/Card";
import CKeyboardAwareScrollView from "../../../../components/primitives/CKeyboardAwareScrollView";
import CText from "../../../../components/primitives/CText";
import CView from "../../../../components/primitives/CView";
import { getCollectionTypeTranslation } from "../../../../helpers/translation";
import CTouchableOpacity from "../../../../components/primitives/CTouchableOpacity";
import { COLORS } from "../../../../theme";
import CButton from "../../../../components/primitives/CButton";
import CModal from "../../../../components/CModal";
import TextFormField from "../../../../components/form/TextFormField";
import SelectFormField from "../../../../components/form/SelectFormField";
import { SCROLL_TO_INPUT_EXTRA_HEIGHT } from "./_body";
import { CollectionTypeInfo, CollectionTypeOption } from "./types_body";
import { mapCollectionTypeInfo } from "./helpers";

export default function CollectionTypesBody({
  edit = false,
  error,
  removeError,
  selectedTypes,
  setNewTypes,
}: {
  edit?: boolean;
  error: string | undefined;
  removeError: () => void;
  selectedTypes: CollectionTypeInfo[];
  setNewTypes: (newTypes: CollectionTypeInfo[]) => void;
}) {
  const { t } = useTranslation();

  const defaultType = { name: getCollectionTypeTranslation(t, "EXAM" as CollectionTypeCategory), category: "EXAM" as CollectionTypeCategory, id: "" };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [targetOnEdit, setTargetOnEdit] = useState<CollectionTypeInfo>(defaultType);
  const [isNameDirty, setIsNameDirty] = useState(false);

  const collectionTypeOptions: CollectionTypeOption[] = useMemo(() => {
    return COLLECTION_TYPE_CATEGORIES.map((key) => ({
      name: getCollectionTypeTranslation(t, key as CollectionTypeCategory),
      category: key as CollectionTypeCategory,
    }));
  }, [t]);

  const debouncedOnTypeChanged = debounce((type: CollectionTypeInfo) => {
    removeError();
    const newTypes = [...selectedTypes].map((item) => (item.id === type.id ? type : item));
    setNewTypes(newTypes);
  }, 200);

  const onTypeChanged = useCallback(debouncedOnTypeChanged, [debouncedOnTypeChanged]);

  const onRemoveType = (type: CollectionTypeInfo) => {
    setNewTypes([...selectedTypes].filter((item) => item.id !== type.id));
  };

  const onTypeSelected = (val: CollectionTypeCategory) => {
    setTargetOnEdit({ ...targetOnEdit, name: !isNameDirty ? getCollectionTypeTranslation(t, val) : targetOnEdit.name, category: val });
  };

  const onTypeNameChanged = (val: string) => {
    if (!isNameDirty) setIsNameDirty(true);
    setTargetOnEdit({ ...targetOnEdit, name: val });
  };

  useEffect(() => {
    return () => {
      onTypeChanged.cancel();
    };
  }, [onTypeChanged]);

  return (
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
                            onPress={() => {
                              if (edit) {
                                Alert.alert(
                                  t("delete", "Poista"),
                                  t("confirm-delete-info", "Jos poistat sisällön, myös mahdolliset sisällön arviointitiedot poistuvat."),
                                  [
                                    {
                                      text: t("no", "Ei"),
                                      onPress: () => null,
                                      style: "cancel",
                                    },
                                    {
                                      text: t("yes", "Kyllä"),
                                      onPress: () => {
                                        onRemoveType(type);
                                      },
                                    },
                                  ]
                                );
                              } else {
                                onRemoveType(type);
                              }
                            }}
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
              setIsNameDirty(false);
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
                setNewTypes([...selectedTypes, modifiedTarget]);
              } else {
                const selectedTargets = selectedTypes.filter((type) => type.id !== targetOnEdit.id);
                setNewTypes([...selectedTargets, targetOnEdit]);
              }
              setEditModalOpen(false);
            }}
          />
        }
      >
        <CView style={{ height: "100%", gap: 10 }}>
          <TextFormField title={t("name", "Nimi")} value={targetOnEdit.name} onChange={onTypeNameChanged} />
          <SelectFormField
            title={t("evaluation-type", "Arviointityyppi")}
            defaultValue={targetOnEdit.category}
            options={collectionTypeOptions.map((obj) => obj.category).filter((type) => type !== "CLASS_PARTICIPATION")}
            getOptionValue={(cat) => cat}
            formatLabel={(cat) => getCollectionTypeTranslation(t, cat)}
            onSelect={onTypeSelected}
          />
        </CView>
      </CModal>
    </CKeyboardAwareScrollView>
  );
}
