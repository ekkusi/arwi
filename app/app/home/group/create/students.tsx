import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Keyboard, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextFormField from "../../../../components/form/TextFormField";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CView from "../../../../components/primitives/CView";
import { graphql } from "../../../../gql";
import { getErrorMessage } from "../../../../helpers/errorUtils";
import { useAuthenticatedUser } from "../../../../hooks-and-providers/AuthProvider";
import { useIsKeyboardVisible, useKeyboardListener } from "../../../../hooks-and-providers/keyboard";
import { COLORS } from "../../../../theme";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import GroupCreationBody from "./_body";
import CTouchableWithoutFeedback from "../../../../components/primitives/CTouchableWithoutFeedback";
import CKeyboardAwareScrollView from "../../../../components/primitives/CKeyboardAwareScrollView";
import CKeyboardAvoidingView from "../../../../components/primitives/CKeyboardAvoidingView";
import CScrollView from "../../../../components/primitives/CScrollView";

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
    // onStartShouldSetResponder={() => true}
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
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const user = useAuthenticatedUser();
  const dimensions = useWindowDimensions();
  const inputRef = useRef<TextInput>(null);

  const [createGroup] = useMutation(CreateGroupPage_CreateGroup_Mutation);

  const { group, setGroup } = useGroupCreationContext();

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
            collectionTypes: group.collectionTypes,
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

  const scrollToInput = (studentCount: number) => {
    console.log("scrollToInput");

    // TODO: FIX THIS
    // if (inputRef.current) scrollRef.current?.scrollToFocusedInput(inputRef.current, -50);
  };

  const addStudents = (studentString: string) => {
    const nonEmptyStudents = splitStudentString(studentString);
    const newStudentList = [...group.students, ...nonEmptyStudents];
    // Refocus the scroll view to the input
    scrollToInput(newStudentList.length);
    setGroup({ ...group, students: newStudentList });
  };

  return (
    <GroupCreationBody
      navigation={navigation}
      progressState={5}
      onMoveForward={handleSubmit}
      forwardButtonProps={{
        loading,
        title: t("GroupStudentsSelectionView.createGroup", "Luo ryhmä"),
        leftIcon: <MaterialCommunityIcon name="check" size={25} color={COLORS.white} />,
      }}
      // closeKeyBoardOnTap={false}
      style={{ gap: 20, padding: "lg" }}
    >
      <CKeyboardAwareScrollView ref={scrollRef} extraScrollHeight={130} keyboardShouldPersistTaps="handled">
        <CView style={{ gap: 10, minHeight: dimensions.height * 0.43 }}>
          <CText style={{ fontSize: "title", fontWeight: "300" }}>{t("students", "Oppilaat")}</CText>
          <CView style={{ flex: 1, marginBottom: "xl" }}>
            {[...group.students].reverse().map((student) => renderStudentItem(student, removeStudent))}
          </CView>
        </CView>
        <CView style={{ width: "100%", flex: 1 }}>
          <CView style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
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
            <CButton
              style={{ flex: 1, position: "absolute", right: 0, minHeight: 40, width: 40, paddingHorizontal: 0, bottom: "sm" }}
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
      </CKeyboardAwareScrollView>
    </GroupCreationBody>
  );
}
