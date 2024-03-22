import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { defaultHeaderStyles } from "../../../config";
import { UpdateTypesStackParams } from "./update_type_stack_types";
import EditTypeWeightsView from "./edit-collection-type-weights";
import EditTypesView from "./edit-collection-types";
import { graphql } from "@/graphql";
import LoadingIndicator from "../../../../components/ui/LoadingIndicator";
import { UpdateTypesProvider } from "./UpdateTypesProvider";
import { HomeStackParams } from "../../types";

const UpdateTypesProvider_GetGroup_Query = graphql(`
  query UpdateTypesProvider_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      currentModule {
        collectionTypes {
          id
          category
          name
          weight
        }
      }
    }
  }
`);

const { Navigator, Screen } = createNativeStackNavigator<UpdateTypesStackParams>();

export default function UpdateTypesStack({ route }: NativeStackScreenProps<HomeStackParams, "edit-evaluation-types">) {
  const { t } = useTranslation();
  const { groupId, onlyWeights } = route.params;

  const { data, loading } = useQuery(UpdateTypesProvider_GetGroup_Query, {
    variables: { groupId },
  });

  if (loading || !data) return <LoadingIndicator />;

  const initialRouteName = onlyWeights ? "group-edit-collection-types-weights" : "group-edit-collection-types";

  return (
    <UpdateTypesProvider initialTypes={data.getGroup.currentModule.collectionTypes}>
      <Navigator
        initialRouteName={initialRouteName}
        screenOptions={() => ({
          animationTypeForReplace: "push",
          title: t("edit-evaluation-types", "Muokkaa arviointisisältöjä"),
          animation: "slide_from_right",
          ...defaultHeaderStyles,
        })}
      >
        <Screen
          name="group-edit-collection-types"
          component={EditTypesView}
          initialParams={{ groupId: data.getGroup.id, originalTypes: data.getGroup.currentModule.collectionTypes }}
        />
        <Screen
          name="group-edit-collection-types-weights"
          component={EditTypeWeightsView}
          initialParams={{ groupId: data.getGroup.id, hideBackButton: onlyWeights, originalTypes: data.getGroup.currentModule.collectionTypes }}
        />
      </Navigator>
    </UpdateTypesProvider>
  );
}
