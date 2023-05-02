import { Box, BoxProps, Text, useToken } from "@chakra-ui/react";
import { SVGProps, useState } from "react";
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
import CenteredContainer from "../server-components/primitives/CenteredContainer";
import Overlay from "./Overlay";

export type DataType = {
  date: string;
  environment: string;
  skills?: Maybe<number>;
  behaviour?: Maybe<number>;
};

export type LineChartBaseProps = Omit<BoxProps, "onClick"> & {
  data: any[];
  tooltipContent?: React.ReactElement;
  skillsKey?: string;
  behaviourKey?: string;
  onClick?: CategoricalChartFunc;
  minItems?: number;
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
function AxisTick({
  x = 0,
  y = 0,
  payload,
}: SVGProps<SVGGElement> & { payload?: any }) {
  const isFirstTick = Number(x) < 50;
  const xConverted = Number(x);

  return (
    <g
      transform={`translate(${
        isFirstTick ? xConverted - 15 : xConverted + 15
      },${y})`}
    >
      <text
        x={0}
        y={3}
        dy={16}
        textAnchor={isFirstTick ? "start" : "end"}
        fill="#666"
      >
        {payload.value}
      </text>
    </g>
  );
}

export default function LineChartBase({
  data,
  tooltipContent,
  children,
  onClick,
  minItems = 3,
  overlayBgColor = "light-gray",
  ...rest
}: LineChartBaseProps) {
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

  const hasEnoughData = data.length >= minItems;

  const ticks = hasEnoughData ? [data[0].date, data[data.length - 1].date] : [];

  return (
    <Box position="relative" {...rest}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={hasEnoughData ? data : []}
          margin={{
            top: 5,
            bottom: 10,
            right: 15,
            left: -25,
          }}
          onClick={onClick}
          onMouseDown={openTooltip}
          onMouseUp={closeTooltip}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            interval={0}
            ticks={ticks}
            tick={ticks.length > 0 ? <AxisTick /> : false}
            domain={["dataMin", "dataMax"]}
          />
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
          <Legend wrapperStyle={{ left: 0, marginTop: 20 }} />
          {children || (
            <>
              <Line
                connectNulls
                type="monotone"
                name="Taidot"
                dataKey="skills"
                stroke={primaryColor}
                strokeWidth="2"
                dot={false}
                activeDot={isTooltipVisible}
              />
              <Line
                connectNulls
                type="monotone"
                name="Työskentely"
                dataKey="behaviour"
                stroke={secondaryColor}
                strokeWidth="2"
                dot={false}
                activeDot={isTooltipVisible}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
      {!hasEnoughData && (
        <Overlay bgColor={overlayBgColor} opacity={0.3}>
          <CenteredContainer width="70%" pb={50}>
            <Text>
              Kuvaajan näyttämiseen tarvitaan vähintään {minItems} arviointia
            </Text>
          </CenteredContainer>
        </Overlay>
      )}
    </Box>
  );
}
