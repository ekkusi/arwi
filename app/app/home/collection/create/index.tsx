import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getEnvironments, getLearningObjectives } from "arwi-backend/src/utils/subjectUtils";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
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

  const [selectedEnvironmentCode, setSelectedEnvironmentCode] = useState<string>();
  const [selectedLearningObjectiveCode, setSelectedLearningObjectivesCode] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [description, setDescription] = useState("");

  const [environmentError, setEnvironmentError] = useState<string>();

  const subjectCode = group.subject.code;
  const classYearCode = group.currentClassYear.info.code;
  const learningObjectives = getLearningObjectives(subjectCode, classYearCode);
  const environments = getEnvironments(subjectCode);

  const handleSubmit = () => {
    if (!selectedEnvironmentCode) {
      setEnvironmentError(t("environment-is-obligatory", "Ympäristö on pakollinen"));
      return;
    }
    setGeneralData({
      date,
      description,
      environmentCode: selectedEnvironmentCode,
      learningObjectiveCodes: selectedLearningObjectiveCode,
    });
    navigation.navigate("participations");
  };

  return (
    <>
      <CView style={{ flex: 1, gap: 20 }}>
        <SelectFormField
          error={environmentError}
          onSelect={(item) => {
            setSelectedEnvironmentCode(item.value);
            setEnvironmentError(undefined);
          }}
          title={t("environment", "Ympäristö")}
          options={environments.map((it) => ({ value: it.code, label: it.label }))}
        />
        <SelectFormField
          onSelect={(item) => setSelectedLearningObjectivesCode([item.value])}
          title={t("learningObjectives", "Oppimistavoitteet")}
          options={learningObjectives.map((obj) => ({ value: obj.code, label: obj.label }))}
        />
        <FormField title={t("date", "Päivämäärä")}>
          <CTouchableOpacity onPress={() => setIsDateOpen(true)}>
            <CView pointerEvents="none">
              <CTextInput value={formatDate(date)} editable={false} />
            </CView>
          </CTouchableOpacity>
        </FormField>
        {isDateOpen && (
          <DateTimePicker
            textColor={COLORS.primary}
            value={date}
            onChange={(_, newDate) => {
              setIsDateOpen(false);
              if (newDate) setDate(newDate);
            }}
          />
        )}
        <TextFormField title={t("more-info", "Lisätietoa")} placeholder={`${t("more-info")}...`} onChange={(text) => setDescription(text)} />
      </CView>
      <CView style={{ justifyContent: "flex-end", flexDirection: "row" }}>
        <CButton
          disabled={!!environmentError}
          style={{ marginRight: 20 }}
          onPress={handleSubmit}
          leftIcon={<MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />}
        />
      </CView>
    </>
  );
}

export default function CollectionGeneralInfoView(props: NativeStackScreenProps<CollectionCreationStackParams, "index">) {
  return (
    <CollectionCreationLayout>
      <CollectionGeneralInfoContent {...props} />
    </CollectionCreationLayout>
  );
}
