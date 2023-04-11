import { FragmentType, getFragmentData, graphql } from "@/gql";
import { EvaluationsChart_EvaluationFragment } from "@/gql/graphql";
import { formatRatingNumber } from "@/utils/dataMappers";
import { formatDate } from "@/utils/dateUtils";
import { Box, BoxProps, Text, useToken } from "@chakra-ui/react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

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

function CustomTooltip({ payload, label }: TooltipProps<ValueType, NameType>) {
  if (!payload) return null;
  const environment = payload[0]?.payload?.environment;

  return (
    <Box p="2" bg="white" border="1px" borderColor="gray.200" borderRadius="md">
      <Text>
        {environment && `${environment} -`} {label}
      </Text>
      {payload[0] && (
        <Text color={payload[0].stroke}>
          {payload[0].name}: {payload[0].value}
        </Text>
      )}
      {payload[1] && (
        <Text color={payload[1].stroke}>Työskentely: {payload[1].value}</Text>
      )}
    </Box>
  );
}

type EvaluationsChartProps = BoxProps & {
  evaluations: readonly FragmentType<
    typeof EvaluationsChart_Evaluation_Fragment
  >[];
};

export default function EvaluationsChart({
  evaluations: evaluationFragments,
  ...rest
}: EvaluationsChartProps) {
  const evaluations = getFragmentData(
    EvaluationsChart_Evaluation_Fragment,
    evaluationFragments
  );

  const [primaryColor, secondaryColor] = useToken("colors", [
    "green.500",
    "blue.500",
  ]);
  const boxRadius = useToken("radii", "md");
  const lgShadow = useToken("shadows", "lg");

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
            top: 5,
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
            content={<CustomTooltip />}
          />
          <Legend wrapperStyle={{ left: 0 }} />
          <Line
            connectNulls
            name="Taidot"
            dataKey="skillsRating"
            stroke={primaryColor}
          />
          <Line
            connectNulls
            name="Työskentely"
            dataKey="behaviourRating"
            stroke={secondaryColor}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
