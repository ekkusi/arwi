import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/client";
import UpdateTypesBody from "./_update_types_body";
import { UpdateTypesStackParams } from "./update_type_stack_types";
import { useUpdateTypesContext } from "./UpdateTypesProvider";
import GroupCollectionTypeWeightsBodyView from "../create/_collection_type_weights_body";
import { COLORS } from "../../../../theme";
import { graphql } from "../../../../gql";

const EditTypeWeightsView_UpdateGroup_Mutation = graphql(`
  mutation EditTypeWeightsView_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {
    updateGroup(groupId: $id, data: $input) {
      id
      collectionTypes {
        id
        category
        weight
        name
      }
    }
  }
`);

export default function EditTypeWeightsView({
  route,
  navigation,
}: NativeStackScreenProps<UpdateTypesStackParams, "group-edit-collection-types-weights", "home-stack">) {
  const { t } = useTranslation();

  const { types, setTypes } = useUpdateTypesContext();
  const [updateGroup] = useMutation(EditTypeWeightsView_UpdateGroup_Mutation);

  const [loading, setLoading] = useState(false);
  const [weights, setWeights] = useState(types.map((type) => type.weight));
  const [forwardDisabled, setForwardDisabled] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newIds = types.map((type) => type.id);
      const oldIds = route.params.originalTypes.map((type) => type.id);
      const typesToDelete = route.params.originalTypes.filter((type) => !newIds.includes(type.id));
      const typesToUpdate = route.params.originalTypes.filter((type) => newIds.includes(type.id));
      const typesToAdd = types.filter((type) => !type.id);
    } catch {
      console.log("moi");
    }
  };
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
      forwardButtonProps={{ title: t("save", "Tallenna"), leftIcon: <MaterialCommunityIcon name="check" size={25} color={COLORS.white} /> }}
      style={{ gap: 20, padding: "lg" }}
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
