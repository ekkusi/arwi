import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CTextInput from "../../../../components/primitives/CTextInput";
import CView from "../../../../components/primitives/CView";
import ProgressBar from "../../../../components/ProgressBar";
import { graphql } from "../../../../gql";
import { getErrorMessage } from "../../../../helpers/errorUtils";
import { useAuthenticatedUser } from "../../../../hooks-and-providers/AuthProvider";
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
  const user = useAuthenticatedUser();

  const [createGroup] = useMutation(CreateGroupPage_CreateGroup_Mutation);

  const { group, setGroup } = useGroupCreationContext();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSubmit = async () => {
    // TODO: Show loading indicator while creation is in progress
    try {
      if (!group.subject) throw new Error("Unexpected error"); // Should get caught before this
      if (!group.class) throw new Error("Unexpected error"); // Should get caught before this
      await createGroup({
        variables: {
          input: {
            name: group.name,
            yearCode: group.class.code,
            subjectCode: group.subject?.code,
            students: group.students.map((it) => ({ name: it })),
            teacherId: user.id, // TODO: Add correct teacher id
          },
        },
        refetchQueries: ["MainPage_GetCurrentUser"],
      });

      navigation.getParent()?.navigate("index");
    } catch (error) {
      const msg = getErrorMessage(error);
      console.error(msg);
      // TODO: Show error in UI
    }
  };

  const removeStudent = (studentToRemove: string) => {
    const filteredStudents = group.students.filter((student) => student !== studentToRemove);
    setGroup({ ...group, students: filteredStudents });
  };

  const addStudent = (student: string) => {
    setGroup({ ...group, students: [...group.students, student] });
  };

  return (
    <CView style={{ flex: 1, backgroundColor: "white", justifyContent: "space-between" }}>
      <CView style={{ flex: 8, padding: 15, justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <CView style={{ flex: 1, gap: 20, width: "100%" }}>
          <CView style={{ flex: 6, gap: 10 }}>
            <CText style={{ fontSize: "title", fontWeight: "300" }}>Oppilaat</CText>
            <FlatList
              inverted
              data={[...group.students].reverse()}
              renderItem={({ item }: { item: string }) => renderStudentItem(item, removeStudent)}
              keyExtractor={(_, index) => index.toString()}
              numColumns={1}
              style={{ flexGrow: 1 }}
            />
          </CView>
          <CView style={{ flex: 3, width: "100%" }}>
            <CView style={{ height: 60, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <CView style={{ flex: 5 }}>
                <CTextInput
                  placeholder="Uusi oppilas"
                  value={newStudent}
                  onChange={(event) => {
                    setNewStudent(event.nativeEvent.text);
                  }}
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
      </CView>
      <CView style={{ flex: 2, justifyContent: "flex-end", gap: 20 }}>
        {!isKeyboardVisible && (
          <CView
            style={{
              flexGrow: 1,
              width: "100%",
              paddingHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <CButton style={{}} onPress={() => navigation.goBack()}>
              <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
            </CButton>
            <CButton title="Luo ryhmä" style={{}} onPress={() => handleSubmit()}>
              <MaterialCommunityIcon name="check" size={25} color={COLORS.white} />
            </CButton>
          </CView>
        )}
        <ProgressBar color={COLORS.primary} progress={3 / 3} />
      </CView>
    </CView>
  );
}
