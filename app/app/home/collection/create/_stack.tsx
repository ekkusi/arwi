import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import CollectionGeneralInfoView from ".";
import { defaultHeaderStyles } from "../../../config";
import { HomeStackParams } from "../../types";
import { CollectionCreationProvider, useCollectionCreationContext } from "./CollectionCreationProvider";
import CollectionEvaluationsView from "./evaluations";
import CollectionParticipationsView from "./participations";
import { CollectionCreationStackParams } from "./types";

const { Navigator, Screen } = createNativeStackNavigator<CollectionCreationStackParams>();

export default function CollectionCreationStack({ route }: NativeStackScreenProps<HomeStackParams, "collection-create">) {
  const { t } = useTranslation();
  return (
    <CollectionCreationProvider groupId={route.params.groupId}>
      <Navigator
        initialRouteName="index"
        screenOptions={() => ({
          animationTypeForReplace: "push",
          title: t("CollectionCreationStack.newCollection", "Uusi arviointi"),
          animation: "slide_from_right",
          ...defaultHeaderStyles,
        })}
      >
        <Screen name="index" component={CollectionGeneralInfoView} />
        <Screen name="participations" component={CollectionParticipationsView} />
        <Screen name="evaluations" component={CollectionEvaluationsView} />
      </Navigator>
    </CollectionCreationProvider>
  );
}
