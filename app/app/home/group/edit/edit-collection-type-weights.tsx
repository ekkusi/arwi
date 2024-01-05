import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/client";
import UpdateTypesBody from "./_update_types_body";
import { UpdateTypesStackParams } from "./update_type_stack_types";
import { CollectionTypeFull, useUpdateTypesContext } from "./UpdateTypesProvider";
import GroupCollectionTypeWeightsBodyView from "../create/_collection_type_weights_body";
import { COLORS } from "../../../../theme";
import { graphql } from "../../../../gql";
import { getErrorMessage } from "../../../../helpers/errorUtils";

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

  const handleSubmit = async (newTypes: CollectionTypeFull[]) => {
    setLoading(true);
    try {
      const newIds = newTypes.map((type) => type.id);
      const oldIds = route.params.originalTypes.map((type) => type.id);
      const typesToDelete = route.params.originalTypes.filter((type) => type.id && !newIds.includes(type.id));
      const typesToUpdate = newTypes.filter((type) => type.id && oldIds.includes(type.id));
      const typesToAdd = newTypes.filter((type) => !oldIds.includes(type.id));
      await updateGroup({
        variables: {
          id: route.params.groupId,
          input: {
            updateCollectionTypeInputs: typesToUpdate.map((type) => {
              return {
                id: type.id!,
                name: type.name,
                weight: type.weight,
                category: type.category,
              };
            }),
            deleteCollectionTypeIds: typesToDelete.map((type) => {
              return type.id!;
            }),
            createCollectionTypeInputs: typesToAdd.map((type) => {
              return {
                name: type.name,
                weight: type.weight,
                category: type.category,
              };
            }),
          },
        },
      });

      navigation.getParent()?.goBack();
    } catch (error) {
      const msg = getErrorMessage(error);
      console.error(msg);
      // TODO: Show error in UI
    }
    setLoading(false);
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
    const newTypes = types.map((item, i) => ({ category: item.category, name: item.name, weight: weights[i], id: item.id }));
    setTypes(newTypes);
    handleSubmit(newTypes);
  };

  return (
    <UpdateTypesBody
      navigation={navigation}
      progressState={2}
      moveForwardDisabled={forwardDisabled}
      onMoveBack={onMoveBack}
      onMoveForward={onMoveForward}
      forwardButtonProps={{ title: t("save", "Tallenna"), leftIcon: <MaterialCommunityIcon name="check" size={25} color={COLORS.white} />, loading }}
      style={{ gap: 20, padding: "lg" }}
    >
      <GroupCollectionTypeWeightsBodyView
        initialTypes={[...types].map((type) => {
          return { ...type };
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
