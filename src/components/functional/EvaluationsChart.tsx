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

type RatingValue = {
  value: number;
  currentAvg: number;
};

type DataType = {
  date: string;
  environment: string;
  skills?: Maybe<RatingValue>;
  behaviour?: Maybe<RatingValue>;
};

const mapData = (evaluations: EvaluationsChart_EvaluationFragment[]) => {
  const data: DataType[] = [];
  let currentSkillsSum = 0;
  let notNullSkillsCount = 0;
  let currentBehaviourSum = 0;
  let notNullBehaviourCount = 0;
  evaluations.forEach((it) => {
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
    data.push({
      date: formatDate(it.collection.date),
      environment: it.collection.environment.label,
      skills: skillsRating && {
        value: skillsRating,
        currentAvg: currentSkillsSum / notNullSkillsCount,
      },
      behaviour: behaviourRating && {
        value: behaviourRating,
        currentAvg: currentBehaviourSum / notNullBehaviourCount,
      },
    });
  });
  return data;
};

const formatValueString = (valueObj: RatingValue) => {
  if (!valueObj) return "Ei arvoa";

  return `${valueObj?.value} (ka: ${valueObj?.currentAvg.toFixed(2)})`;
};

function CustomTooltip({ payload, label }: TooltipProps<"number", "string">) {
  if (!payload) return null;
  const environment = payload[0]?.payload?.environment;

  return (
    <Box p="2" bg="white" border="1px" borderColor="gray.200" borderRadius="md">
      <Text>
        {environment && `${environment} -`} {label}
      </Text>
      {payload[0] && (
        <Text color={payload[0].stroke}>
          {payload[0].name}:{" "}
          {formatValueString(
            payload[0].payload.skills || payload[0].payload.behaviour
          )}
        </Text>
      )}
      {payload[1] && (
        <Text color={payload[1].stroke}>
          {payload[1].name}: {formatValueString(payload[1].payload.behaviour)}
        </Text>
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
            left: -25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            type="number"
            label={{ value: "Keskiarvo", angle: -90 }}
            domain={[6, 10]}
          />
          <Tooltip
            wrapperStyle={{ outline: "none", boxShadow: lgShadow }}
            content={<CustomTooltip />}
          />
          <Legend wrapperStyle={{ left: 0 }} />
          <Line
            connectNulls
            name="Taidot"
            dataKey="skills.currentAvg"
            stroke={primaryColor}
          />
          <Line
            connectNulls
            name="Työskentely"
            dataKey="behaviour.currentAvg"
            stroke={secondaryColor}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
