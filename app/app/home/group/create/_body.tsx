import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import CButton from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { COLORS } from "../../../../theme";
import { GroupCreationStackParams } from "./types";
import Layout from "../../../../components/Layout";
import ProgressBar from "../../../../components/ProgressBar";
import { CViewStyle } from "../../../../theme/types";

export default function GroupCreationBody({
  navigation,
  progressState,
  style,
  children,
}: {
  navigation: NativeStackNavigationProp<
    GroupCreationStackParams,
    | "group-create-general-info"
    | "group-create-students"
    | "group-create-subject"
    | "group-create-collection-types"
    | "group-create-collection-type-weights",
    "home-stack"
  >;
  progressState: number;
  style?: CViewStyle;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  const backAction = useCallback(() => {
    Alert.alert("", t("GroupCreationStack.cancelPopUpMessage", "Oletko varma, että haluat perua ryhmän luonnin?"), [
      {
        text: t("Dialog.no", "Ei"),
        onPress: () => null,
        style: "cancel",
      },
      { text: t("Dialog.yes", "Kyllä"), onPress: () => navigation.getParent("home-stack")?.navigate("home") },
    ]);
    return true;
  }, [navigation, t]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CView />,
      headerRight: () => (
        <CButton variant="empty" onPress={backAction} leftIcon={<MaterialCommunityIcon name="close" size={30} color={COLORS.white} />} />
      ),
    });
  }, [backAction, navigation, t]);

  return (
    <Layout style={{ backgroundColor: "white", ...style }}>
      {children}

      <ProgressBar color={COLORS.primary} progress={progressState / 4} style={{ position: "absolute", bottom: 0 }} />
    </Layout>
  );
}
