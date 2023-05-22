import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { graphql } from "../../../gql";
import { FONT_SIZES } from "../../../theme";
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
          id
          date
          environment {
            label
          }
          learningObjectives {
            code
          }
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

export default function GroupView({ navigation, route }: GroupViewProps) {
  const { groupId } = route.params;

  const { data, loading } = useQuery(GroupOverviewPage_GetGroup_Query, {
    variables: {
      groupId,
    },
  });

  if (loading || !data) return <LoadingIndicator />;

  const { getGroup: group } = data;
  navigation.setOptions({ title: group.name });

  return (
    <CView style={{ alignItems: "center" }}>
      <CText style={{ fontSize: FONT_SIZES.title, fontWeight: "600" }}>{group.name}</CText>
      <CView style={{ width: "100%", aspectRatio: 1, alignItems: "center", justifyContent: "center" }}>
        <CText style={{ fontSize: FONT_SIZES.medium }}>Kuvaajan näyttämiseen tarvitaan vähintään 3 arviointia</CText>
      </CView>
    </CView>
  );
}
