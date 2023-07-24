import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CollectionGeneralInfoView from ".";
import CButton from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { COLORS } from "../../../../theme";
import { defaultHeaderStyles } from "../../../config";
import { HomeStackParams } from "../../types";
import { CollectionCreationProvider } from "./CollectionCreationProvider";
import CollectionEvaluationsView from "./evaluations";
import CollectionParticipationsView from "./participations";
import { CollectionCreationStackParams } from "./types";

const { Navigator, Screen } = createNativeStackNavigator<CollectionCreationStackParams>();

export default function CollectionCreationStack({ route, navigation }: NativeStackScreenProps<HomeStackParams, "collection-create">) {
  const { t } = useTranslation();
  return (
    <CollectionCreationProvider groupId={route.params.groupId}>
      <Navigator
        initialRouteName="index"
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
                  { text: t("yes", "Kyllä"), onPress: () => navigation.navigate("index") },
                ]);
              }}
              leftIcon={<MaterialCommunityIcon name="close" size={30} color={COLORS.white} />}
            />
          ),
        })}
      >
        <Screen name="index" component={CollectionGeneralInfoView} />
        <Screen name="participations" component={CollectionParticipationsView} />
        <Screen name="evaluations" component={CollectionEvaluationsView} />
      </Navigator>
    </CollectionCreationProvider>
  );
}
