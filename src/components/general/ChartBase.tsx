import { Box, BoxProps, Text, useToken } from "@chakra-ui/react";
import { useState } from "react";
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
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";

type ChartBaseProps = Omit<BoxProps, "onClick"> & {
  data: any[];
  tooltipContent?: React.ReactElement;
  skillsKey?: string;
  behaviourKey?: string;
  onClick?: CategoricalChartFunc;
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
        <Text color={payload[0].stroke}>
          {payload[0].name}:{" "}
          {payload[0].payload.skills || payload[0].payload.behaviour}
        </Text>
      )}
      {payload[1] && (
        <Text color={payload[1].stroke}>
          {payload[1].name}: {payload[1].payload.behaviour}
        </Text>
      )}
    </Box>
  );
}

export default function ChartBase({
  data,
  tooltipContent,
  children,
  onClick,
  ...rest
}: ChartBaseProps) {
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
    <Box {...rest}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            bottom: 0,
            right: 15,
            left: -25,
          }}
          onClick={onClick}
          onMouseDown={openTooltip}
          onMouseUp={closeTooltip}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            type="number"
            label={{ value: "Keskiarvojen kehitys", angle: -90 }}
            domain={[6, 10]}
          />
          <Tooltip
            wrapperStyle={{
              visibility: isTooltipVisible ? "visible" : "hidden",
              outline: "none",
              boxShadow: lgShadow,
            }}
            content={tooltipContent || <TooltipContent />}
            allowEscapeViewBox={{
              y: true,
            }}
          />
          <Legend wrapperStyle={{ left: 0 }} />
          {children || (
            <>
              <Line
                connectNulls
                type="monotone"
                name="Taidot"
                dataKey="skills"
                stroke={primaryColor}
                dot={false}
                activeDot={isTooltipVisible}
              />
              <Line
                connectNulls
                type="monotone"
                name="Työskentely"
                dataKey="behaviour"
                stroke={secondaryColor}
                dot={false}
                activeDot={isTooltipVisible}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
