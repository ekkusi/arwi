import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CollectionTypeOption } from "../create/types_body";
import { UpdateTypesStackParams } from "./update_type_stack_types";
import { useUpdateTypesContext } from "./UpdateTypesProvider";
import { mapCollectionTypeInfos } from "../create/helpers";
import GroupCreationBody from "../create/_body";
import UpdateTypesBody from "./_update_types_body";
import CollectionTypesBody from "../create/_collection_types_body";
import { dividePercentages } from "../../../../helpers/mathUtilts";

export default function EditTypesView({
  route,
  navigation,
}: NativeStackScreenProps<UpdateTypesStackParams, "group-edit-collection-types", "home-stack">) {
  const { t } = useTranslation();

  const { types, setTypes } = useUpdateTypesContext();
  const [selectedTypes, setSelectedTypes] = useState(mapCollectionTypeInfos(types));
  const [error, setError] = useState<string | undefined>(undefined);
  const [typesChanged, setTypesChanged] = useState(false);

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
    const weights = typesChanged ? dividePercentages(selectedTypes.length) : types.map((type) => type.weight);

    setTypes(selectedTypes.map((item, i) => ({ id: item.id, category: item.category, name: item.name, weight: weights[i] })));
    navigation.navigate("group-edit-collection-types-weights", { groupId: route.params.groupId, originalTypes: route.params.originalTypes });
  };

  return (
    <UpdateTypesBody navigation={navigation} progressState={1} onMoveForward={onMoveToNextView}>
      <CollectionTypesBody
        error={error}
        removeError={() => setError(undefined)}
        selectedTypes={selectedTypes}
        setNewTypes={(newTypes) => {
          setTypesChanged(true);
          setSelectedTypes(newTypes);
        }}
      />
    </UpdateTypesBody>
  );
}
