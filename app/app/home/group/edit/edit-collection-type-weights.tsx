import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Alert } from "react-native";
import UpdateTypesBody from "./_update_types_body";
import { UpdateTypesStackParams } from "./update_type_stack_types";
import { useUpdateTypesContext } from "./UpdateTypesProvider";
import GroupCollectionTypeWeightsBodyView from "../create/_collection_type_weights_body";

export default function EditTypeWeightsView({
  navigation,
}: NativeStackScreenProps<UpdateTypesStackParams, "group-edit-collection-types-weights", "home-stack">) {
  const { t } = useTranslation();

  const { types, setTypes } = useUpdateTypesContext();
  const [weights, setWeights] = useState(types.map((type) => type.weight));
  const [forwardDisabled, setForwardDisabled] = useState(false);

  const sum = weights.reduce((prev, curr) => prev + curr, 0);
  const onMoveBack = () => {
    setTypes(types.map((item, i) => ({ category: item.category, name: item.name, weight: weights[i], id: item.id })));
    navigation.goBack();
  };

  const onMoveForward = () => {
    if (sum !== 100) {
      return;
    }
    setTypes(types.map((item, i) => ({ category: item.category, name: item.name, weight: weights[i], id: item.id })));

    Alert.alert("Add update method here!");
  };

  return (
    <UpdateTypesBody
      navigation={navigation}
      progressState={2}
      moveForwardDisabled={forwardDisabled}
      onMoveBack={onMoveBack}
      onMoveForward={onMoveForward}
    >
      <GroupCollectionTypeWeightsBodyView
        initialTypes={[...types].map((type) => {
          return { ...type, id: undefined };
        })}
        setForwardDisabled={(val) => {
          setForwardDisabled(val);
        }}
        onUpdate={(newWeights) => {
          setWeights(newWeights);
        }}
      />
    </UpdateTypesBody>
  );
}
