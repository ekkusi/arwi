import { FragmentType, getFragmentData, graphql } from "../../gql";
import { CollectionsLineChart_EvaluationCollectionFragment } from "../../gql/graphql";
import { formatDate } from "../../helpers/dateHelpers";
import { analyzeEvaluations, analyzeEvaluationsSimple } from "../../helpers/evaluationUtils";
import LineChartBase, { DataType, LineChartBaseProps } from "./LineChartBase";

const CollectionsLineChart_Collection_Fragment = graphql(`
  fragment CollectionsLineChart_EvaluationCollection on EvaluationCollection {
    id
    date
    environment {
      label
      code
    }
    evaluations {
      skillsRating
      behaviourRating
      wasPresent
      isStellar
    }
  }
`);

const mapData = (collections: CollectionsLineChart_EvaluationCollectionFragment[]) => {
  const data: DataType[] = [];
  let currentSkillsSum = 0;
  let notNullSkillsCount = 0;
  let currentBehaviourSum = 0;
  let notNullBehaviourCount = 0;
  collections.forEach((it) => {
    const { skillsAverage, behaviourAverage } = analyzeEvaluationsSimple(it.evaluations);
    if (skillsAverage > 0) {
      notNullSkillsCount += 1;
      currentSkillsSum += skillsAverage;
    }
    if (behaviourAverage > 0) {
      notNullBehaviourCount += 1;
      currentBehaviourSum += behaviourAverage;
    }
    data.push({
      date: formatDate(it.date),
      skills: skillsAverage > 0 ? Math.round((currentSkillsSum / notNullSkillsCount) * 100) / 100 : null,
      behaviour: behaviourAverage > 0 ? Math.round((currentBehaviourSum / notNullBehaviourCount) * 100) / 100 : null,
    });
  });
  return data;
};

type CollectionsChartProps = Omit<LineChartBaseProps, "data"> & {
  collections: readonly FragmentType<typeof CollectionsLineChart_Collection_Fragment>[];
};

export default function CollectionsLineChart({ collections: collectionFragments, ...rest }: CollectionsChartProps) {
  const collections = getFragmentData(CollectionsLineChart_Collection_Fragment, collectionFragments);

  const sortedCollections = [...collections].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const data = mapData(sortedCollections);

  return <LineChartBase data={data} {...rest} />;
}
