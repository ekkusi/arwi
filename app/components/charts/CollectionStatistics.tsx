import { getEnvironments } from "arwi-backend/src/utils/subjectUtils";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { CollectionsLineChart_EvaluationCollectionFragment, EvaluationsLineChart_EvaluationFragment } from "../../gql/graphql";
import { formatDate } from "../../helpers/dateHelpers";
import { analyzeEvaluations } from "../../helpers/evaluationUtils";
import { COLORS } from "../../theme";
import CircledNumber from "../CircledNumber";
import CButton from "../primitives/CButton";
import CText from "../primitives/CText";
import CView from "../primitives/CView";
import LineChartBase, { DataType, LineChartBaseProps } from "./LineChartBase";
import StatisticsFilterMenu from "./StatisticsFilterMenu";

const CollectionsLineChart_Collection_Fragment = graphql(`
  fragment CollectionsLineChart_EvaluationCollection on EvaluationCollection {
    id
    date
    environment {
      label
      code
    }
    evaluations {
      skillsRating
      behaviourRating
      wasPresent
      isStellar
    }
  }
`);

type CollectionDataType = DataType & {
  environment: string;
};

const mapData = (collections: CollectionsLineChart_EvaluationCollectionFragment[]) => {
  const data: CollectionDataType[] = [];
  let currentSkillsSum = 0;
  let notNullSkillsCount = 0;
  let currentBehaviourSum = 0;
  let notNullBehaviourCount = 0;
  collections.forEach((it) => {
    const { skillsAverage, behaviourAverage } = analyzeEvaluations(it.evaluations);
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
      environment: it.environment.label,
    });
  });
  return data;
};

type CollectionsChartProps = Omit<LineChartBaseProps, "data"> & {
  title?: string;
  subjectCode: string;
  collections: readonly FragmentType<typeof CollectionsLineChart_Collection_Fragment>[];
};

export default function CollectionStatistics({ title, subjectCode, collections: collectionFragments, ...rest }: CollectionsChartProps) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const collections = getFragmentData(CollectionsLineChart_Collection_Fragment, collectionFragments);

  const sortedCollections = useMemo(() => [...collections].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()), [collections]);
  const evaluationData = useMemo(() => mapData(sortedCollections), [sortedCollections]);

  const filteredData = filter ? evaluationData.filter((coll) => coll.environment === filter) : evaluationData;

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
      <LineChartBase data={filteredData} />
      <CView style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <CircledNumber value={skillsMean} title={t("group.skills-mean", "Taitojen keskiarvo")} />
        <CircledNumber value={behaviourMean} title={t("group.behaviour-mean", "Työskentelyn keskiarvo")} />
      </CView>
    </CView>
  );
}
