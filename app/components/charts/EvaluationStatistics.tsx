import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MinimalModuleInfo } from "arwi-backend/src/types";
import CircledNumber from "../ui/CircledNumber";
import CText from "../primitives/CText";
import CView from "../primitives/CView";
import MovingAverageLineChart, { EvaluationDataType, MovingAverageLineChartProps } from "./MovingAverageLineChart";
import StatisticsFilterMenu from "./StatisticsFilterMenu";
import { formatDate } from "../../helpers/dateHelpers";
import { FragmentOf, ResultOf, graphql, readFragment } from "@/graphql";

export const EvaluationStatistics_Evaluation_Fragment = graphql(`
  fragment EvaluationStatistics_Evaluation on ClassParticipationEvaluation {
    id
    skillsRating
    behaviourRating
    wasPresent
    collection {
      date
      environment {
        label {
          fi
        }
        code
        color
      }
    }
  }
`);

export const mapEvaluationData = (evaluations: ResultOf<typeof EvaluationStatistics_Evaluation_Fragment>[]) => {
  const data: EvaluationDataType[] = [];
  evaluations.forEach((ev) => {
    const skillsRating = ev.skillsRating && ev.skillsRating;
    const behaviourRating = ev.behaviourRating && ev.behaviourRating;
    if (skillsRating && behaviourRating) {
      data.push({
        date: formatDate(ev.collection.date),
        environment: ev.collection.environment,
        skills: skillsRating,
        behaviour: behaviourRating,
      });
    }
  });
  return data;
};

type EvaluationStatisticsProps = Omit<MovingAverageLineChartProps, "data"> & {
  title?: string;
  subjectCode: string;
  moduleInfo: MinimalModuleInfo;
  evaluations: readonly FragmentOf<typeof EvaluationStatistics_Evaluation_Fragment>[];
  showAvgThreshhold?: number;
};

export default function EvaluationsStatistics({
  title,
  subjectCode,
  moduleInfo,
  evaluations: evaluationFragments,
  bandWidth = 2,
  ...rest
}: EvaluationStatisticsProps) {
  const { t } = useTranslation();

  const [filter, setFilter] = useState<string | undefined>(undefined);

  const evaluations = readFragment(EvaluationStatistics_Evaluation_Fragment, evaluationFragments);

  const sortedEvaluations = [...evaluations]
    .sort((a, b) => new Date(a.collection.date).getTime() - new Date(b.collection.date).getTime())
    .filter((it) => it.wasPresent);

  // Start pushing item to data array after the avg threshhold is reached (to avoid showing data that is not yet balanced)
  // If there are less than minItems, start pushing items from beginning
  const data = mapEvaluationData(sortedEvaluations);

  const filteredData = filter !== undefined ? data.filter((obj) => obj.environment.code === filter) : data;

  const evaluationsWithSkills = useMemo(() => filteredData.filter((obj) => obj.skills !== undefined), [filteredData]);
  const skillsMean = useMemo(
    () =>
      evaluationsWithSkills.reduce((prev, evaluation) => prev + (evaluation.skills || 0), 0) / evaluationsWithSkills.filter((ev) => ev.skills).length,
    [evaluationsWithSkills]
  );

  const evaluationsWithBehaviour = useMemo(() => filteredData.filter((obj) => obj.behaviour !== undefined), [filteredData]);
  const behaviourMean = useMemo(
    () =>
      evaluationsWithBehaviour.reduce((prev, evaluation) => prev + (evaluation.behaviour || 0), 0) /
      evaluationsWithBehaviour.filter((ev) => ev.behaviour).length,
    [evaluationsWithBehaviour]
  );

  return (
    <CView style={{ gap: 10 }}>
      {title && <CText style={{ fontSize: "title", fontWeight: "500" }}>{title}</CText>}
      <StatisticsFilterMenu
        subjectCode={subjectCode}
        moduleInfo={moduleInfo}
        title={t("group.evaluations-over-time", "Arvointien keskiarvojen kehitys")}
        filter={filter}
        setFilter={(newFilter) => setFilter(newFilter)}
      />
      <MovingAverageLineChart data={filteredData} bandWidth={bandWidth} {...rest} />
      <CView style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <CircledNumber value={skillsMean} title={t("skills-mean", "Taitojen keskiarvo")} />
        <CircledNumber value={behaviourMean} title={t("behaviour-mean", "Työskentelyn keskiarvo")} />
      </CView>
    </CView>
  );
}
