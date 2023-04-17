import { FragmentType, getFragmentData, graphql } from "@/gql";
import { CollectionsChart_EvaluationCollectionFragment } from "@/gql/graphql";
import { formatDate } from "@/utils/dateUtils";
import { analyzeEvaluations } from "@/utils/evaluationUtils";
import { BoxProps } from "@chakra-ui/react";
import ChartBase, { DataType } from "../general/LineChartBase";

const CollectionsChart_Collection_Fragment = graphql(`
  fragment CollectionsChart_EvaluationCollection on EvaluationCollection {
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
    }
  }
`);

const mapData = (
  collections: CollectionsChart_EvaluationCollectionFragment[]
) => {
  const data: DataType[] = [];
  let currentSkillsSum = 0;
  let notNullSkillsCount = 0;
  let currentBehaviourSum = 0;
  let notNullBehaviourCount = 0;
  collections.forEach((it) => {
    const { skillsAverage, behaviourAverage } = analyzeEvaluations(
      it.evaluations
    );
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
      environment: it.environment.label,
      skills:
        skillsAverage > 0
          ? Math.round((currentSkillsSum / notNullSkillsCount) * 100) / 100
          : null,
      behaviour:
        behaviourAverage > 0
          ? Math.round((currentBehaviourSum / notNullBehaviourCount) * 100) /
            100
          : null,
    });
  });
  return data;
};

type CollectionsChartProps = Omit<BoxProps, "onClick"> & {
  collections: readonly FragmentType<
    typeof CollectionsChart_Collection_Fragment
  >[];
};

export default function CollectionsChart({
  collections: collectionFragments,
  ...rest
}: CollectionsChartProps) {
  const collections = getFragmentData(
    CollectionsChart_Collection_Fragment,
    collectionFragments
  );

  const sortedCollections = [...collections].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const data = mapData(sortedCollections);

  return <ChartBase data={data} {...rest} />;
}
