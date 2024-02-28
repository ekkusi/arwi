import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { DefaultCollectionCreationStackParams } from "./types";
import { useDefaultCollectionCreationContext } from "./DefaultCollectionCreationProvider";
import { COLORS } from "../../../../../theme";
import DefaultCollectionGeneralInfoForm, { DefaultGeneralInfoData } from "../../_default_general_info_form";
import DefaultCollectionCreationLayout from "./_layout";

function DefaultCollectionGeneralInfoContent({
  navigation,
}: NativeStackScreenProps<DefaultCollectionCreationStackParams, "default-collection-create-general-info">) {
  const { setGeneralData } = useDefaultCollectionCreationContext();

  const handleSubmit = (data: DefaultGeneralInfoData) => {
    setGeneralData({
      date: data.date,
      description: data.description,
    });
    navigation.navigate("default-collection-create-participations");
  };

  return (
    <DefaultCollectionGeneralInfoForm
      handleSubmit={handleSubmit}
      buttonIcon={<MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />}
    />
  );
}

export default function CollectionGeneralInfoView(
  props: NativeStackScreenProps<DefaultCollectionCreationStackParams, "default-collection-create-general-info">
) {
  return (
    <DefaultCollectionCreationLayout keyboardVerticalOffset={100}>
      <DefaultCollectionGeneralInfoContent {...props} />
    </DefaultCollectionCreationLayout>
  );
}
