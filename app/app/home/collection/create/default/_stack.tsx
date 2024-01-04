import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DefaultCollectionGeneralInfoView from ".";
import CButton from "../../../../../components/primitives/CButton";
import CView from "../../../../../components/primitives/CView";
import { COLORS } from "../../../../../theme";
import { defaultHeaderStyles } from "../../../../config";
import { HomeStackParams } from "../../../types";
import { DefaultCollectionCreationProvider } from "./DefaultCollectionCreationProvider";
import DefaultCollectionEvaluationsView from "./evaluations";
import DefaultCollectionParticipationsView from "./participations";
import { DefaultCollectionCreationStackParams } from "./types";

const { Navigator, Screen } = createNativeStackNavigator<DefaultCollectionCreationStackParams>();

export default function DefaultCollectionCreationStack({ route, navigation }: NativeStackScreenProps<HomeStackParams, "default-collection-create">) {
  const { t } = useTranslation();
  return (
    <DefaultCollectionCreationProvider groupId={route.params.groupId} collectionType={route.params.collectionType}>
      <Navigator
        initialRouteName="default-collection-create-general-info"
        screenOptions={() => ({
          ...defaultHeaderStyles,
          animation: "slide_from_right",
          title: t("new-evaluation", "Uusi arviointi"),
          headerLeft: () => <CView />,
          headerRight: () => (
            <CButton
              variant="empty"
              onPress={() => {
                Alert.alert("", t("CollectionCreationStack.cancelPopupMessage", "Oletko varma, että haluat perua arvioinnin luonnin?"), [
                  {
                    text: t("no", "Ei"),
                    onPress: () => null,
                    style: "cancel",
                  },
                  { text: t("yes", "Kyllä"), onPress: () => navigation.navigate("home") },
                ]);
              }}
              leftIcon={<MaterialCommunityIcon name="close" size={30} color={COLORS.white} />}
            />
          ),
        })}
      >
        <Screen name="default-collection-create-general-info" component={DefaultCollectionGeneralInfoView} />
        <Screen name="default-collection-create-participations" component={DefaultCollectionParticipationsView} />
        <Screen name="default-collection-create-evaluations" component={DefaultCollectionEvaluationsView} />
      </Navigator>
    </DefaultCollectionCreationProvider>
  );
}
