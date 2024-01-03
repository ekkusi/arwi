import { useMutation, useQuery } from "@apollo/client";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { isClassParticipationEvaluation } from "arwi-backend/src/types/typeGuards";
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

const EvaluationEditView_GetEvaluation_Query = graphql(`
  query EvaluationEditView_GetEvaluation($evaluationId: ID!) {
    getEvaluation(id: $evaluationId) {
      id
      wasPresent
      __typename
      ... on ClassParticipationEvaluation {
        skillsRating
        behaviourRating
        collection {
          id
          date
          environment {
            code
            label {
              fi
            }
            color
          }
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

const EvaluationEditView_UpdateEvaluation_Mutation = graphql(`
  mutation EvaluationEditView_UpdateEvaluation($updateEvaluationInput: UpdateClassParticipationEvaluationInput!) {
    updateClassParticipationEvaluation(input: $updateEvaluationInput) {
      id
      wasPresent
      skillsRating
      behaviourRating
      notes
    }
  }
`);

function EvaluationEditViewContent({
  navigation,
  initialEvaluation,
  date,
  environmentLabel,
  envColor,
}: {
  navigation: NativeStackNavigationProp<HomeStackParams, "edit-evaluation">;
  initialEvaluation: EvaluationDataToUpdate;
  date: string;
  environmentLabel: string;
  envColor: string;
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
      <UpdateClassParticipationEvaluationCard
        evaluation={evaluation}
        date={date}
        environment={environmentLabel}
        envColor={envColor}
        onChanged={(newEvaluation) => setEvaluation(newEvaluation)}
      />
      <CButton title={t("save", "Tallenna")} onPress={handleSubmit} loading={submitting} />
    </CView>
  );
}

export default function EvaluationEditView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "edit-evaluation">) {
  const { evaluationId } = route.params;
  const { data, loading } = useQuery(EvaluationEditView_GetEvaluation_Query, { variables: { evaluationId } });
  const { t } = useTranslation();

  if (!data || loading) return <LoadingIndicator />;

  const evaluation = data.getEvaluation;

  return (
    <Layout style={{ paddingHorizontal: 10, paddingTop: 20, backgroundColor: "white" }}>
      {isClassParticipationEvaluation<WithTypename<typeof evaluation, "ClassParticipationEvaluation">>(evaluation) ? (
        <EvaluationEditViewContent
          initialEvaluation={evaluation}
          date={evaluation.collection.date}
          environmentLabel={evaluation.collection.environment.label.fi}
          envColor={evaluation.collection.environment.color}
          navigation={navigation}
        />
      ) : (
        <CText>{t("this-view-not-implemented", "Tämä näkymä ei ole vielä implementoitu")}</CText>
      )}
    </Layout>
  );
}
