import { useState } from "react";

export type DataType = {
  date: string;
  skills?: Maybe<number>;
  behaviour?: Maybe<number>;
};

export type LineChartBaseProps = {
  data: any[];
};

// export type LineChartBaseProps = Omit<BoxProps, "onClick"> & {
//   data: any[];
//   tooltipContent?: React.ReactElement;
//   skillsKey?: string;
//   behaviourKey?: string;
//   minItems?: number;
//   overlayBgColor?: string;
//   yLabel?: string;
// };

// function TooltipContent({ active, payload, label }: TooltipProps<"number", "string">) {
//   if (!payload || !active) return null;

//   return (
//     <Box p="2" bg="white" border="1px" borderColor="gray.200" borderRadius="md">
//       <Text mb="1">{label}</Text>
//       {payload[0] && (
//         <Text color={payload[0].stroke}>
//           {payload[0].name}: {payload[0].payload.skills || payload[0].payload.behaviour}
//         </Text>
//       )}
//       {payload[1] && (
//         <Text color={payload[1].stroke}>
//           {payload[1].name}: {payload[1].payload.behaviour}
//         </Text>
//       )}
//     </Box>
//   );
// }
// function AxisTick({ x = 0, y = 0, payload }: SVGProps<SVGGElement> & { payload?: any }) {
//   const isFirstTick = Number(x) < 50;
//   const xConverted = Number(x);

//   return (
//     <g transform={`translate(${isFirstTick ? xConverted - 15 : xConverted + 15},${y})`}>
//       <text x={0} y={3} dy={16} textAnchor={isFirstTick ? "start" : "end"} fill="#666">
//         {payload.value}
//       </text>
//     </g>
//   );
// }

export default function LineChartBase({ data }: LineChartBaseProps) {
  console.info(data);

  return null;
}
