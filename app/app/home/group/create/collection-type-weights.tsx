import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import GroupCreationBody from "./_body";
import GroupCollectionTypeWeightsBodyView from "./_collection_type_weights_body";

export default function GroupCollectionTypeWeightsView({
  navigation,
}: NativeStackScreenProps<GroupCreationStackParams, "group-create-collection-type-weights", "home-stack">) {
  const { group, setGroup } = useGroupCreationContext();
  const [weights, setWeights] = useState(group.collectionTypes.map((type) => type.weight));
  const [forwardDisabled, setForwardDisabled] = useState(false);

  const sum = weights.reduce((prev, curr) => prev + curr, 0);
  const onMoveBack = () => {
    setGroup({
      ...group,
      collectionTypes: group.collectionTypes.map((item, i) => ({ category: item.category, name: item.name, weight: weights[i] })),
    });
    navigation.goBack();
  };

  const onMoveForward = () => {
    if (sum !== 100) {
      return;
    }

    setGroup({
      ...group,
      collectionTypes: group.collectionTypes.map((item, i) => ({ category: item.category, name: item.name, weight: weights[i] })),
    });
    navigation.navigate("group-create-students");
  };

  return (
    <GroupCreationBody
      navigation={navigation}
      progressState={4}
      moveForwardDisabled={forwardDisabled}
      onMoveBack={onMoveBack}
      onMoveForward={onMoveForward}
    >
      <GroupCollectionTypeWeightsBodyView
        initialTypes={[...group.collectionTypes].map((type) => {
          return { ...type, id: undefined };
        })}
        setForwardDisabled={(val) => {
          setForwardDisabled(val);
        }}
        onUpdate={(newWeights) => {
          setWeights(newWeights);
        }}
      />
    </GroupCreationBody>
  );
}
