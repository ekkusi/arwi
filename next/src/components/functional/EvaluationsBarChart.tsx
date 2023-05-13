import { FragmentType, getFragmentData, graphql } from "@/gql";
import { EvaluationsBarChart_EvaluationFragment } from "@/gql/graphql";
import { hexToRgbA } from "@/utils/color";
import { formatRatingNumber } from "@/utils/dataMappers";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Bar, Cell, LabelList, TooltipProps } from "recharts";
import BarChartBase, { BarChartBaseProps, DataType } from "../general/BarChartBase";

const EvaluationsBarChart_Evaluation_Fragment = graphql(`
  fragment EvaluationsBarChart_Evaluation on Evaluation {
    id
    skillsRating
    behaviourRating
    wasPresent
    collection {
      environment {
        label
        code
        color
      }
    }
  }
`);

type TempDataValue = {
  value: number;
  count: number;
};

type TempDataType = {
  label: string;
  color: string;
  skills: TempDataValue;
  behaviour: TempDataValue;
};

const INCLUDE_ENVIRONMENT_COUNT_THRESHHOLD = 0;

const mapData = (evaluations: EvaluationsBarChart_EvaluationFragment[]) => {
  const data: DataType[] = [];
  const tempData: { [key: string]: TempDataType } = {};
  evaluations.forEach((evaluation) => {
    const envCode = evaluation.collection.environment.code;
    if (!tempData[envCode]) {
      tempData[envCode] = {
        color: evaluation.collection.environment.color,
        label: evaluation.collection.environment.label,
        skills: {
          value: 0,
          count: 0,
        },
        behaviour: {
          value: 0,
          count: 0,
        },
      };
    }
    const matchingEnvironment = tempData[envCode];

    if (evaluation.skillsRating) {
      matchingEnvironment.skills.value += formatRatingNumber(evaluation.skillsRating);
      matchingEnvironment.skills.count += 1;
    }
    if (evaluation.behaviourRating) {
      matchingEnvironment.behaviour.value += formatRatingNumber(evaluation.behaviourRating);
      matchingEnvironment.behaviour.count += 1;
    }
  });
  Object.keys(tempData).forEach((key) => {
    if (tempData[key].skills.count < INCLUDE_ENVIRONMENT_COUNT_THRESHHOLD) return;
    data.push({
      environment: tempData[key].label,
      fill: tempData[key].color,
      skills: tempData[key].skills.count > 0 ? Math.round((tempData[key].skills.value / tempData[key].skills.count) * 100) / 100 : null,
      behaviour: tempData[key].behaviour.count > 0 ? Math.round((tempData[key].behaviour.value / tempData[key].behaviour.count) * 100) / 100 : null,
    });
  });
  return data;
};

type EvaluationsBarChartProps = Omit<BarChartBaseProps, "data"> & {
  evaluations: readonly FragmentType<typeof EvaluationsBarChart_Evaluation_Fragment>[];
};

function TooltipContent({ active, payload, label }: TooltipProps<"number", "string">) {
  if (!payload || !active) return null;

  return (
    <Box p="2" bg="white" border="1px" borderColor="gray.200" borderRadius="md">
      <Text color={payload[0]?.payload.fill} mb="1">
        {label}
      </Text>
      {payload[0] && (
        <Text>
          {payload[0].name}: {payload[0].payload.skills || payload[0].payload.behaviour}
        </Text>
      )}
      {payload[1] && (
        <Text>
          {payload[1].name}: {payload[1].payload.behaviour}
        </Text>
      )}
    </Box>
  );
}

function LegendContent({ data }: { data: DataType[] }) {
  return (
    <Flex wrap="wrap" justifyContent="center">
      {data.map((entry) => (
        <Flex key={entry.environment} mr="2" alignItems="center">
          <Box width="2" height="2" bg={entry.fill as string} mr="1" borderRadius="sm" />
          <Text color={entry.fill as string}>{entry.environment}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default function EvaluationsBarChart({ evaluations: evaluationFragments, ...rest }: EvaluationsBarChartProps) {
  const evaluations = getFragmentData(EvaluationsBarChart_Evaluation_Fragment, evaluationFragments);
  const filteredEvaluations = evaluations.filter((it) => it.wasPresent);

  const data = mapData(filteredEvaluations);
  return (
    <BarChartBase
      data={data}
      tooltipContent={<TooltipContent />}
      legend={<LegendContent data={data.slice().reverse()} />}
      notEnoughDataText={`Kuvaajan näyttämiseen tarvitaan vähintään 2 ympäristöä, joilla on vähintään ${INCLUDE_ENVIRONMENT_COUNT_THRESHHOLD} arviointia`}
      {...rest}
    >
      <Bar name="Taidot" dataKey="skills" isAnimationActive={false}>
        <LabelList position="middle" stroke="white" fontSize="12px">
          Taidot
        </LabelList>
        <LabelList dataKey="skills" position="right" />
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill ? hexToRgbA(entry.fill, 0.7) : undefined} />
        ))}
      </Bar>
      <Bar name="Työskentely" dataKey="behaviour" isAnimationActive={false}>
        <LabelList position="middle" stroke="white" fontSize="12px">
          Työskentely
        </LabelList>
        <LabelList dataKey="behaviour" position="right" />
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill || undefined} />
        ))}
      </Bar>
    </BarChartBase>
  );
}
