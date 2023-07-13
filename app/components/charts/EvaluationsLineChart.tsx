import { FragmentType, getFragmentData, graphql } from "../../gql";
import { EvaluationsLineChart_EvaluationFragment } from "../../gql/graphql";
import { formatRatingNumber } from "../../helpers/dataMappers";
import { formatDate } from "../../helpers/dateHelpers";
import LineChartBase, { DataType as BaseDataType, LineChartBaseProps } from "./LineChartBase";

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

type EvaluationsLineChartProps = Omit<LineChartBaseProps, "data"> & {
  evaluations: readonly FragmentType<typeof EvaluationsLineChart_Evaluation_Fragment>[];
  showAvgThreshhold?: number;
};

export default function EvaluationsLineChart({
  evaluations: evaluationFragments,
  showAvgThreshhold = 2,
  minItems = 3,
  ...rest
}: EvaluationsLineChartProps) {
  const evaluations = getFragmentData(EvaluationsLineChart_Evaluation_Fragment, evaluationFragments);

  const sortedEvaluations = [...evaluations]
    .sort((a, b) => new Date(a.collection.date).getTime() - new Date(b.collection.date).getTime())
    .filter((it) => it.wasPresent);

  // Start pushing item to data array after the avg threshhold is reached (to avoid showing data that is not yet balanced)
  // If there are less than minItems, start pushing items from beginning
  const showAvg = sortedEvaluations.length >= showAvgThreshhold + minItems;
  const data = mapData(sortedEvaluations, showAvg ? showAvgThreshhold : 0);

  return <LineChartBase data={data} {...rest} />;
}
