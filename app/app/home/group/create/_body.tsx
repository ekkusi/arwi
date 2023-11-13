import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import CButton from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { COLORS } from "../../../../theme";
import { GroupCreationStackParams } from "./types";
import Layout from "../../../../components/Layout";

export default function GroupCreationBody({
  navigation,
  children,
}: {
  navigation: NativeStackNavigationProp<
    GroupCreationStackParams,
    "group-create-general-info" | "group-create-students" | "group-create-subject",
    "home-stack"
  >;
  children: JSX.Element;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CView />,
      headerRight: () => (
        <CButton
          variant="empty"
          onPress={() => {
            Alert.alert("", t("GroupCreationStack.cancelPopUpMessage", "Oletko varma, että haluat perua ryhmän luonnin?"), [
              {
                text: t("no", "Ei"),
                onPress: () => null,
                style: "cancel",
              },
              { text: t("yes", "Kyllä"), onPress: () => navigation.getParent("home-stack")?.navigate("home") },
            ]);
          }}
          leftIcon={<MaterialCommunityIcon name="close" size={30} color={COLORS.white} />}
        />
      ),
    });
  }, [navigation, t]);

  return <Layout style={{ backgroundColor: "white" }}>{children}</Layout>;
}
