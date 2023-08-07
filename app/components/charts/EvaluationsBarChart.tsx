import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryGroup } from "victory-native";
import { useMemo, useState } from "react";
import { t } from "i18next";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { EvaluationsBarChart_EvaluationFragment } from "../../gql/graphql";
import { formatRatingNumber } from "../../helpers/dataMappers";

import { hexToRgbA } from "../../helpers/color";
import CView, { CViewProps } from "../primitives/CView";
import StyledBarChart, { StyledBarChartDataType } from "./StyledBarChart";
import CText from "../primitives/CText";

const EvaluationsBarChart_Evaluation_Fragment = graphql(`
  fragment EvaluationsBarChart_Evaluation on Evaluation {
    id
    skillsRating
    behaviourRating
    wasPresent
    collection {
      environment {
        label
        code
        color
      }
    }
  }
`);

type TempDataValue = {
  value: number;
  count: number;
};

type TempDataType = {
  label: string;
  color: string;
  skills: TempDataValue;
  behaviour: TempDataValue;
};

type EvaluationsBarChartDataType = StyledBarChartDataType & {
  type: "skills" | "behaviour";
};

const INCLUDE_ENVIRONMENT_COUNT_THRESHHOLD = 0;

const mapData = (evaluations: EvaluationsBarChart_EvaluationFragment[]) => {
  const data: EvaluationsBarChartDataType[] = [];
  const tempData: { [key: string]: TempDataType } = {};
  evaluations.forEach((evaluation) => {
    const envCode = evaluation.collection.environment.code;
    if (!tempData[envCode]) {
      tempData[envCode] = {
        color: evaluation.collection.environment.color,
        label: evaluation.collection.environment.label,
        skills: {
          value: 0,
          count: 0,
        },
        behaviour: {
          value: 0,
          count: 0,
        },
      };
    }
    const matchingEnvironment = tempData[envCode];

    if (evaluation.skillsRating) {
      matchingEnvironment.skills.value += formatRatingNumber(evaluation.skillsRating);
      matchingEnvironment.skills.count += 1;
    }
    if (evaluation.behaviourRating) {
      matchingEnvironment.behaviour.value += formatRatingNumber(evaluation.behaviourRating);
      matchingEnvironment.behaviour.count += 1;
    }
  });
  Object.keys(tempData).forEach((key) => {
    data.push({
      x: `${tempData[key].label}1`,
      color: tempData[key].color,
      y: tempData[key].skills.count > 0 ? Math.round((tempData[key].skills.value / tempData[key].skills.count) * 100) / 100 : 0,
      type: "skills",
    });
    data.push({
      x: `${tempData[key].label}2`,
      color: hexToRgbA(tempData[key].color, 0.8),
      y: tempData[key].behaviour.count > 0 ? Math.round((tempData[key].behaviour.value / tempData[key].behaviour.count) * 100) / 100 : 0,
      type: "behaviour",
    });
  });

  return data;
};

type EvaluationsBarChartProps = CViewProps & {
  evaluations: readonly FragmentType<typeof EvaluationsBarChart_Evaluation_Fragment>[];
  filter?: string;
};

const getFilteredData = (data: EvaluationsBarChartDataType[], filter: string) => {
  switch (filter) {
    case "skills":
      return data.filter((obj) => obj.type === "skills");
    case "behaviour":
      return data.filter((obj) => obj.type === "behaviour");
    default:
      return data;
  }
};

export default function EvaluationsBarChart({ evaluations: evaluationFragments, filter = "all", ...rest }: EvaluationsBarChartProps) {
  const evaluations = getFragmentData(EvaluationsBarChart_Evaluation_Fragment, evaluationFragments);
  const filteredEvaluations = useMemo(() => evaluations.filter((it) => it.wasPresent), [evaluations]);

  const data = useMemo(() => mapData(filteredEvaluations), [filteredEvaluations]);
  const filteredData = getFilteredData(data, filter);
  const filteredDataWithoutZeroEntries = filteredData.filter((obj) => obj.y !== 0);

  return (
    <CView style={{ width: "100%" }}>
      <StyledBarChart data={filteredDataWithoutZeroEntries} style={{ height: 200 }} gradeAxis {...rest} />

      <CView style={{ gap: 2, flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", width: "100%" }}>
        {filter === "all" && (
          <CView style={{ width: "100%", flexDirection: "row" }}>
            <CText style={{ flex: 1, fontSize: "xs", fontWeight: "500" }}>{t("skills", "Taidot")}</CText>
            <CText style={{ flex: 1, fontSize: "xs", fontWeight: "500" }}>{t("behaviour", "Työskentely")}</CText>
          </CView>
        )}
        {filteredData.map((obj, idx) => (
          <CView key={idx} style={{ justifyContent: "space-between", flexDirection: "row", width: "40%", marginRight: 30 }}>
            <CView style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 3 }}>
              <CView style={{ width: 10, height: 10, backgroundColor: obj.color }} />
              <CText style={{ fontSize: "xs" }}>{obj.x.slice(0, -1)}</CText>
            </CView>
            <CText style={{ fontSize: "sm", fontWeight: "600" }}>{obj.y === 0 ? "-" : obj.y}</CText>
          </CView>
        ))}
      </CView>
    </CView>
  );
}
