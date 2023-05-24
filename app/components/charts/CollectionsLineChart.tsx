import { VictoryChart, VictoryLine } from "victory-native";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { CollectionsLineChart_EvaluationCollectionFragment } from "../../gql/graphql";
import { formatDate } from "../../helpers/dateHelpers";
import { analyzeEvaluations } from "../../helpers/evaluationUtils";
import { COLORS } from "../../theme";
import CText from "../primitives/CText";
import CView from "../primitives/CView";
import { DataType } from "./LineChartBase";

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

const mapData = (collections: CollectionsLineChart_EvaluationCollectionFragment[]) => {
  const data: DataType[] = [];
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
    });
  });
  return data;
};

type CollectionsChartProps = {
  collections: readonly FragmentType<typeof CollectionsLineChart_Collection_Fragment>[];
  minItems?: number;
};

export default function CollectionsLineChart({ collections: collectionFragments, minItems = 3 }: CollectionsChartProps) {
  const collections = getFragmentData(CollectionsLineChart_Collection_Fragment, collectionFragments);

  const sortedCollections = [...collections].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const data = mapData(sortedCollections);

  return (
    <CView style={{ position: "relative" }}>
      <VictoryChart>
        <VictoryLine data={data} x="date" y="skills" style={{ data: { stroke: COLORS.primary } }} />
        <VictoryLine data={data} x="date" y="behaviour" style={{ data: { stroke: COLORS.secondary } }} />
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
            Kuvaajan näyttämiseen tarvitaan vähintään 3 arviointia
          </CText>
        </CView>
      )}
    </CView>
  );
}
