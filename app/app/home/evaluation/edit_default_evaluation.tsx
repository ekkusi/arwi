import { useMutation, useQuery } from "@apollo/client";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { isDefaultEvaluation } from "arwi-backend/src/types/typeGuards";
import Layout from "../../../components/Layout";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CButton from "../../../components/primitives/CButton";
import CView from "../../../components/primitives/CView";
import { UpdateClassParticipationEvaluationCard } from "../../../components/ClassParticipationEvaluationCard";
import { graphql } from "../../../gql";
import { getErrorMessage } from "../../../helpers/errorUtils";
import { EvaluationDataToUpdate } from "../collection/edit_all_evaluations";
import { HomeStackParams } from "../types";
import CText from "../../../components/primitives/CText";
import { DefaultEvaluationDataToUpdate } from "../collection/edit_all_default_evaluations";
import { UpdateDefaultEvaluationCard } from "../../../components/DefaultEvaluationCard";

const DefaultEvaluationEditView_GetEvaluation_Query = graphql(`
  query DefaultEvaluationEditView_GetEvaluation($evaluationId: ID!) {
    getEvaluation(id: $evaluationId) {
      id
      wasPresent
      __typename
      ... on DefaultEvaluation {
        rating
        collection {
          id
          date
        }
      }
      notes
      student {
        id
        name
        currentModuleEvaluations {
          id
          notes
        }
      }
    }
  }
`);

const DefaultEvaluationEditView_UpdateEvaluation_Mutation = graphql(`
  mutation DefaultEvaluationEditView_UpdateEvaluation($updateEvaluationInput: UpdateDefaultEvaluationInput!) {
    updateDefaultEvaluation(input: $updateEvaluationInput) {
      id
      wasPresent
      rating
      notes
    }
  }
`);

function DefaultEvaluationEditViewContent({
  navigation,
  initialEvaluation,
  date,
}: {
  navigation: NativeStackNavigationProp<HomeStackParams, "edit-default-evaluation">;
  initialEvaluation: DefaultEvaluationDataToUpdate;
  date: string;
}) {
  const [evaluation, setEvaluation] = useState<DefaultEvaluationDataToUpdate>(initialEvaluation);
  const [submitting, setSubmitting] = useState(false);
  const [updateEvaluation] = useMutation(DefaultEvaluationEditView_UpdateEvaluation_Mutation);

  const { t } = useTranslation();

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await updateEvaluation({
        variables: {
          updateEvaluationInput: {
            id: evaluation.id,
            wasPresent: evaluation.wasPresent,
            rating: evaluation.wasPresent ? evaluation.rating : undefined,
            notes: evaluation.wasPresent ? evaluation.notes : undefined,
          },
        },
      });
      navigation.goBack();
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(msg);
      Alert.alert(t("general-error", "Äh, jokin meni pieleen :("));
    }
    setSubmitting(false);
  };

  return (
    <CView style={{ backgroundColor: "white", alignItems: "center", gap: 30 }}>
      <UpdateDefaultEvaluationCard evaluation={evaluation} date={date} onChanged={(newEvaluation) => setEvaluation(newEvaluation)} />
      <CButton title={t("save", "Tallenna")} onPress={handleSubmit} loading={submitting} />
    </CView>
  );
}

export default function DefaultEvaluationEditView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "edit-default-evaluation">) {
  const { evaluationId } = route.params;
  const { data, loading } = useQuery(DefaultEvaluationEditView_GetEvaluation_Query, { variables: { evaluationId } });
  const { t } = useTranslation();

  if (!data || loading) return <LoadingIndicator />;

  const evaluation = data.getEvaluation;

  return (
    <Layout style={{ paddingHorizontal: 10, paddingTop: 20, backgroundColor: "white" }}>
      {isDefaultEvaluation<WithTypename<typeof evaluation, "DefaultEvaluation">>(evaluation) ? (
        <DefaultEvaluationEditViewContent initialEvaluation={evaluation} date={evaluation.collection.date} navigation={navigation} />
      ) : (
        <CText>{t("this-view-not-implemented", "Tämä näkymä ei ole vielä implementoitu")}</CText>
      )}
    </Layout>
  );
}
