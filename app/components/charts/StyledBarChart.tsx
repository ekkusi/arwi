import { VictoryBar, VictoryTooltip, VictoryVoronoiContainer } from "victory-native";
import { useState } from "react";
import CView, { CViewProps } from "../primitives/CView";
import { COLORS } from "../../theme";

export type StyledBarChartDataType = {
  x: string;
  color: string;
  y: number;
};

type StyledBarChartProps = CViewProps & {
  data: StyledBarChartDataType[];
};

export default function StyledBarChart({ data, ...rest }: StyledBarChartProps) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null); // Crashes on ios if is set to width: 0 and height: 0 at start

  const barWidth = Math.min((size?.width || 0) / (data.length > 1 ? data.length : 2) - 1, 35);
  const noZeroData = data.map((obj) => {
    return { ...obj, y: obj.y === 0 ? 0.5 : obj.y };
  });
  const maxCount = Math.max(...data.map((obj) => obj.y));

  return (
    <CView
      style={{ flex: 1, width: "100%" }}
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
          maxDomain={{ y: maxCount > 3 ? maxCount : 3 }}
          containerComponent={
            <VictoryVoronoiContainer style={{ borderBottomColor: COLORS.darkgray, borderBottomWidth: 1 }} width={size.width} height={size.height} />
          }
          style={{ data: { fill: ({ datum }) => datum.color, height: 50 }, labels: { fill: "white", fontWeight: "400" } }}
          cornerRadius={{ top: barWidth / 2 }}
          labels={({ datum }) => (datum.y === 0.5 ? 0 : datum.y)}
          labelComponent={<VictoryTooltip dy={-2} active flyoutHeight={20} flyoutWidth={20} style={{ fontWeight: "500" }} renderInPortal={false} />}
        />
      )}
    </CView>
  );
}
