import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { CollectionCreationStackParams } from "./types";
import { useCollectionCreationContext } from "./CollectionCreationProvider";
import CollectionCreationLayout from "./_layout";
import { COLORS } from "../../../../theme";
import { getFragmentData, graphql } from "../../../../gql";
import CollectionGeneralInfoForm, { GeneralInfoData } from "../_general_info_form";

const CollectionGeneralInfoView_Group_Fragment = graphql(`
  fragment CollectionGeneralInfoView_Group on Group {
    subject {
      code
    }
    currentModule {
      id
      info {
        educationLevel
        learningObjectiveGroupKey
      }
    }
    collectionTypes {
      id
      name
      category
    }
  }
`);

function CollectionGeneralInfoContent({ navigation }: NativeStackScreenProps<CollectionCreationStackParams, "collection-create-general-info">) {
  const { groupInfo, setGeneralData } = useCollectionCreationContext();
  const group = getFragmentData(CollectionGeneralInfoView_Group_Fragment, groupInfo);

  const subjectCode = group.subject.code;
  const moduleInfo = group.currentModule.info;

  const handleSubmit = (data: GeneralInfoData) => {
    setGeneralData({
      date: data.date,
      description: data.description,
      environmentCode: data.environment.code,
      learningObjectiveCodes: data.learningObjectives.map((item) => item.code),
      collectionTypeId: data.collectionType.id,
    });
    navigation.navigate("collection-create-participations");
  };

  return (
    <CollectionGeneralInfoForm
      subjectCode={subjectCode}
      moduleInfo={moduleInfo}
      handleSubmit={handleSubmit}
      collectionTypeOptions={group.collectionTypes}
      buttonIcon={<MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />}
    />
  );
}

export default function CollectionGeneralInfoView(props: NativeStackScreenProps<CollectionCreationStackParams, "collection-create-general-info">) {
  return (
    <CollectionCreationLayout keyboardVerticalOffset={100}>
      <CollectionGeneralInfoContent {...props} />
    </CollectionCreationLayout>
  );
}
