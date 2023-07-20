import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import UpdateCollectionForm, { UpdateCollectionFormData } from "../../../../components/UpdateCollectionForm";
import { CollectionCreationStackParams } from "./types";
import { useCollectionCreationContext } from "./CollectionCreationProvider";
import CollectionCreationLayout from "./_layout";

function CollectionGeneralInfoContent({ navigation }: NativeStackScreenProps<CollectionCreationStackParams, "index">) {
  const { groupInfo, setGeneralData } = useCollectionCreationContext();

  const handleSubmit = (data: UpdateCollectionFormData) => {
    setGeneralData(data);
    navigation.navigate("participations");
  };

  return <UpdateCollectionForm onSubmit={handleSubmit} group={groupInfo} />;
}

export default function CollectionGeneralInfoView(props: NativeStackScreenProps<CollectionCreationStackParams, "index">) {
  return (
    <CollectionCreationLayout>
      <CollectionGeneralInfoContent {...props} />
    </CollectionCreationLayout>
  );
}
