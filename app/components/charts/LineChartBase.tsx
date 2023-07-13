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

export type LineChartBaseProps = CViewProps & {
  data: DataType[];
  minItems?: number;
};
export default function LineChartBase({ data, minItems = 3, ...rest }: LineChartBaseProps) {
  const { t } = useTranslation();

  return (
    <CView {...rest} style={{ position: "relative", ...rest.style }}>
      <VictoryChart>
        <VictoryLine data={data} x="date" y="skills" style={{ data: { stroke: COLORS.primary } }} />
        <VictoryLine data={data} x="date" y="behaviour" style={{ data: { stroke: COLORS.secondary } }} />
        <VictoryAxis dependentAxis domain={{ y: [4, 10] }} />
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
      {data.length < minItems && (
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
          <CText style={{ fontSize: "lg", marginHorizontal: "2xl", textAlign: "center" }}>
            {t("components.lineChartBase.notEnoughData", "Kuvaajan näyttämiseen tarvitaan vähintään {{count}} arviointia", { count: minItems })}
          </CText>
        </CView>
      )}
    </CView>
  );
}
