import { FragmentType, getFragmentData, graphql } from "@/gql";
import { EvaluationsChart_EvaluationFragment } from "@/gql/graphql";
import { formatRatingNumber } from "@/utils/dataMappers";
import { formatDate } from "@/utils/dateUtils";
import { Box, BoxProps, useToken } from "@chakra-ui/react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

const mapData = (evaluations: EvaluationsChart_EvaluationFragment[]) => {
  return evaluations.map((it) => ({
    date: formatDate(it.collection.date),
    environment: it.collection.environment.label,
    skillsRating: it.skillsRating
      ? formatRatingNumber(it.skillsRating)
      : undefined,
    behaviourRating: it.behaviourRating
      ? formatRatingNumber(it.behaviourRating)
      : undefined,
  }));
};

type EvaluationsChartProps = BoxProps & {
  evaluations: readonly FragmentType<
    typeof EvaluationsChart_Evaluation_Fragment
  >[];
};

export default function EvaluationsChart({
  evaluations: evaluationFragments,
  ...rest
}: EvaluationsChartProps) {
  const [primaryColor, secondaryColor] = useToken("colors", [
    "green.500",
    "blue.500",
  ]);
  const boxRadius = useToken("radii", "md");
  const lgShadow = useToken("shadows", "lg");

  const evaluations = getFragmentData(
    EvaluationsChart_Evaluation_Fragment,
    evaluationFragments
  );
  const sortedEvaluations = [...evaluations].sort(
    (a, b) =>
      new Date(a.collection.date).getTime() -
      new Date(b.collection.date).getTime()
  );
  const data = mapData(sortedEvaluations);

  return (
    <Box {...rest}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={300}
          height={300}
          data={data}
          margin={{
            top: 0,
            bottom: 0,
            right: 15,
            left: -30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis type="number" domain={[6, 10]} />
          <Tooltip
            wrapperStyle={{ outline: "none", boxShadow: lgShadow }}
            contentStyle={{ borderRadius: boxRadius }}
          />
          <Legend wrapperStyle={{ left: 0 }} />
          <Line
            connectNulls
            name="Taidot"
            type="monotone"
            dataKey="skillsRating"
            stroke={primaryColor}
          />
          <Line
            connectNulls
            name="Työskentely"
            type="monotone"
            dataKey="behaviourRating"
            stroke={secondaryColor}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
