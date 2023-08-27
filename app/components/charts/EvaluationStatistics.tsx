import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { FragmentType, getFragmentData } from "../../gql";
import CircledNumber from "../CircledNumber";
import InfoButton from "../InfoButton";
import CText from "../primitives/CText";
import CView from "../primitives/CView";
import { EvaluationsLineChart_Evaluation_Fragment, mapEvaluationData } from "./EvaluationsLineChart";
import { LineChartBaseProps } from "./LineChartBase";
import MovingAverageLineChart from "./MovingAverageLineChart";
import StatisticsFilterMenu from "./StatisticsFilterMenu";

type EvaluationsLineChartProps = Omit<LineChartBaseProps, "data"> & {
  title?: string;
  subjectCode: string;
  evaluations: readonly FragmentType<typeof EvaluationsLineChart_Evaluation_Fragment>[];
  showAvgThreshhold?: number;
};

export default function EvaluationsStatistics({
  title,
  subjectCode,
  evaluations: evaluationFragments,
  minItems = 2,
  ...rest
}: EvaluationsLineChartProps) {
  const { t } = useTranslation();

  const [filter, setFilter] = useState<string | undefined>(undefined);

  const evaluations = getFragmentData(EvaluationsLineChart_Evaluation_Fragment, evaluationFragments);

  const sortedEvaluations = [...evaluations]
    .sort((a, b) => new Date(a.collection.date).getTime() - new Date(b.collection.date).getTime())
    .filter((it) => it.wasPresent);

  // Start pushing item to data array after the avg threshhold is reached (to avoid showing data that is not yet balanced)
  // If there are less than minItems, start pushing items from beginning
  const data = mapEvaluationData(sortedEvaluations);

  const filteredData = filter ? data.filter((obj) => obj.environment.label === filter) : data;

  const evaluationsWithSkills = useMemo(() => filteredData.filter((obj) => obj.skills !== undefined), [filteredData]);
  const skillsMean = useMemo(
    () => evaluationsWithSkills.reduce((prev, evaluation) => prev + (evaluation.skills || 0), 0) / evaluationsWithSkills.length,
    [evaluationsWithSkills]
  );

  const evaluationsWithBehaviour = useMemo(() => filteredData.filter((obj) => obj.behaviour !== undefined), [filteredData]);
  const behaviourMean = useMemo(
    () => evaluationsWithBehaviour.reduce((prev, evaluation) => prev + (evaluation.behaviour || 0), 0) / evaluationsWithBehaviour.length,
    [evaluationsWithBehaviour]
  );

  return (
    <CView style={{ gap: 10 }}>
      {title && <CText style={{ fontSize: "title", fontWeight: "500" }}>{title}</CText>}
      <StatisticsFilterMenu
        subjectCode={subjectCode}
        title={t("group.evaluations-over-time", "Arvointien keskiarvojen kehitys")}
        filter={filter}
        setFilter={(newFilter) => setFilter(newFilter)}
      />
      <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <CText>
          <CText style={{ fontSize: "sm", fontWeight: "500" }}>{filteredData.length} </CText>
          <CText style={{ fontSize: "sm", fontWeight: "300" }}>{t("evaluation", "arviointia", { count: filteredData.length })}</CText>
        </CText>
        <InfoButton
          onPress={() =>
            Alert.alert(
              t("moving-average", "Liukuva keskiarvo"),
              t(
                "moving-average-info",
                "Liukuva keskiarvo lasketaan jokaiselle havainnoille huomioiden N edellistä ja N seuraavaa havaintoa ajassa, ja laskemalla keskiarvo niiden yli. Tässä kuvaajassa esitetään liukuva keskiarvo oppilaan taidoille ja työskentelylle käyttäen kahta edellistä ja kahta seuraavaa havaintoa. Arvioinnit on myös mahdollista suodattaa oppimisympäristön mukaan. Liukuvan keskiarvon avulla voidaan helposti seurata oppilaan keskimääräisen taitotason kehitystä."
              )
            )
          }
        />
      </CView>
      <MovingAverageLineChart data={filteredData} minItems={minItems} {...rest} />
      <CView style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <CircledNumber value={skillsMean} title={t("skills-mean", "Taitojen keskiarvo")} />
        <CircledNumber value={behaviourMean} title={t("behaviour-mean", "Työskentelyn keskiarvo")} />
      </CView>
    </CView>
  );
}
