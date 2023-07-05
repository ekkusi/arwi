import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../../../../components/primitives/CButton";
import CText from "../../../../../components/primitives/CText";
import CTextInput from "../../../../../components/primitives/CTextInput";
import CView from "../../../../../components/primitives/CView";
import { COLORS } from "../../../../../theme";

const renderStudentItem = ({ item }: { item: string }) => (
  <CView>
    <CText style={{ fontSize: "md", fontWeight: "300", color: "darkgray" }}>{item}</CText>
  </CView>
);
export default function GroupSubjectSelectionView() {
  const router = useRouter();
  const students: string[] = ["Pekka", "Ukko"];
  return (
    <CView style={{ flex: 1, padding: 15, justifyContent: "center", gap: 30, backgroundColor: "white" }}>
      <CView style={{ height: 50 }}>
        <CText style={{ fontSize: "title" }}>Oppilaat</CText>
        <FlatList data={students} renderItem={renderStudentItem} keyExtractor={(_, index) => index.toString()} numColumns={1} />
      </CView>
      <CView style={{ height: 60, flexDirection: "row" }}>
        <CTextInput style={{ flex: 5 }} placeholder="Uusi oppilas" />
        <CButton style={{ flex: 1, position: "absolute", right: 20 }}>
          <MaterialCommunityIcon name="plus" color={COLORS.white} />
        </CButton>
      </CView>

      <CView style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
        <CButton style={{}} onPress={() => router.back()}>
          <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
        </CButton>
        <CButton title="Luo ryhmä" style={{}} onPress={() => router.push("/group/create/subject")}>
          <MaterialCommunityIcon name="check" color={COLORS.white} />
        </CButton>
      </CView>
    </CView>
  );
}
