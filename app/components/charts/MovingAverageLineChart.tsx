import { MinimalEnvironment } from "arwi-backend/src/types";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import LineChartBase, { DataType, LineChartBaseProps } from "./LineChartBase";
import CView, { CViewProps } from "../primitives/CView";
import InfoButton from "../ui/InfoButton";
import CText from "../primitives/CText";

export type EvaluationDataType = DataType & {
  environment: MinimalEnvironment;
};

const movingAverage = (data: EvaluationDataType[], bandWidth: number) => {
  const movingAverageData: EvaluationDataType[] = [];
  for (let i = 0; i < data.length; i += 1) {
    let currSumSkills = 0;
    let notNullSkillsCount = 0;
    let currSumBehaviour = 0;
    let notNullBehaviourCount = 0;
    const bandWidthLeft = i - bandWidth < 0 ? 0 : i - bandWidth;
    const bandWidthRight = i + bandWidth < data.length ? i + bandWidth : data.length - 1;
    for (let j = bandWidthLeft; j <= bandWidthRight; j += 1) {
      const currDataPoint = data[j];

      if (currDataPoint.skills) {
        currSumSkills += currDataPoint.skills;
        notNullSkillsCount += 1;
      }
      if (currDataPoint.behaviour) {
        currSumBehaviour += currDataPoint.behaviour;
        notNullBehaviourCount += 1;
      }
    }
    movingAverageData.push({
      date: data[i].date,
      environment: data[i].environment,
      skills: notNullSkillsCount && currSumSkills / notNullSkillsCount,
      behaviour: notNullBehaviourCount && currSumBehaviour / notNullBehaviourCount,
    });
  }
  return movingAverageData;
};

export type MovingAverageLineChartProps = Omit<LineChartBaseProps, "data" | "minItems"> & {
  data: EvaluationDataType[];
  bandWidth?: number;
  showInfo?: boolean;
  containerProps?: CViewProps;
};

export default function MovingAverageLineChart({ data, bandWidth = 2, containerProps, showInfo = true, ...rest }: MovingAverageLineChartProps) {
  const { t } = useTranslation();

  const movingAverageData = movingAverage(data, bandWidth);
  const minItems = bandWidth + 2; // At least bandWidth + 2 items are needed for the moving average to show other than straight line

  return (
    <CView {...containerProps}>
      {showInfo && (
        <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <CText>
            <CText style={{ fontSize: "sm", fontWeight: "500" }}>{movingAverageData.length} </CText>
            <CText style={{ fontSize: "sm", fontWeight: "300" }}>{t("evaluation", "arviointia", { count: movingAverageData.length })}</CText>
          </CText>
          <InfoButton
            onPress={() =>
              Alert.alert(
                t("moving-average", "Liukuva keskiarvo"),
                t(
                  "moving-average-info",
                  "Liukuva keskiarvo lasketaan jokaiselle havainnoille huomioiden {{moving_average_bandwidth}} edellistä ja {{moving_average_bandwidth}} seuraavaa havaintoa ajassa, ja laskemalla keskiarvo niiden yli. Tässä kuvaajassa esitetään liukuva keskiarvo oppilaan taidoille ja työskentelylle käyttäen kahta edellistä ja kahta seuraavaa havaintoa. Liukuvan keskiarvon avulla voidaan helposti seurata oppilaan keskimääräisen taitotason kehitystä.",
                  {
                    moving_average_bandwidth: bandWidth,
                  }
                )
              )
            }
          />
        </CView>
      )}
      <LineChartBase data={movingAverageData} minItems={minItems} {...rest} />
    </CView>
  );
}
