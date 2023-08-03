import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getEnvironments, getLearningObjectives } from "arwi-backend/src/utils/subjectUtils";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { Platform, ScrollView } from "react-native";
import { CollectionCreationStackParams } from "./types";
import { useCollectionCreationContext } from "./CollectionCreationProvider";
import CollectionCreationLayout from "./_layout";
import CView from "../../../../components/primitives/CView";
import CButton from "../../../../components/primitives/CButton";
import { COLORS } from "../../../../theme";
import SelectFormField from "../../../../components/form/SelectFormField";
import { getFragmentData, graphql } from "../../../../gql";
import CTouchableOpacity from "../../../../components/primitives/CTouchableOpacity";
import FormField from "../../../../components/form/FormField";
import CTextInput from "../../../../components/primitives/CTextInput";
import { formatDate } from "../../../../helpers/dateHelpers";
import TextFormField from "../../../../components/form/TextFormField";
import MultiSelectFormField from "../../../../components/form/MultiSelectFormField";
import CModal from "../../../../components/CModal";
import CDateTimePicker from "../../../../components/form/CDateTimePicker";
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

  const { t } = useTranslation();

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
