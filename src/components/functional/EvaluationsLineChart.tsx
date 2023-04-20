import { FragmentType, getFragmentData, graphql } from "@/gql";
import { EvaluationsLineChart_EvaluationFragment } from "@/gql/graphql";
import { formatRatingNumber } from "@/utils/dataMappers";
import { formatDate } from "@/utils/dateUtils";
import { BoxProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ChartBase, { DataType } from "../general/LineChartBase";

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
      }
    }
  }
`);

const mapData = (
  evaluations: EvaluationsLineChart_EvaluationFragment[],
  pushThreshHold: number
) => {
  const data: DataType[] = [];
  let currentSkillsSum = 0;
  let notNullSkillsCount = 0;
  let currentBehaviourSum = 0;
  let notNullBehaviourCount = 0;
  evaluations.forEach((it, i) => {
    const skillsRating = it.skillsRating && formatRatingNumber(it.skillsRating);
    const behaviourRating =
      it.behaviourRating && formatRatingNumber(it.behaviourRating);
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
      environment: it.collection.environment.label,
      skills:
        skillsRating &&
        Math.round((currentSkillsSum / notNullSkillsCount) * 100) / 100,
      behaviour:
        behaviourRating &&
        Math.round((currentBehaviourSum / notNullBehaviourCount) * 100) / 100,
    });
  });
  return data;
};

type EvaluationsLineChartProps = Omit<BoxProps, "onClick"> & {
  studentId: string;
  evaluations: readonly FragmentType<
    typeof EvaluationsLineChart_Evaluation_Fragment
  >[];
  firstIndexToPush?: number;
};

export default function EvaluationsLineChart({
  evaluations: evaluationFragments,
  studentId,
  firstIndexToPush = 2,
  ...rest
}: EvaluationsLineChartProps) {
  const evaluations = getFragmentData(
    EvaluationsLineChart_Evaluation_Fragment,
    evaluationFragments
  );
  const router = useRouter();

  const sortedEvaluations = [...evaluations]
    .sort(
      (a, b) =>
        new Date(a.collection.date).getTime() -
        new Date(b.collection.date).getTime()
    )
    .filter((it) => it.wasPresent);

  const showAvg = sortedEvaluations.length >= firstIndexToPush + 3;
  const data = mapData(sortedEvaluations, showAvg ? firstIndexToPush : 0);

  return (
    <ChartBase
      data={data}
      onClick={() => {
        router.push(`/student/${studentId}/details`);
      }}
      {...rest}
    />
  );
}
