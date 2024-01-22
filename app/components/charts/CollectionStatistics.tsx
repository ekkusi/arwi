import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MinimalModuleInfo } from "arwi-backend/src/types";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { CollectionStatistics_EvaluationCollectionFragment } from "../../gql/graphql";
import { formatDate } from "../../helpers/dateHelpers";
import { analyzeEvaluationsSimple } from "../../helpers/evaluationUtils";
import CircledNumber from "../CircledNumber";
import CText from "../primitives/CText";
import CView from "../primitives/CView";
import { LineChartBaseProps } from "./LineChartBase";
import MovingAverageLineChart, { EvaluationDataType } from "./MovingAverageLineChart";
import StatisticsFilterMenu from "./StatisticsFilterMenu";

const CollectionStatistics_Collection_Fragment = graphql(`
  fragment CollectionStatistics_EvaluationCollection on ClassParticipationCollection {
    id
    date
    environment {
      label {
        fi
      }
      code
    }
    evaluations {
      skillsRating
      behaviourRating
      wasPresent
    }
  }
`);

const mapData = (collections: CollectionStatistics_EvaluationCollectionFragment[]) => {
  const data: EvaluationDataType[] = [];
  let currentSkillsSum = 0;
  let notNullSkillsCount = 0;
  let currentBehaviourSum = 0;
  let notNullBehaviourCount = 0;
  collections.forEach((it) => {
    const { skillsAverage, behaviourAverage } = analyzeEvaluationsSimple(it.evaluations);
    if (skillsAverage > 0) {
      notNullSkillsCount += 1;
      currentSkillsSum += skillsAverage;
    }
    if (behaviourAverage > 0) {
      notNullBehaviourCount += 1;
      currentBehaviourSum += behaviourAverage;
    }
    data.push({
      date: formatDate(it.date),
      skills: skillsAverage > 0 ? Math.round((currentSkillsSum / notNullSkillsCount) * 100) / 100 : null,
      behaviour: behaviourAverage > 0 ? Math.round((currentBehaviourSum / notNullBehaviourCount) * 100) / 100 : null,
      environment: it.environment,
    });
  });
  return data;
};

type CollectionsChartProps = Omit<LineChartBaseProps, "data"> & {
  title?: string;
  subjectCode: string;
  moduleInfo: MinimalModuleInfo;
  collections: readonly FragmentType<typeof CollectionStatistics_Collection_Fragment>[];
};

export default function CollectionStatistics({ title, subjectCode, moduleInfo, collections: collectionFragments, ...rest }: CollectionsChartProps) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const collections = getFragmentData(CollectionStatistics_Collection_Fragment, collectionFragments);

  const sortedCollections = useMemo(() => [...collections].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()), [collections]);
  const evaluationData = useMemo(() => mapData(sortedCollections), [sortedCollections]);

  const filteredData = filter ? evaluationData.filter((coll) => coll.environment.code === filter) : evaluationData;

  const evaluationsWithSkills = useMemo(
    () => filteredData.filter((obj) => !!obj.skills) as WithRequiredNonNull<EvaluationDataType, "skills">[],
    [filteredData]
  );
  const skillsMean = useMemo(
    () => evaluationsWithSkills.reduce((prev, evaluation) => prev + evaluation.skills, 0) / evaluationsWithSkills.length,
    [evaluationsWithSkills]
  );

  const evaluationsWithBehaviour = useMemo(
    () => filteredData.filter((obj) => !!obj.behaviour) as WithRequiredNonNull<EvaluationDataType, "behaviour">[],
    [filteredData]
  );
  const behaviourMean = useMemo(
    () => evaluationsWithBehaviour.reduce((prev, evaluation) => prev + evaluation.behaviour, 0) / evaluationsWithBehaviour.length,
    [evaluationsWithBehaviour]
  );
  return (
    <CView style={{ gap: 10 }}>
      {title && <CText style={{ fontSize: "title", fontWeight: "500" }}>{title}</CText>}
      <StatisticsFilterMenu
        subjectCode={subjectCode}
        moduleInfo={moduleInfo}
        title={t("group.evaluations-over-time", "Arviointien keskiarvojen kehitys")}
        filter={filter}
        setFilter={(newFilter) => setFilter(newFilter)}
      />
      <MovingAverageLineChart data={filteredData} {...rest} />
      <CView style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <CircledNumber value={skillsMean} title={t("group.skills-mean", "Taitojen keskiarvo")} />
        <CircledNumber value={behaviourMean} title={t("group.behaviour-mean", "Työskentelyn keskiarvo")} />
      </CView>
    </CView>
  );
}
