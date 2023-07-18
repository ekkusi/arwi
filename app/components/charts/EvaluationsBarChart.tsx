import { VictoryBar, VictoryChart, VictoryContainer, VictoryGroup } from "victory-native";
import { useState } from "react";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { EvaluationsBarChart_EvaluationFragment } from "../../gql/graphql";
import { formatRatingNumber } from "../../helpers/dataMappers";
import { DataType } from "./BarChartBase";
import { hexToRgbA } from "../../helpers/color";
import CView, { CViewProps } from "../primitives/CView";

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

const INCLUDE_ENVIRONMENT_COUNT_THRESHHOLD = 0;

const mapData = (evaluations: EvaluationsBarChart_EvaluationFragment[]) => {
  const data: DataType[] = [];
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
    if (tempData[key].skills.count < INCLUDE_ENVIRONMENT_COUNT_THRESHHOLD) return;
    data.push({
      environment: tempData[key].label,
      fill: tempData[key].color,
      skills: tempData[key].skills.count > 0 ? Math.round((tempData[key].skills.value / tempData[key].skills.count) * 100) / 100 : null,
      behaviour: tempData[key].behaviour.count > 0 ? Math.round((tempData[key].behaviour.value / tempData[key].behaviour.count) * 100) / 100 : null,
    });
  });
  return data;
};

type EvaluationsBarChartProps = CViewProps & {
  evaluations: readonly FragmentType<typeof EvaluationsBarChart_Evaluation_Fragment>[];
};

export default function EvaluationsBarChart({ evaluations: evaluationFragments, ...rest }: EvaluationsBarChartProps) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null); // Crashes on ios if is set to width: 0 and height: 0 at start
  const evaluations = getFragmentData(EvaluationsBarChart_Evaluation_Fragment, evaluationFragments);
  const filteredEvaluations = evaluations.filter((it) => it.wasPresent);

  const data = mapData(filteredEvaluations);
  return (
    <CView
      style={{ flex: 1, width: "100%" }}
      onLayout={(event) => {
        setSize({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height });
      }}
      {...rest}
    >
      {size && (
        <VictoryChart
          horizontal
          padding={{ top: 50, left: 50, right: 15, bottom: 50 }}
          containerComponent={<VictoryContainer disableContainerEvents />}
          {...size}
        >
          <VictoryGroup offset={20}>
            <VictoryBar data={data} x="environment" y="skills" style={{ data: { fill: ({ datum }) => datum.fill } }} />
            <VictoryBar data={data} x="environment" y="behaviour" style={{ data: { fill: ({ datum }) => hexToRgbA(datum.fill, 0.8) } }} />
          </VictoryGroup>
        </VictoryChart>
      )}
    </CView>
  );
}
