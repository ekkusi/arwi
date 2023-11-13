import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Keyboard, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import TextFormField from "../../../../components/form/TextFormField";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CView from "../../../../components/primitives/CView";
import ProgressBar from "../../../../components/ProgressBar";
import { graphql } from "../../../../gql";
import { getErrorMessage } from "../../../../helpers/errorUtils";
import { useAuthenticatedUser } from "../../../../hooks-and-providers/AuthProvider";
import { useIsKeyboardVisible, useKeyboardListener } from "../../../../hooks-and-providers/keyboard";
import { COLORS } from "../../../../theme";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import GroupCreationBody from "./_body";
import CTouchableWithoutFeedback from "../../../../components/primitives/CTouchableWithoutFeedback";

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
    onStartShouldSetResponder={() => true}
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
export default function GroupStudentsSelectionView({ navigation }: NativeStackScreenProps<GroupCreationStackParams, "group-create-students">) {
  const { t } = useTranslation();
  const [newStudent, setNewStudent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const user = useAuthenticatedUser();

  const [createGroup] = useMutation(CreateGroupPage_CreateGroup_Mutation);

  const { group, setGroup } = useGroupCreationContext();

  const isKeyboardVisible = useIsKeyboardVisible();

  const onShowKeyboard = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useKeyboardListener({ onShow: onShowKeyboard });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!group.subject) throw new Error("Unexpected error"); // Should get caught before this
      if (!group.module) throw new Error("Unexpected error"); // Should get caught before this

      const allStudents = [...group.students, ...splitStudentString(newStudent)]; // Also add the student names still in the input

      await createGroup({
        variables: {
          input: {
            name: group.name,
            educationLevel: group.module.educationLevel,
            learningObjectiveGroupKey: group.module.learningObjectiveGroupKey,
            subjectCode: group.subject.code,
            students: allStudents.map((it) => ({ name: it })),
            teacherId: user.id, // TODO: Add correct teacher id
          },
        },
        refetchQueries: ["MainPage_GetCurrentUser"],
      });

      navigation.getParent()?.navigate("home");
    } catch (error) {
      const msg = getErrorMessage(error);
      console.error(msg);
      // TODO: Show error in UI
    }
    setLoading(false);
  };

  const removeStudent = (studentToRemove: string) => {
    const filteredStudents = group.students.filter((student) => student !== studentToRemove);
    setGroup({ ...group, students: filteredStudents });
  };

  const splitStudentString = (studentString: string) => {
    const students = studentString.split(/\r?\n/);
    const nonEmptyStudents = students.filter((name) => name.length > 0);
    return nonEmptyStudents;
  };

  const addStudents = (studentString: string) => {
    const nonEmptyStudents = splitStudentString(studentString);
    setGroup({ ...group, students: [...group.students, ...nonEmptyStudents] });
  };

  return (
    <GroupCreationBody navigation={navigation}>
      <CView style={{ flex: 1, justifyContent: "space-between" }}>
        <CTouchableWithoutFeedback preventChildEvents={false} style={{ height: "100%" }} onPress={Keyboard.dismiss}>
          <CView style={{ flex: 8, padding: 15, justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <CView style={{ flex: 1, gap: 20, width: "100%" }}>
              <CView style={{ flex: 6, gap: 10 }}>
                <CText style={{ fontSize: "title", fontWeight: "300" }}>{t("students", "Oppilaat")}</CText>
                <FlatList
                  inverted
                  scrollEnabled
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
                    <TextFormField
                      ref={inputRef}
                      placeholder={t("GroupStudentsSelectionView.newStudent", "Uusi oppilas")}
                      multiline
                      value={newStudent}
                      onChange={(text) => {
                        setNewStudent(text);
                      }}
                      blurOnSubmit={false}
                      onSubmitEditing={(_) => {
                        if (newStudent.length > 0) {
                          addStudents(newStudent);
                          setNewStudent("");
                        }
                      }}
                    />
                  </CView>
                  <CButton
                    style={{ flex: 1, position: "absolute", right: 0, height: 48, width: 48, paddingHorizontal: 0 }}
                    disabled={newStudent.length === 0}
                    onPress={() => {
                      if (newStudent.length > 0) addStudents(newStudent);
                      setNewStudent("");
                    }}
                  >
                    <MaterialCommunityIcon size={25} name="plus" color={COLORS.white} />
                  </CButton>
                </CView>
                <CText style={{ fontSize: "sm", fontWeight: "300" }}>
                  {t(
                    "add-multiple-students-info",
                    "Voit lisätä oppilaita listana kopioimalla tekstikenttään tekstin, jossa jokaisella rivillä on yhden oppilaan nimi."
                  )}
                </CText>
              </CView>
            </CView>
          </CView>
          <CView style={{ flex: 2, justifyContent: "flex-end" }}>
            {!isKeyboardVisible && (
              <CView
                style={{
                  flexGrow: 1,
                  width: "100%",
                  padding: "xl",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <CButton onPress={() => navigation.goBack()}>
                  <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
                </CButton>
                <CButton
                  loading={loading}
                  title={t("GroupStudentsSelectionView.createGroup", "Luo ryhmä")}
                  onPress={() => handleSubmit()}
                  leftIcon={<MaterialCommunityIcon name="check" size={25} color={COLORS.white} />}
                />
              </CView>
            )}
            <ProgressBar color={COLORS.primary} progress={3 / 3} />
          </CView>
        </CTouchableWithoutFeedback>
      </CView>
    </GroupCreationBody>
  );
}
