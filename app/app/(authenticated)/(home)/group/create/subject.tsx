import { getSubjects, SubjectMinimal } from "arwi-backend/src/utils/subjectUtils";
import { useContext, useState } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView } from "react-native";
import CButton from "../../../../../components/primitives/CButton";
import CImage from "../../../../../components/primitives/CImage";
import CText from "../../../../../components/primitives/CText";
import CView from "../../../../../components/primitives/CView";
import { subjectToIcon } from "../../../../../helpers/dataMappers";
import { COLORS } from "../../../../../theme";
import { GroupCreationContext } from "./_layout";

export default function GroupSubjectSelectionView() {
  const router = useRouter();

  const { group, setGroup } = useContext(GroupCreationContext);

  const handlePress = (item: SubjectMinimal) => {
    setGroup({ ...group, subject: item });
  };

  const subjects = getSubjects();
  return (
    <CView style={{ flex: 1, padding: 15, alignItems: "center", justifyContent: "center", gap: 30, backgroundColor: "white" }}>
      <CView style={{ height: "80%", width: "100%", gap: 10 }}>
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
        <CText style={{ color: "darkgray", fontSize: "sm" }}>
          Valitsemalla oppiaineen, saat juuri kyseiselle oppiaineelle personoidun arvostelunäkymän sekä oppiainetta vastaavan opetussuunnitelman
          automaattisesti arvioinnin tueksi.
        </CText>
      </CView>
      <CView style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
        <CButton onPress={() => router.back()}>
          <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
        </CButton>
        <CButton onPress={() => router.push("/group/create/students")} disabled={group.subject === undefined}>
          <MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />
        </CButton>
      </CView>
    </CView>
  );
}
