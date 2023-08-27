import { FragmentType, getFragmentData, graphql } from "../../gql";
import { EvaluationsLineChart_EvaluationFragment } from "../../gql/graphql";
import { formatRatingNumber } from "../../helpers/dataMappers";
import { formatDate } from "../../helpers/dateHelpers";
import LineChartBase, { DataType as BaseDataType, LineChartBaseProps } from "./LineChartBase";
import MovingAverageLineChart, { EvaluationDataType } from "./MovingAverageLineChart";

export const EvaluationsLineChart_Evaluation_Fragment = graphql(`
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

export const mapEvaluationData = (evaluations: EvaluationsLineChart_EvaluationFragment[]) => {
  const data: EvaluationDataType[] = [];
  evaluations.forEach((ev) => {
    const skillsRating = ev.skillsRating && formatRatingNumber(ev.skillsRating);
    const behaviourRating = ev.behaviourRating && formatRatingNumber(ev.behaviourRating);
    if (skillsRating && behaviourRating) {
      data.push({
        date: formatDate(ev.collection.date),
        environment: ev.collection.environment,
        skills: skillsRating,
        behaviour: behaviourRating,
      });
    }
  });
  return data;
};

type EvaluationsLineChartProps = Omit<LineChartBaseProps, "data"> & {
  evaluations: readonly FragmentType<typeof EvaluationsLineChart_Evaluation_Fragment>[];
};

export default function EvaluationsLineChart({ evaluations: evaluationFragments, ...rest }: EvaluationsLineChartProps) {
  const evaluations = getFragmentData(EvaluationsLineChart_Evaluation_Fragment, evaluationFragments);

  const sortedEvaluations = [...evaluations]
    .sort((a, b) => new Date(a.collection.date).getTime() - new Date(b.collection.date).getTime())
    .filter((it) => it.wasPresent);

  // Start pushing item to data array after the avg threshhold is reached (to avoid showing data that is not yet balanced)
  // If there are less than minItems, start pushing items from beginning
  const data = mapEvaluationData(sortedEvaluations);

  return <MovingAverageLineChart data={data} {...rest} />;
}
