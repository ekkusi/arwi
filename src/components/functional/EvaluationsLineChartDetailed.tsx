import { FragmentType, getFragmentData, graphql } from "@/gql";
import { EvaluationsLineChartDetailed_EvaluationFragment } from "@/gql/graphql";
import { formatRatingNumber } from "@/utils/dataMappers";
import { formatDate } from "@/utils/dateUtils";
import { Environment } from "@/utils/subjectUtils";
import { Line } from "recharts";
import ChartBase, {
  DataType as BaseDataType,
  LineChartBaseProps,
} from "../general/LineChartBase";

const EvaluationsLineChartDetailed_Evaluation_Fragment = graphql(`
  fragment EvaluationsLineChartDetailed_Evaluation on Evaluation {
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
  environment: EvaluationsLineChartDetailed_EvaluationFragment["collection"]["environment"];
};

type DataTypeByEnvironments = {
  [key: string]: DataType;
};

const mapDataByEnvironments = (
  evaluations: EvaluationsLineChartDetailed_EvaluationFragment[]
) => {
  const data: DataTypeByEnvironments[] = [];
  evaluations.forEach((it) => {
    const newData: DataTypeByEnvironments = {};
    newData[it.collection.environment.code] = {
      date: formatDate(it.collection.date),
      skills: it.skillsRating && formatRatingNumber(it.skillsRating),
      behaviour: it.behaviourRating && formatRatingNumber(it.behaviourRating),
      environment: it.collection.environment,
    };
    data.push(newData);
  });
  return data;
};

type EvaluationsLineChartDetailedProps = Omit<LineChartBaseProps, "data"> & {
  evaluations: readonly FragmentType<
    typeof EvaluationsLineChartDetailed_Evaluation_Fragment
  >[];
  environments?: Environment[];
  type?: "skills" | "behaviour" | "both" | "avg";
};

export default function EvaluationsLineChartDetailed({
  evaluations: evaluationFragments,
  environments = [],
  type = "both",
  ...rest
}: EvaluationsLineChartDetailedProps) {
  const evaluations = getFragmentData(
    EvaluationsLineChartDetailed_Evaluation_Fragment,
    evaluationFragments
  );

  const sortedEvaluations = [...evaluations]
    .sort(
      (a, b) =>
        new Date(a.collection.date).getTime() -
        new Date(b.collection.date).getTime()
    )
    .filter((it) => it.wasPresent);

  // const showAvg = sortedEvaluations.length >= firstIndexToPush + 3;
  const data = mapDataByEnvironments(sortedEvaluations);

  return (
    <ChartBase data={data} {...rest}>
      {environments.map((it) => (
        <Line
          key={it.code}
          connectNulls
          type="monotone"
          name={it.label}
          dataKey={`${it.code}.${type}`}
          stroke={it.color}
          strokeWidth="2"
          // dot={false}
          // // activeDot={isTooltipVisible}
        />
      ))}
    </ChartBase>
  );
}
