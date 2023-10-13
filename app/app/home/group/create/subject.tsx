import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SubjectMinimal } from "arwi-backend/src/types/subject";
import { getSubjects } from "arwi-backend/src/utils/subjectUtils";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../../../components/primitives/CButton";
import CImage from "../../../../components/primitives/CImage";
import CText from "../../../../components/primitives/CText";
import CView from "../../../../components/primitives/CView";
import ProgressBar from "../../../../components/ProgressBar";
import { subjectToIcon } from "../../../../helpers/dataMappers";
import { COLORS } from "../../../../theme";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import GroupCreationBody from "./_body";

export default function GroupSubjectSelectionView({ navigation }: NativeStackScreenProps<GroupCreationStackParams, "group-create-subject">) {
  const { t } = useTranslation();
  const { group, setGroup } = useGroupCreationContext();

  const handlePress = (item: SubjectMinimal) => {
    setGroup({ ...group, subject: item });
  };

  const subjects = getSubjects();
  return (
    <GroupCreationBody navigation={navigation}>
      <CView style={{ flex: 1, marginTop: 20 }}>
        <CView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 30, backgroundColor: "white" }}>
          <CView style={{ flex: 10, width: "100%", paddingHorizontal: 15, gap: 10, justifyContent: "center" }}>
            <CText style={{ color: "darkgray", fontSize: "title" }}>{t("GroupSubjectSelectionView.selectSubject", "Valitse oppiaine")}</CText>
            <CView style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap: 1, width: "100%" }}>
              {subjects.map((item) => (
                <CButton
                  key={item.code}
                  title={item.label.fi}
                  variant="outline"
                  colorScheme={item.code === group.subject?.code ? "darkgray" : "lightgray"}
                  style={{ margin: 3, paddingHorizontal: "md", gap: "sm" }}
                  onPress={() => handlePress(item)}
                  textStyle={{ fontSize: "xs", fontWeight: "400", color: item.code === group.subject?.code ? "darkgray" : "gray" }}
                  leftIcon={
                    <CView style={{ width: 20, height: 20 }}>
                      <CImage
                        style={{
                          width: undefined,
                          height: undefined,
                          flex: 1,
                          resizeMode: "contain",
                          tintColor: item.code === group.subject?.code ? "black" : "darkgray",
                        }}
                        source={subjectToIcon(item)}
                      />
                    </CView>
                  }
                />
              ))}
            </CView>
            <CText style={{ color: "darkgray", fontSize: "sm", paddingHorizontal: 15 }}>
              {t(
                "GroupSubjectSelectionView.description",
                "Valitsemalla oppiaineen, saat juuri kyseiselle oppiaineelle personoidun arvostelunäkymän sekä oppiainetta vastaavan opetussuunnitelman automaattisesti arvioinnin tueksi."
              )}
            </CText>
          </CView>
          <CView style={{ flex: 2, justifyContent: "flex-end", width: "100%" }}>
            <CView
              style={{
                flex: 1,
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                padding: "xl",
              }}
            >
              <CButton disabled={group.subject === undefined} style={{}} onPress={() => navigation.navigate("group-create-general-info")}>
                <MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />
              </CButton>
            </CView>
            <ProgressBar color={COLORS.primary} progress={2 / 3} />
          </CView>
        </CView>
      </CView>
    </GroupCreationBody>
  );
}
