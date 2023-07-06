import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CTextInput from "../../../../components/primitives/CTextInput";
import CView from "../../../../components/primitives/CView";
import ProgressBar from "../../../../components/ProgressBar";
import { graphql } from "../../../../gql";
import { COLORS } from "../../../../theme";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";

const CreateGroupPage_CreateGroup_Mutation = graphql(`
  mutation CreateGroupPage_CreateGroup($input: CreateGroupInput!) {
    createGroup(data: $input) {
      id
      name
    }
  }
`);

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
export default function GroupStudentsSelectionView({ navigation }: NativeStackScreenProps<GroupCreationStackParams, "students">) {
  const [newStudent, setNewStudent] = useState<string>("");

  // const [createGroup] = useMutation(CreateGroupPage_CreateGroup_Mutation);

  const { group, setGroup } = useGroupCreationContext();

  // const handleSubmit = async (values: GroupMinimal) => {
  //  try {
  //    const { data } = await createGroup({ variables: { input: { name: values.name, yearCode: values.class, subjectCode: values.subject?.code, students: values.students,  } } });
  //    const accessToken = data?.register?.accessToken;
  //    if (!accessToken) throw new Error("Unexpected error"); // Should get caught before this
  //    setToken(accessToken);
  //    router.push("/");
  //  } catch (error) {
  //    const msg = getErrorMessage(error);
  //    setGeneralError(msg);
  //  }
  // };

  const removeStudent = (studentToRemove: string) => {
    const filteredStudents = group.students.filter((student) => student !== studentToRemove);
    setGroup({ ...group, students: filteredStudents });
  };

  const addStudent = (student: string) => {
    setGroup({ ...group, students: [...group.students, student] });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <CView style={{ flex: 1, padding: 15, backgroundColor: "white", justifyContent: "space-between" }}>
        <CView style={{ height: 300, justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <CView style={{ height: 240, gap: 10, width: "100%" }}>
            <CText style={{ fontSize: "title", fontWeight: "300" }}>Oppilaat</CText>
            <FlatList
              data={group.students}
              renderItem={({ item }: { item: string }) => renderStudentItem(item, removeStudent)}
              keyExtractor={(_, index) => index.toString()}
              numColumns={1}
            />
            <CView style={{ height: 60, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <CView style={{ flex: 5 }}>
                <CTextInput
                  placeholder="Uusi oppilas"
                  value={newStudent}
                  onChange={(event) => {
                    setNewStudent(event.nativeEvent.text);
                  }}
                  autoFocus
                  onSubmitEditing={(_) => {
                    if (newStudent.length > 0) {
                      addStudent(newStudent);
                      setNewStudent("");
                    }
                  }}
                />
              </CView>
              <CButton
                style={{ flex: 1, position: "absolute", right: 0, height: 48, width: 48, paddingHorizontal: 0 }}
                disabled={newStudent.length === 0}
                onPress={() => {
                  if (newStudent.length > 0) addStudent(newStudent);
                  setNewStudent("");
                }}
              >
                <MaterialCommunityIcon size={25} name="plus" color={COLORS.white} />
              </CButton>
            </CView>
          </CView>
        </CView>
        <CView style={{ flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
          <CButton style={{}} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
          </CButton>
          <CButton title="Luo ryhmä" style={{}} onPress={() => navigation.push("subject")}>
            <MaterialCommunityIcon name="check" size={25} color={COLORS.white} />
          </CButton>
        </CView>
      </CView>
      <ProgressBar style={{ position: "absolute", bottom: 0 }} color={COLORS.primary} progress={3 / 3} />
    </KeyboardAvoidingView>
  );
}
