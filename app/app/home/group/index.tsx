import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import CollectionsLineChart from "../../../components/charts/CollectionsLineChart";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CView from "../../../components/primitives/CView";
import { graphql } from "../../../gql";
import { HomeStackParams } from "../types";

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

export default function GroupView({ route }: NativeStackScreenProps<HomeStackParams, "group">) {
  const id = route.params.groupId;
  if (!id) throw new Error("No id found, incorrect route");

  const { data, loading } = useQuery(GroupOverviewPage_GetGroup_Query, {
    variables: {
      groupId: id,
    },
  });

  if (loading || !data) return <LoadingIndicator />;

  const { getGroup: group } = data;

  return (
    <CView>
      <CollectionsLineChart collections={group.currentClassYear.evaluationCollections} />
    </CView>
  );
}
