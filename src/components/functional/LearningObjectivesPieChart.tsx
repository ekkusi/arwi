import { FragmentType, getFragmentData, graphql } from "@/gql";
import { Box, BoxProps, Text, useToken } from "@chakra-ui/react";
import { LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";
import Overlay from "../general/Overlay";
import CenteredContainer from "../server-components/primitives/CenteredContainer";

const LearningObjectivesPieChart_LearningObjective_Fragment = graphql(`
  fragment LearningObjectivesPieChart_LearningObjective on LearningObjective {
    label
    code
    type
  }
`);
export type DataType = {
  learningObjective: FragmentType<
    typeof LearningObjectivesPieChart_LearningObjective_Fragment
  >;
  count: number;
};

type PieChartBaseProps = Omit<BoxProps, "onClick"> & {
  data: DataType[];
  tooltipContent?: React.ReactElement;
  skillsKey?: string;
  behaviourKey?: string;
  onClick?: CategoricalChartFunc;
  minItems?: number;
  overlayBgColor?: string;
};

export default function LearningObjectivesPieChart({
  data,
  onClick,
  minItems = 2,
  overlayBgColor = "light-gray",
  ...rest
}: PieChartBaseProps) {
  const [primaryColor] = useToken("colors", ["green.500"]);

  const mappedData = data.map((d) => {
    const learningObjective = getFragmentData(
      LearningObjectivesPieChart_LearningObjective_Fragment,
      d.learningObjective
    );
    return {
      value: d.count,
      label: learningObjective.label,
      code: learningObjective.code,
    };
  });

  const hasEnoughData = data.length >= minItems;

  return (
    <Box position="relative" {...rest}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart data={hasEnoughData ? mappedData : []} onClick={onClick}>
          <Pie
            data={mappedData}
            nameKey="label"
            dataKey="value"
            fill={primaryColor}
            label
            isAnimationActive={false}
            style={{
              outline: "none",
            }}
          >
            <LabelList dataKey="code" fontWeight="normal" fontSize="18px" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {!hasEnoughData && (
        <Overlay bgColor={overlayBgColor} opacity={0.3}>
          <CenteredContainer width="70%" pb={50}>
            <Text>
              Kuvaajan näyttämiseen tarvitaan vähintään {minItems} arviointia,
              jotka sisältävät tavoitteita
            </Text>
          </CenteredContainer>
        </Overlay>
      )}
    </Box>
  );
}
