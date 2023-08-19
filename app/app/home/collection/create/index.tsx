import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
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
    currentClassYear {
      id
      info {
        code
      }
    }
  }
`);

function CollectionGeneralInfoContent({ navigation }: NativeStackScreenProps<CollectionCreationStackParams, "index">) {
  const { groupInfo, setGeneralData } = useCollectionCreationContext();
  const group = getFragmentData(CollectionGeneralInfoView_Group_Fragment, groupInfo);

  const subjectCode = group.subject.code;
  const classYearCode = group.currentClassYear.info.code;

  const handleSubmit = (date: Date, environmentCode: string, learningObjectiveCodes: string[], description: string) => {
    setGeneralData({
      date,
      description,
      environmentCode,
      learningObjectiveCodes,
    });
    navigation.navigate("participations");
  };

  return (
    <CollectionGeneralInfoForm
      subjectCode={subjectCode}
      classYearCode={classYearCode}
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
