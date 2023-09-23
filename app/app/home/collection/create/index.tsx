import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Environment, LearningObjectiveMinimal } from "arwi-backend/src/types/subject";
import { CollectionCreationStackParams } from "./types";
import { useCollectionCreationContext } from "./CollectionCreationProvider";
import CollectionCreationLayout from "./_layout";
import { COLORS } from "../../../../theme";
import { getFragmentData, graphql } from "../../../../gql";
import CollectionGeneralInfoForm from "../_general_info_form";

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
  }
`);

function CollectionGeneralInfoContent({ navigation }: NativeStackScreenProps<CollectionCreationStackParams, "index">) {
  const { groupInfo, setGeneralData } = useCollectionCreationContext();
  const group = getFragmentData(CollectionGeneralInfoView_Group_Fragment, groupInfo);

  const subjectCode = group.subject.code;
  const moduleInfo = group.currentModule.info;

  const handleSubmit = (date: Date, environment: Environment, learningObjectives: LearningObjectiveMinimal[], description: string) => {
    setGeneralData({
      date,
      description,
      environmentCode: environment.code,
      learningObjectiveCodes: learningObjectives.map((item) => item.code),
    });
    navigation.navigate("participations");
  };

  return (
    <CollectionGeneralInfoForm
      subjectCode={subjectCode}
      moduleInfo={moduleInfo}
      handleSubmit={handleSubmit}
      buttonIcon={<MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />}
    />
  );
}

export default function CollectionGeneralInfoView(props: NativeStackScreenProps<CollectionCreationStackParams, "index">) {
  return (
    <CollectionCreationLayout keyboardVerticalOffset={100}>
      <CollectionGeneralInfoContent {...props} />
    </CollectionCreationLayout>
  );
}
