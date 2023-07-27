import { VictoryAxis, VictoryBar, VictoryChart, VictoryTooltip, VictoryVoronoiContainer } from "victory-native";
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
  gradeAxis?: boolean;
  countAxis?: boolean;
  showToolTips?: boolean;
  showAxisLabels?: boolean;
};

export default function StyledBarChart({
  data,
  gradeAxis = false,
  countAxis = false,
  showAxisLabels = false,
  showToolTips = true,
  ...rest
}: StyledBarChartProps) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null); // Crashes on ios if is set to width: 0 and height: 0 at start

  const leftPadding = gradeAxis || countAxis ? 30 : 0;
  const barWidth = Math.min(((size?.width || 0) - leftPadding) / (data.length > 1 ? data.length : 2) - 1, 35);
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
        <VictoryChart
          {...size}
          domainPadding={{ x: [barWidth / 2, barWidth / 2] }}
          padding={{ left: leftPadding, right: 0, top: 50, bottom: 30 }}
          minDomain={gradeAxis ? { y: 4 } : {}}
        >
          <VictoryBar
            alignment="middle"
            data={noZeroData}
            width={gradeAxis || countAxis ? size.width - leftPadding : size.width}
            height={size.height}
            barWidth={barWidth}
            maxDomain={{ y: maxCount > 3 ? maxCount : 3 }}
            minDomain={gradeAxis ? { y: 4 } : {}}
            containerComponent={
              <VictoryVoronoiContainer style={{ borderBottomColor: COLORS.darkgray, borderBottomWidth: 1 }} width={size.width} height={size.height} />
            }
            style={{ data: { fill: ({ datum }) => datum.color, height: 50 }, labels: { fill: "white", fontWeight: "400" } }}
            cornerRadius={{ top: barWidth / 2 }}
            labels={({ datum }) => {
              const formattedDatum = Number.isInteger(datum.y) ? datum.y : datum.y.toFixed(1);
              return datum.y === 0.5 ? 0 : formattedDatum;
            }}
            labelComponent={
              showToolTips ? (
                <VictoryTooltip dy={-2} dx={0} active flyoutHeight={20} flyoutWidth={20} style={{ fontWeight: "500" }} renderInPortal={false} />
              ) : (
                <CView />
              )
            }
          />
          {gradeAxis && <VictoryAxis dependentAxis tickValues={[4, 5, 6, 7, 8, 9, 10]} />}
          {countAxis && <VictoryAxis dependentAxis tickFormat={(val) => (Number.isInteger(val) ? val.toFixed(0) : "")} />}
          {!gradeAxis && !countAxis && <VictoryAxis dependentAxis axisComponent={<CView />} tickFormat={() => ""} />}
          {!showAxisLabels ? <VictoryAxis tickFormat={() => ""} width={size.width - leftPadding} /> : <VictoryAxis offsetX={barWidth / 2} />}
        </VictoryChart>
      )}
    </CView>
  );
}
