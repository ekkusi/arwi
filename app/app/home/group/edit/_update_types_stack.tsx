import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { defaultHeaderStyles } from "../../../config";
import { UpdateTypesStackParams } from "./update_type_stack_types";
import EditTypeWeightsView from "./edit-collection-type-weights";
import EditTypesView from "./edit-collection-types";
import { graphql } from "../../../../gql";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import { UpdateTypesProvider } from "./UpdateTypesProvider";

const UpdateTypesProvider_GetGroup_Query = graphql(`
  query UpdateTypesProvider_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      collectionTypes {
        id
        category
        name
        weight
        defaultTypeCollection {
          id
        }
      }
    }
  }
`);

const { Navigator, Screen } = createNativeStackNavigator<UpdateTypesStackParams>();

export default function UpdateTypesStack({ groupId }: { groupId: string }) {
  const { t } = useTranslation();

  const { data, loading } = useQuery(UpdateTypesProvider_GetGroup_Query, {
    variables: { groupId },
  });

  if (loading || !data) return <LoadingIndicator />;

  return (
    <UpdateTypesProvider initialTypes={data.getGroup.collectionTypes}>
      <Navigator
        initialRouteName="group-edit-collection-types"
        screenOptions={() => ({
          animationTypeForReplace: "push",
          title: t("edit-evaluation-types", "Muokkaa arviointisisältöjä"),
          animation: "slide_from_right",
          ...defaultHeaderStyles,
        })}
      >
        <Screen name="group-edit-collection-types" component={EditTypesView} />
        <Screen name="group-edit-collection-types-weights" component={EditTypeWeightsView} />
      </Navigator>
    </UpdateTypesProvider>
  );
}
