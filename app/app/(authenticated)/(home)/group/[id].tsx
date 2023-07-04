import { useQuery } from "@apollo/client";
import { Stack, useLocalSearchParams } from "expo-router";
import CollectionsLineChart from "../../../../components/charts/CollectionsLineChart";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import CView from "../../../../components/primitives/CView";
import { graphql } from "../../../../gql";

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

export default function GroupView() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) throw new Error("No id found, incorrect route");

  const { data, loading } = useQuery(GroupOverviewPage_GetGroup_Query, {
    variables: {
      groupId: id,
    },
  });

  if (loading || !data) return <LoadingIndicator />;

  const { getGroup: group } = data;

  return (
    <>
      <Stack.Screen options={{ title: group.name }} />
      <CView>
        <CollectionsLineChart collections={group.currentClassYear.evaluationCollections} />
      </CView>
    </>
  );
}
