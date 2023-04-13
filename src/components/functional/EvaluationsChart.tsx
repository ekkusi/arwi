import { FragmentType, getFragmentData, graphql } from "@/gql";
import { EvaluationsChart_EvaluationFragment } from "@/gql/graphql";
import { formatRatingNumber } from "@/utils/dataMappers";
import { formatDate } from "@/utils/dateUtils";
import { BoxProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ChartBase from "../general/ChartBase";

const EvaluationsChart_Evaluation_Fragment = graphql(`
  fragment EvaluationsChart_Evaluation on Evaluation {
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

type DataType = {
  date: string;
  environment: string;
  skills?: Maybe<number>;
  behaviour?: Maybe<number>;
};

const mapData = (
  evaluations: EvaluationsChart_EvaluationFragment[],
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
    if (i + 1 <= pushThreshHold) return;
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

type EvaluationsChartProps = Omit<BoxProps, "onClick"> & {
  studentId: string;
  evaluations: readonly FragmentType<
    typeof EvaluationsChart_Evaluation_Fragment
  >[];
  showAvgThreshhold?: number;
};

export default function EvaluationsChart({
  evaluations: evaluationFragments,
  studentId,
  showAvgThreshhold = 3,
  ...rest
}: EvaluationsChartProps) {
  const evaluations = getFragmentData(
    EvaluationsChart_Evaluation_Fragment,
    evaluationFragments
  );
  const router = useRouter();

  const sortedEvaluations = [...evaluations].sort(
    (a, b) =>
      new Date(a.collection.date).getTime() -
      new Date(b.collection.date).getTime()
  );
  const showAvg = sortedEvaluations.length > showAvgThreshhold;
  const data = mapData(sortedEvaluations, showAvg ? showAvgThreshhold : 0);

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
