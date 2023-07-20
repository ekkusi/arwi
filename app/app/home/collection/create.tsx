import { useMutation, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getLearningObjectives, getSubject } from "arwi-backend/src/utils/subjectUtils";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CView from "../../../components/primitives/CView";
import { getFragmentData, graphql } from "../../../gql";
import { HomeStackParams } from "../types";
import { COLORS } from "../../../theme";
import CTextInput from "../../../components/primitives/CTextInput";
import { formatDate } from "../../../helpers/dateHelpers";
import SelectFormField from "../../../components/form/SelectFormField";
import FormField from "../../../components/form/FormField";
import CButton from "../../../components/primitives/CButton";
import { getErrorMessage } from "../../../helpers/errorUtils";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";

const UpdateCollectionForm_Group_Fragment = graphql(`
  fragment UpdateCollectionForm_Group on Group {
    id
    subject {
      code
    }
    currentClassYear {
      id
      info {
        code
      }
    }
    students {
      id
      name
    }
  }
`);

const CreateCollectionPage_GetGroup_Query = graphql(`
  query CreateCollectionPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      currentClassYear {
        id
      }
      ...UpdateCollectionForm_Group
    }
  }
`);

const CreateCollectionPage_CreateCollection_Mutation = graphql(`
  mutation CreateCollectionPage_CreateCollection($createCollectionInput: CreateCollectionInput!, $classYearId: ID!) {
    createCollection(data: $createCollectionInput, classYearId: $classYearId) {
      id
    }
  }
`);

export default function CollectionCreationView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "collection-create">) {
  const [submitting, setSubmitting] = useState(false);
  const [selectedEnvironmentCode, setSelectedEnvironmentCode] = useState<string>();
  const [selectedLearningObjectiveCode, setSelectedLearningObjectivesCode] = useState<string>();
  const [environmentError, setEnvironmentError] = useState<string>();

  const { t } = useTranslation();
  const { groupId } = route.params;
  const { data, loading } = useQuery(CreateCollectionPage_GetGroup_Query, {
    variables: {
      groupId,
    },
  });

  const [createCollection] = useMutation(CreateCollectionPage_CreateCollection_Mutation);

  const [date, setDate] = useState(new Date());
  const [isDateOpen, setIsDateOpen] = useState(false);

  if (loading || !data) return <LoadingIndicator />;

  const group = getFragmentData(UpdateCollectionForm_Group_Fragment, data.getGroup);

  const learningObjectives = getLearningObjectives(group.subject.code, group.currentClassYear.info.code);
  const subject = getSubject(group.subject.code);
  const environments = subject?.environments || [];

  const handleSubmit = async () => {
    if (!selectedEnvironmentCode) {
      setEnvironmentError(t("CollectionCreationView.environmentError", "Valitse ympäristö"));
      return;
    }
    setSubmitting(true);

    try {
      const result = await createCollection({
        variables: {
          classYearId: data.getGroup.currentClassYear.id,
          createCollectionInput: {
            date: date.toISOString(),
            environmentCode: selectedEnvironmentCode,
            learningObjectiveCodes: selectedLearningObjectiveCode ? [selectedLearningObjectiveCode] : [], // TODO: Change learning objective select to multiselect and change learning objectives to be array by default
          },
        },
        refetchQueries: [],
      });
      if (!result.data) throw new Error("Unexpected error");
      navigation.navigate("collection-edit", { id: result.data.createCollection.id });
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(msg);
    }
    setSubmitting(false);
  };

  return (
    <CView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20, gap: 20 }}>
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
        onSelect={(item) => setSelectedLearningObjectivesCode(item.value)}
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
      <CButton
        disabled={!!environmentError}
        loading={submitting}
        title={t("CollectionCreationView.startEvaluation", "Aloita arviointi")}
        onPress={() => handleSubmit()}
      />
    </CView>
  );
}
