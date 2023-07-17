import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import { FragmentType, getFragmentData, graphql } from "../gql";
import { formatAmountString } from "../helpers/dataMappers";
import { analyzeEvaluations } from "../helpers/evaluationUtils";
import Card from "./Card";
import EvaluationsBarChart from "./charts/EvaluationsBarChart";
import EvaluationsLineChart from "./charts/EvaluationsLineChart";
import FlippingCard, { FlippingCardHandle } from "./FlippingCard";
import CButton from "./primitives/CButton";
import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";

const StudentEvaluationRecap_Evaluation_Fragment = graphql(/* GraphQL */ `
  fragment StudentEvaluationRecap_Evaluation on Evaluation {
    id
    wasPresent
    behaviourRating
    skillsRating
    isStellar
    ...EvaluationsLineChart_Evaluation
    ...EvaluationsBarChart_Evaluation
  }
`);

const StudentEvaluationRecap_Student_Fragment = graphql(/* GraphQL */ `
  fragment StudentEvaluationRecap_Student on Student {
    id
    name
    group {
      name
    }
  }
`);

type StudentEvaluationsRecapProps = CViewProps & {
  evaluations: FragmentType<typeof StudentEvaluationRecap_Evaluation_Fragment>[];
  student: FragmentType<typeof StudentEvaluationRecap_Student_Fragment>;
};

export default function StudentEvaluationsRecap({
  evaluations: evaluationFragments,
  student: studentFragment,
  ...rest
}: StudentEvaluationsRecapProps) {
  const cardRef = useRef<FlippingCardHandle>(null);
  const { t } = useTranslation();
  const evaluations = getFragmentData(StudentEvaluationRecap_Evaluation_Fragment, evaluationFragments);
  const student = getFragmentData(StudentEvaluationRecap_Student_Fragment, studentFragment);

  const { absencesAmount, presencesAmount, skillsAverage, behaviourAverage, gradeSuggestion, isStellarCount } = analyzeEvaluations([...evaluations]);

  const starRowCount = Math.ceil(isStellarCount / 12);

  return (
    <FlippingCard
      ref={cardRef}
      style={{ paddingHorizontal: "lg" }}
      height={600}
      front={
        <>
          <EvaluationsLineChart evaluations={evaluations} />
          <CView style={{ width: "100%", paddingHorizontal: "md", marginBottom: "md" }}>
            <CView style={{ flexDirection: "row" }}>
              <CText style={{ fontWeight: "600" }}>Paikalla: </CText>
              <CText>{presencesAmount}</CText>
            </CView>
            <CView style={{ flexDirection: "row" }}>
              <CText style={{ fontWeight: "600" }}>Poissa: </CText>
              <CText>{absencesAmount}</CText>
            </CView>
            <CView style={{ flexDirection: "row" }}>
              <CText style={{ fontWeight: "600" }}>Taitojen keskiarvo: </CText>
              <CText>
                {!Number.isNaN(skillsAverage)
                  ? `${skillsAverage.toFixed(2)}`
                  : t("components.StudentEvaluationsRecap.skillsNotEvaluated", "Taitoja ei vielä arvioitu")}
              </CText>
            </CView>
            <CView style={{ flexDirection: "row" }}>
              <CText style={{ fontWeight: "600" }}>Työskentelyn keskiarvo: </CText>
              <CText>
                {!Number.isNaN(behaviourAverage)
                  ? `${behaviourAverage.toFixed(2)}`
                  : t("components.StudentEvaluationsRecap", "Työskentelyä ei vielä arvioitu")}
              </CText>
            </CView>
          </CView>
          <CView style={{ alignItems: "center", justifyContent: "center" }}>
            <CText style={{ marginBottom: "sm" }}>Numeroehdotus:</CText>
            <CView style={{ borderWidth: 2, borderColor: "lightgray", borderRadius: 50, padding: "3xl", alignContent: "center" }}>
              <CView style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>
                <CText style={{ fontSize: "2xl" }}>{gradeSuggestion > 0 ? gradeSuggestion : "–"}</CText>
              </CView>
            </CView>
          </CView>
          {/* A stupid workaround. onPress in TouchableOpacity from react-native isn't triggered in absolute positioned parents.  */}
          {/* This TouchableOpacity is from react-native-gesture-handler. This way opacity is shown in button click even though parent click is still triggered. */}
          <TouchableOpacity>
            <CButton
              title={t("components.StudentEvaluationsRecap.viewByEnvironments", "Tarkastele ympäristöttäin")}
              style={{ marginVertical: "lg" }}
            />
          </TouchableOpacity>
        </>
      }
      back={
        <>
          <EvaluationsBarChart evaluations={evaluations} />
          <CButton
            onPress={(event) => {
              event.preventDefault();
              cardRef.current?.spinCard();
            }}
            title={t("components.StudentEvaluationsRecap.back", "Takaisin")}
            style={{ marginVertical: "lg" }}
          />
        </>
      }
      {...rest}
    />
  );
}
