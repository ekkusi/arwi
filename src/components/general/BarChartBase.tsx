import { Box, BoxProps, Text, useToken } from "@chakra-ui/react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";
import CenteredContainer from "../server-components/primitives/CenteredContainer";
import Overlay from "./Overlay";

export type DataType = {
  environment: string;
  skills?: Maybe<number>;
  behaviour?: Maybe<number>;
  fill?: Maybe<string>;
};

export type BarChartBaseProps = Omit<BoxProps, "onClick"> & {
  data: DataType[];
  tooltipContent?: React.ReactElement;
  legend?: React.ReactElement;
  skillsKey?: string;
  behaviourKey?: string;
  onClick?: CategoricalChartFunc;
  notEnoughDataText?: string;
  overlayBgColor?: string;
};

function TooltipContent({
  active,
  payload,
  label,
}: TooltipProps<"number", "string">) {
  if (!payload || !active) return null;

  return (
    <Box p="2" bg="white" border="1px" borderColor="gray.200" borderRadius="md">
      <Text mb="1">{label}</Text>
      {payload[0] && (
        <Text color={payload[0].color}>
          {payload[0].name}:{" "}
          {payload[0].payload.skills || payload[0].payload.behaviour}
        </Text>
      )}
      {payload[1] && (
        <Text color={payload[1].color}>
          {payload[1].name}: {payload[1].payload.behaviour}
        </Text>
      )}
    </Box>
  );
}

export default function BarChartBase({
  data,
  children,
  onClick,
  tooltipContent,
  legend,
  notEnoughDataText = "Kuvaajan näyttämiseksi tarvitaan vähintään 2 arvoa",
  overlayBgColor = "light-gray",
  ...rest
}: BarChartBaseProps) {
  const [primaryColor, secondaryColor] = useToken("colors", [
    "green.500",
    "blue.500",
  ]);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [currentTimeoutId, setCurrentTimeoutId] = useState<
    NodeJS.Timeout | undefined
  >();
  const lgShadow = useToken("shadows", "lg");

  // Open tooltip after 300 of mouse down
  const openTooltip = () => {
    setCurrentTimeoutId(setTimeout(() => setIsTooltipVisible(true), 300));
  };

  // Close tooltip immediately on mouse up, clear timeout
  const closeTooltip = () => {
    if (currentTimeoutId) {
      clearTimeout(currentTimeoutId);
      setCurrentTimeoutId(undefined);
    }
    setIsTooltipVisible(false);
  };

  return (
    <Box position="relative" width="100%" height="100%" {...rest}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data.length > 2 ? data : []}
          layout="vertical"
          margin={{
            top: 5,
            bottom: 0,
            right: 25,
            left: -35,
          }}
          onClick={onClick}
          onMouseDown={openTooltip}
          onMouseUp={closeTooltip}
          barSize={data.length < 4 ? 50 : undefined}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis interval={0} type="number" domain={[6, 10]} />
          <YAxis
            tick={false}
            textAnchor="end"
            reversed
            dataKey="environment"
            type="category"
          />
          <Tooltip
            wrapperStyle={{
              visibility: isTooltipVisible ? "visible" : "hidden",
              outline: "none",
              boxShadow: lgShadow,
            }}
            cursor={{ fill: "transparent" }}
            content={tooltipContent || <TooltipContent />}
            allowEscapeViewBox={{
              y: true,
            }}
          />
          {data.length > 2 && (
            <Legend wrapperStyle={{ left: 0 }} content={legend} />
          )}
          {children || (
            <>
              <Bar
                name="Taidot"
                dataKey="skills"
                fill={primaryColor}
                stroke={primaryColor}
                label={{ position: "right" }}
                isAnimationActive={false}
              />
              <Bar
                name="Työskentely"
                dataKey="behaviour"
                fill={secondaryColor}
                stroke={secondaryColor}
                label={{ position: "right" }}
                isAnimationActive={false}
              />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
      {data.length < 2 && (
        <Overlay bgColor={overlayBgColor} opacity={0.3}>
          <CenteredContainer width="70%" pb={50}>
            <Text>{notEnoughDataText}</Text>
          </CenteredContainer>
        </Overlay>
      )}
    </Box>
  );
}
