import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import CButton from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { COLORS } from "../../../../theme";
import { GroupCreationStackParams } from "./types";

export default function GroupCreationBody({
  navigation,
  children,
}: {
  navigation: NativeStackNavigationProp<GroupCreationStackParams, "name" | "students" | "subject", "main-tab-bar">;
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
              { text: t("yes", "Kyllä"), onPress: () => navigation.getParent("main-tab-bar")?.navigate("index") },
            ]);
          }}
          leftIcon={<MaterialCommunityIcon name="close" size={30} color={COLORS.white} />}
        />
      ),
    });
  }, [navigation, t]);

  return <CView style={{ flex: 1, backgroundColor: "white" }}>{children}</CView>;
}
