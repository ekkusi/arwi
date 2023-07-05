import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../../../../components/primitives/CButton";
import CText from "../../../../../components/primitives/CText";
import CTextInput from "../../../../../components/primitives/CTextInput";
import CView from "../../../../../components/primitives/CView";
import { COLORS } from "../../../../../theme";

const renderStudentItem = (item: string, removeStudent: (student: string) => void) => (
  <CView
    style={{
      borderBottomWidth: 1,
      borderBottomColor: "lightgray",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 35,
    }}
  >
    <CText style={{ fontSize: "md", fontWeight: "300", color: "darkgray" }}>{item}</CText>
    <TouchableOpacity
      style={{ height: 30, alignItems: "center", justifyContent: "center" }}
      onPress={() => {
        removeStudent(item);
      }}
    >
      <MaterialCommunityIcon size={20} name="trash-can-outline" color={COLORS.darkgray} />
    </TouchableOpacity>
  </CView>
);
export default function GroupSubjectSelectionView() {
  const router = useRouter();
  const [students, setStudents] = useState<string[]>(["Pekka", "Ukko"]);
  const [newStudent, setNewStudent] = useState<string>("");

  const removeStudent = (studentToRemove: string) => {
    const filteredStudents = students.filter((student) => student !== studentToRemove);
    setStudents(filteredStudents);
  };

  return (
    <CView style={{ flex: 1, padding: 15, justifyContent: "center", gap: 30, backgroundColor: "white" }}>
      <CView style={{ flex: 6, justifyContent: "center", alignItems: "center", width: "100%" }}>
        <CView style={{ height: 250, gap: 10, width: "100%" }}>
          <CText style={{ fontSize: "title", fontWeight: "300" }}>Oppilaat</CText>
          <FlatList
            data={students}
            renderItem={({ item }: { item: string }) => renderStudentItem(item, removeStudent)}
            keyExtractor={(_, index) => index.toString()}
            numColumns={1}
          />
        </CView>
        <CView style={{ height: 60, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <CView style={{ flex: 5 }}>
            <CTextInput
              placeholder="Uusi oppilas"
              value={newStudent}
              onChange={(event) => {
                setNewStudent(event.nativeEvent.text);
              }}
            />
          </CView>
          <CButton
            style={{ flex: 1, position: "absolute", right: 0, height: 48, width: 48, paddingHorizontal: 0 }}
            disabled={newStudent.length > 0}
            onPress={() => {
              if (newStudent.length > 0) setStudents([...students, newStudent]);
              setNewStudent("");
            }}
          >
            <MaterialCommunityIcon size={25} name="plus" color={COLORS.white} />
          </CButton>
        </CView>
      </CView>
      <CView style={{ flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
        <CButton style={{}} onPress={() => router.back()}>
          <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
        </CButton>
        <CButton title="Luo ryhmä" style={{}} onPress={() => router.push("/group/create/subject")}>
          <MaterialCommunityIcon name="check" size={25} color={COLORS.white} />
        </CButton>
      </CView>
    </CView>
  );
}
