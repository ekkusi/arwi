import { useTranslation } from "react-i18next";
import { VictoryAxis, VictoryChart, VictoryLegend, VictoryLine } from "victory-native";
import { COLORS } from "../../theme";
import CText from "../primitives/CText";
import CView, { CViewProps } from "../primitives/CView";

export type DataType = {
  date: string;
  skills?: Maybe<number>;
  behaviour?: Maybe<number>;
};

// Group data by date
export function parseData(data: DataType[]): DataType[] {
  const groupedData: Record<string, { totalSkills: number; totalBehaviour: number; count: number }> = {};

  // Grouping data by date and calculating total skills and behaviour
  data.forEach(({ date, skills, behaviour }) => {
    if (!groupedData[date]) {
      groupedData[date] = { totalSkills: 0, totalBehaviour: 0, count: 0 };
    }

    if (skills != null) {
      groupedData[date].totalSkills += skills;
    }

    if (behaviour != null) {
      groupedData[date].totalBehaviour += behaviour;
    }

    groupedData[date].count += 1;
  });

  // Creating the final array, calculating averages
  return Object.entries(groupedData).map(([date, { totalSkills, totalBehaviour, count }]) => ({
    date,
    skills: count > 0 ? totalSkills / count : null,
    behaviour: count > 0 ? totalBehaviour / count : null,
  }));
}

export type LineChartBaseProps = CViewProps & {
  data: DataType[];
  minItems?: number;
};
export default function LineChartBase({ data, minItems = 2, ...rest }: LineChartBaseProps) {
  const { t } = useTranslation();

  const parsedData = parseData(data);

  const hasEnoughData = parsedData.length >= minItems;

  return (
    <CView {...rest} style={{ position: "relative", backgroundColor: "white", ...rest.style }}>
      <VictoryChart padding={{ top: 20, bottom: 50, left: 40, right: 60 }} domain={{ y: [3.5, 10.5] }}>
        <VictoryLine
          interpolation="natural"
          data={parsedData}
          x="date"
          y="skills"
          style={{ data: { stroke: hasEnoughData ? COLORS.primary : "transparent", strokeWidth: 5 } }}
        />
        <VictoryLine
          interpolation="natural"
          data={parsedData}
          x="date"
          y="behaviour"
          style={{ data: { stroke: hasEnoughData ? COLORS.secondary : "transparent", strokeWidth: 5 } }}
        />
        <VictoryAxis dependentAxis tickValues={[4, 5, 6, 7, 8, 9, 10]} />
        <VictoryAxis tickCount={2} />
        <VictoryLegend
          orientation="horizontal"
          gutter={20}
          symbolSpacer={10}
          x={100}
          y={225}
          data={[
            { name: t("components.lineChartBase.skills", "Taidot"), symbol: { fill: COLORS.primary } },
            { name: t("components.lineChartBase.behaviour", "Työskentely"), symbol: { fill: COLORS.secondary } },
          ]}
        />
      </VictoryChart>
      {!hasEnoughData && (
        <CView
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
        >
          <CText style={{ fontSize: "sm", width: "50%", textAlign: "center" }}>
            {t("components.lineChartBase.notEnoughData", "Kuvaajan näyttämiseen tarvitaan vähintään {{count}} arviointia eri päiviltä", {
              count: minItems,
            })}
          </CText>
        </CView>
      )}
    </CView>
  );
}
