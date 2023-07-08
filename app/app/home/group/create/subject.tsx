import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getSubjects, SubjectMinimal } from "arwi-backend/src/utils/subjectUtils";
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

export default function GroupSubjectSelectionView({ navigation }: NativeStackScreenProps<GroupCreationStackParams, "subject">) {
  const { group, setGroup } = useGroupCreationContext();

  const handlePress = (item: SubjectMinimal) => {
    setGroup({ ...group, subject: item });
  };

  const subjects = getSubjects();
  return (
    <CView style={{ flex: 1 }}>
      <CView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 30, backgroundColor: "white" }}>
        <CView style={{ flex: 10, width: "100%", paddingHorizontal: 15, gap: 10, justifyContent: "center" }}>
          <CText style={{ color: "darkgray", fontSize: "title" }}>Valitse oppiaine</CText>
          <CView style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap: 1, width: "100%" }}>
            {subjects.map((item) => (
              <CButton
                key={item.code}
                title={item.label}
                variant="outline"
                colorScheme={item.code === group.subject?.code ? "darkgray" : "lightgray"}
                style={{ margin: 3, paddingHorizontal: "md", gap: "sm" }}
                onPress={() => handlePress(item)}
                textStyle={{ fontSize: "sm2", fontWeight: "400", color: item.code === group.subject?.code ? "darkgray" : "gray" }}
              >
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
              </CButton>
            ))}
          </CView>
          <CText style={{ color: "darkgray", fontSize: "sm", paddingHorizontal: 15 }}>
            Valitsemalla oppiaineen, saat juuri kyseiselle oppiaineelle personoidun arvostelunäkymän sekä oppiainetta vastaavan opetussuunnitelman
            automaattisesti arvioinnin tueksi.
          </CText>
        </CView>
        <CView style={{ flex: 2, justifyContent: "flex-end", gap: 20, width: "100%" }}>
          <CView
            style={{ flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", paddingHorizontal: 20 }}
          >
            <CButton style={{}} onPress={() => navigation.goBack()}>
              <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
            </CButton>
            <CButton title="" style={{}} onPress={() => navigation.navigate("students")}>
              <MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />
            </CButton>
          </CView>
          <ProgressBar color={COLORS.primary} progress={2 / 3} />
        </CView>
      </CView>
    </CView>
  );
}
