import { useTranslation } from "react-i18next";
import React from "react";
import { getLearningObjectives } from "arwi-backend/src/utils/subjectUtils";
import { LearningObjectiveType } from "arwi-backend/src/types";
import { GroupOverviewPage_GetGroupQuery } from "../../../gql/graphql";
import CView from "../../../components/primitives/CView";
import CText from "../../../components/primitives/CText";
import { SPACING } from "../../../theme";
import { GroupNavigationProps } from "./types";
import Card from "../../../components/Card";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";
import CFlatList from "../../../components/primitives/CFlatList";

export default function ObjectiveList({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & GroupNavigationProps) {
  const moduleInfo = group.currentModule.info;
  const objectives = getLearningObjectives(group.subject.code, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey);
  const { t } = useTranslation();

  const learningObjectiveCounts = objectives.map((objective) => {
    return {
      ...objective,
      count: group.currentModule.evaluationCollections.reduce(
        (val, evaluation) => (evaluation.learningObjectives.map((obj) => obj.code).includes(objective.code) ? val + 1 : val),
        0
      ),
    };
  });

  return (
    <CView style={{ flexGrow: 1, paddingHorizontal: "md" }}>
      {objectives.length > 0 ? (
        <CFlatList
          data={learningObjectiveCounts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: SPACING.md, paddingBottom: 50 }}
          renderItem={({ item }) => (
            <CTouchableOpacity
              key={item.code}
              onPress={() =>
                navigation.navigate("learning-objective", { code: item.code, label: item.label, description: item.description, type: item.type })
              }
            >
              <Card style={{ marginBottom: "md" }}>
                <CText>{`${item.code}: ${item.label.fi}`}</CText>
                <CText style={{ fontSize: "sm", fontWeight: "400", color: "gray" }}>
                  {item.type !== LearningObjectiveType.NOT_EVALUATED
                    ? t("group.objective-evaluation-count", "Arvioitu {{count}} kertaa", { count: item.count })
                    : t("not-evaluated", "Ei arvioitava")}
                </CText>
              </Card>
            </CTouchableOpacity>
          )}
        />
      ) : (
        <CView style={{ height: 300, justifyContent: "center", alignItems: "center" }}>
          <CText style={{ width: "80%" }}>
            {t(
              "group.no-objectives",
              "Annetulle aineelle ei olla kirjattu tavoitteita tai jotain muuta on pielessä. Ilmoita tieto kehittäjille, kiitos."
            )}
          </CText>
        </CView>
      )}
    </CView>
  );
}
