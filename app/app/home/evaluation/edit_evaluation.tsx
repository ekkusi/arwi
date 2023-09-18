import { useMutation, useQuery } from "@apollo/client";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import Layout from "../../../components/Layout";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CButton from "../../../components/primitives/CButton";
import CView from "../../../components/primitives/CView";
import { UpdateEvaluationCard } from "../../../components/EvaluationCard";
import { graphql } from "../../../gql";
import { getErrorMessage } from "../../../helpers/errorUtils";
import { EvaluationDataToUpdate } from "../collection/edit_all_evaluations";
import { HomeStackParams } from "../types";

const EvaluationEditView_GetEvaluation_Query = graphql(`
  query EvaluationEditView_GetEvaluation($evaluationId: ID!) {
    getEvaluation(id: $evaluationId) {
      id
      wasPresent
      skillsRating
      behaviourRating
      notes
      isStellar
      student {
        id
        name
        currentClassEvaluations {
          id
          notes
        }
      }
    }
  }
`);

const EvaluationEditView_UpdateEvaluation_Mutation = graphql(`
  mutation EvaluationEditView_UpdateEvaluation($updateEvaluationInput: UpdateEvaluationInput!) {
    updateEvaluation(data: $updateEvaluationInput) {
      id
      wasPresent
      skillsRating
      behaviourRating
      notes
      isStellar
    }
  }
`);

function EvaluationEditViewContent({
  navigation,
  initialEvaluation,
}: {
  navigation: NativeStackNavigationProp<HomeStackParams, "edit-evaluation">;
  initialEvaluation: EvaluationDataToUpdate;
}) {
  const [evaluation, setEvaluation] = useState<EvaluationDataToUpdate>(initialEvaluation);
  const [submitting, setSubmitting] = useState(false);
  const [updateEvaluation] = useMutation(EvaluationEditView_UpdateEvaluation_Mutation);

  const { t } = useTranslation();

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await updateEvaluation({
        variables: {
          updateEvaluationInput: {
            id: evaluation.id,
            wasPresent: evaluation.wasPresent,
            skillsRating: evaluation.wasPresent ? evaluation.skillsRating : undefined,
            behaviourRating: evaluation.wasPresent ? evaluation.behaviourRating : undefined,
            notes: evaluation.wasPresent ? evaluation.notes : undefined,
            isStellar: evaluation.wasPresent ? evaluation.isStellar : undefined,
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
      <UpdateEvaluationCard evaluation={evaluation} onChanged={(newEvaluation) => setEvaluation(newEvaluation)} />
      <CButton title={t("save", "Tallenna")} onPress={handleSubmit} loading={submitting} />
    </CView>
  );
}

export default function EvaluationEditView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "edit-evaluation">) {
  const { evaluationId } = route.params;
  const { data, loading } = useQuery(EvaluationEditView_GetEvaluation_Query, { variables: { evaluationId } });

  if (!data || loading) return <LoadingIndicator />;

  return (
    <Layout style={{ paddingHorizontal: 10, paddingTop: 20, backgroundColor: "white" }}>
      <EvaluationEditViewContent initialEvaluation={data.getEvaluation} navigation={navigation} />
    </Layout>
  );
}
