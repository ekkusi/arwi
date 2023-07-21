import { VictoryBar, VictoryChart, VictoryContainer, VictoryGroup, VictoryLabel, VictoryTooltip, VictoryVoronoiContainer } from "victory-native";
import { useState } from "react";
import CView, { CViewProps } from "../primitives/CView";
import { COLORS } from "../../theme";

export type EnvironmentBarChartDataType = {
  x: string;
  color: string;
  y: number;
};

type EvaluationsBarChartProps = CViewProps & {
  data: EnvironmentBarChartDataType[];
};

export default function EnvironmentsBarChart({ data, ...rest }: EvaluationsBarChartProps) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null); // Crashes on ios if is set to width: 0 and height: 0 at start

  const barWidth = (size?.width || 0) / data.length - 1;
  const noZeroData = data.map((obj) => {
    return { ...obj, y: obj.y === 0 ? 0.7 : obj.y };
  });
  const maxCount = Math.max(...data.map((obj) => obj.y));

  return (
    <CView
      style={{ flex: 1, width: "100%", borderBottomColor: "lightgray", borderBottomWidth: 10 }}
      onLayout={(event) => {
        setSize({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height });
      }}
      {...rest}
    >
      {size && (
        <VictoryBar
          padding={{ left: barWidth / 2, right: barWidth / 2, top: 50 }}
          data={noZeroData}
          width={size.width}
          height={size.height}
          barWidth={barWidth}
          containerComponent={
            <VictoryVoronoiContainer style={{ borderBottomColor: "darkgray", borderBottomWidth: 1 }} width={size.width} height={size.height} />
          }
          style={{ data: { fill: ({ datum }) => datum.color }, labels: { fill: "white", fontWeight: "400" } }}
          cornerRadius={{ top: barWidth / 2 }}
          labels={({ datum }) => (datum.y === 0.7 ? 0 : datum.y)}
          labelComponent={<VictoryTooltip dy={-2} active flyoutHeight={20} flyoutWidth={20} style={{ fontWeight: "500" }} />}
        />
      )}
    </CView>
  );
}
