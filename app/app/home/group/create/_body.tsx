import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import CButton from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { COLORS } from "../../../../theme";
import { GroupCreationStackParams } from "./types";
import PopUpDialog from "../../../../components/PopUpDialog";

export default function GroupCreationBody({
  navigation,
  children,
}: {
  navigation: NativeStackNavigationProp<GroupCreationStackParams, "name" | "students" | "subject", "main-tab-bar">;
  children: JSX.Element;
}) {
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CView />,
      headerRight: () => (
        <CButton
          variant="empty"
          onPress={() => {
            setModalVisible(true);
          }}
          leftIcon={<MaterialCommunityIcon name="close" size={35} color={COLORS.white} />}
        />
      ),
    });
  }, [navigation]);

  return (
    <CView style={{ flex: 1, backgroundColor: "white" }}>
      {children}
      {modalVisible && (
        <PopUpDialog
          message={t("GroupCreationStack.cancelPopUpMessage", "Oletko varma, että haluat perua ryhmän luonnin?")}
          onAccept={() => navigation.getParent("main-tab-bar")?.navigate("index")}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </CView>
  );
}
