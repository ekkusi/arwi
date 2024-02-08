import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import GroupCreationBody from "./_body";
import { dividePercentages } from "../../../../helpers/mathUtilts";
import CollectionTypesBody from "./_collection_types_body";
import { mapCollectionTypeInfos } from "./helpers";

export default function GroupCollectionTypesView({
  navigation,
}: NativeStackScreenProps<GroupCreationStackParams, "group-create-collection-types", "home-stack">) {
  const { t } = useTranslation();

  const { group, setGroup } = useGroupCreationContext();
  const [selectedTypes, setSelectedTypes] = useState(mapCollectionTypeInfos(group.collectionTypes));
  const [error, setError] = useState<string | undefined>(undefined);

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

  return (
    <GroupCreationBody navigation={navigation} progressState={3} onMoveBack={onMoveBack} onMoveForward={onMoveToNextView}>
      <CollectionTypesBody
        error={error}
        removeError={() => setError(undefined)}
        selectedTypes={selectedTypes}
        setNewTypes={(types) => setSelectedTypes(types)}
      />
    </GroupCreationBody>
  );
}
