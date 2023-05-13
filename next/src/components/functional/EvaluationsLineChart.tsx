import { FragmentType, getFragmentData, graphql } from "@/gql";
import { EvaluationsLineChart_EvaluationFragment } from "@/gql/graphql";
import { formatRatingNumber } from "@/utils/dataMappers";
import { formatDate } from "@/utils/dateUtils";
import { Environment } from "@/utils/subjectUtils";
import { Line } from "recharts";
import ChartBase, { DataType as BaseDataType, LineChartBaseProps } from "../general/LineChartBase";

const EvaluationsLineChart_Evaluation_Fragment = graphql(`
  fragment EvaluationsLineChart_Evaluation on Evaluation {
    id
    skillsRating
    behaviourRating
    wasPresent
    collection {
      date
      environment {
        label
        code
        color
      }
    }
  }
`);

type DataType = BaseDataType & {
  environment: EvaluationsLineChart_EvaluationFragment["collection"]["environment"];
};

type DataTypeByEnvironments = {
  [key: string]: DataType;
};

const mapData = (evaluations: EvaluationsLineChart_EvaluationFragment[], pushThreshHold: number) => {
  const data: DataType[] = [];
  let currentSkillsSum = 0;
  let notNullSkillsCount = 0;
  let currentBehaviourSum = 0;
  let notNullBehaviourCount = 0;
  evaluations.forEach((it, i) => {
    const skillsRating = it.skillsRating && formatRatingNumber(it.skillsRating);
    const behaviourRating = it.behaviourRating && formatRatingNumber(it.behaviourRating);
    if (skillsRating) {
      notNullSkillsCount += 1;
      currentSkillsSum += skillsRating;
    }
    if (behaviourRating) {
      notNullBehaviourCount += 1;
      currentBehaviourSum += behaviourRating;
    }
    if (i < pushThreshHold) return;
    data.push({
      date: formatDate(it.collection.date),
      environment: it.collection.environment,
      skills: skillsRating && Math.round((currentSkillsSum / notNullSkillsCount) * 100) / 100,
      behaviour: behaviourRating && Math.round((currentBehaviourSum / notNullBehaviourCount) * 100) / 100,
    });
  });
  return data;
};

const mapDataByEnvironments = (data: DataType[]) => {
  const dataByEnvironments: DataTypeByEnvironments[] = [];
  data.forEach((it) => {
    const newData: DataTypeByEnvironments = {};
    newData[it.environment.code] = it;
    dataByEnvironments.push(newData);
  });
  return dataByEnvironments;
};

type EvaluationsLineChartProps = Omit<LineChartBaseProps, "data"> & {
  studentId: string;
  evaluations: readonly FragmentType<typeof EvaluationsLineChart_Evaluation_Fragment>[];
  firstIndexToPush?: number;
  environments?: Environment[];
  type?: "skills" | "behaviour" | "both" | "avg";
};

export default function EvaluationsLineChart({
  evaluations: evaluationFragments,
  studentId: _,
  firstIndexToPush = 2,
  environments = [],
  type = "both",
  ...rest
}: EvaluationsLineChartProps) {
  const evaluations = getFragmentData(EvaluationsLineChart_Evaluation_Fragment, evaluationFragments);

  const sortedEvaluations = [...evaluations]
    .sort((a, b) => new Date(a.collection.date).getTime() - new Date(b.collection.date).getTime())
    .filter((it) => it.wasPresent);

  const showAvg = sortedEvaluations.length >= firstIndexToPush + 3;
  const data = mapData(sortedEvaluations, showAvg ? firstIndexToPush : 0);
  const dataByEnvironments = mapDataByEnvironments(data);

  return (
    <ChartBase data={type === "both" ? data : dataByEnvironments} {...rest}>
      {type !== "both" &&
        environments.map((it) => (
          <Line
            key={it.code}
            connectNulls
            type="monotone"
            name={it.label}
            dataKey={`${it.code}.${type}`}
            stroke={it.color}
            strokeWidth="2"
            dot={false}
            // // activeDot={isTooltipVisible}
          />
        ))}
    </ChartBase>
  );
}
