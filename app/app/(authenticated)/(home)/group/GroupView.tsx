import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import CollectionsLineChart from "../../../../components/charts/CollectionsLineChart";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import CText from "../../../../components/primitives/CText";
import CView from "../../../../components/primitives/CView";
import { graphql } from "../../../../gql";
import { FONT_SIZES } from "../../../../theme";
import { HomeStackParamList } from "../types";

type GroupViewProps = NativeStackScreenProps<HomeStackParamList, "GroupView">;

const GroupOverviewPage_GetGroup_Query = graphql(`
  query GroupOverviewPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      name
      subject {
        label
        code
      }
      currentClassYear {
        info {
          code
          label
        }
        students {
          id
          name
        }
        evaluationCollections {
          ...CollectionsLineChart_EvaluationCollection
        }
      }
    }
  }
`);

const GroupOverviewPage_DeleteGroup_Mutation = graphql(`
  mutation GroupOverviewPage_DeleteGroup($groupId: ID!) {
    deleteGroup(groupId: $groupId)
  }
`);

export default function GroupView({ route }: GroupViewProps) {
  const { groupId } = route.params;

  const { data, loading } = useQuery(GroupOverviewPage_GetGroup_Query, {
    variables: {
      groupId,
    },
  });

  // useEffect(() => {
  //   // if (data) navigation.setOptions({ title: data.getGroup.name });
  // }, [data, navigation]);

  if (loading || !data) return <LoadingIndicator />;

  const { getGroup: group } = data;

  return (
    <CView>
      <CollectionsLineChart collections={group.currentClassYear.evaluationCollections} />
    </CView>
  );
}
