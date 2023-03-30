import DeleteButton from "@/components/server-components/primitives/DeleteButton";
import {
  Box,
  Flex,
  Text,
  IconButton,
  FlexProps,
  useToast,
} from "@chakra-ui/react";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import InputWithError, {
  InputWithErrorHandlers,
} from "@/components/general/InputWithError";
import { FragmentType, graphql, getFragmentData } from "@/gql";
import { UpdateStudentsList_StudentFragment as StudentFragment } from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import {
  ChangeEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoMdAddCircle } from "react-icons/io";

const UpdateStudentsList_StudentFragment = graphql(`
  fragment UpdateStudentsList_Student on Student {
    id
    name
  }
`);

const UpdateStudentList_UpdateStudentMutation = graphql(`
  mutation UpdateStudentList_UpdateStudent(
    $input: UpdateStudentInput!
    $studentId: ID!
  ) {
    updateStudent(data: $input, studentId: $studentId) {
      id
    }
  }
`);

const UpdateStudentList_CreateStudentMutation = graphql(`
  mutation UpdateStudentList_CreateStudent(
    $input: CreateStudentInput!
    $groupId: ID!
  ) {
    createStudent(data: $input, groupId: $groupId) {
      ...UpdateStudentsList_Student
    }
  }
`);

const UpdateStudentList_DeleteStudentMutation = graphql(`
  mutation UpdateStudentList_DeleteStudent($studentId: ID!) {
    deleteStudent(studentId: $studentId)
  }
`);

type UpdateStudentsListProps = FlexProps & {
  students: FragmentType<typeof UpdateStudentsList_StudentFragment>[];
  groupId: string;
};

export default function UpdateStudentsList({
  groupId,
  students: studentFragments,
  ...rest
}: UpdateStudentsListProps) {
  const toast = useToast();
  const nameInputRef = useRef<InputWithErrorHandlers>(null);
  const initialStudents = getFragmentData(
    UpdateStudentsList_StudentFragment,
    studentFragments
  );
  const [studentInDelete, setStudentInDelete] = useState<
    StudentFragment | undefined
  >();
  const sortStudents = (students: StudentFragment[]) => {
    return students.sort((a, b) => a.name.localeCompare(b.name));
  };

  const [students, setStudents] = useState<StudentFragment[]>(() => {
    return sortStudents([...initialStudents]);
  });
  const [newStudentName, setNewStudentName] = useState("");
  const [addingStudent, setAddingStudent] = useState(false);

  useEffect(() => {
    setStudents(sortStudents([...initialStudents]));
  }, [initialStudents]);

  const deleteSelectedStudent = async () => {
    if (!studentInDelete) return;
    // Copy old array -> remove by index from copy -> set copy as new state
    const studentId = studentInDelete.id;
    const index = students.findIndex((it) => it.id === studentInDelete.id);
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
    setStudentInDelete(undefined); // Close modal already before running backend delete
    await graphqlClient.request(UpdateStudentList_DeleteStudentMutation, {
      studentId,
    });
  };

  const addStudent = async () => {
    // Copy old array with the new element added
    setAddingStudent(true);
    const { createStudent: newStudentFragment } = await graphqlClient.request(
      UpdateStudentList_CreateStudentMutation,
      {
        groupId,
        input: { name: newStudentName },
      }
    );
    const newStudent = getFragmentData(
      UpdateStudentsList_StudentFragment,
      newStudentFragment
    );
    const newStudents = [...students, newStudent];
    setStudents(newStudents);
    setNewStudentName("");
    nameInputRef.current?.clear();
    setAddingStudent(false);
  };

  const handleStudentNameChange = async (
    student: StudentFragment,
    name: string
  ) => {
    if (name === student.name) return;
    await graphqlClient.request(UpdateStudentList_UpdateStudentMutation, {
      input: { name },
      studentId: student.id,
    });

    toast({
      title: "Oppilaan nimi päivitetty.",
      description: `Oppilaan '${student.name}' nimi päivitetty nimeen '${name}'`,
      status: "success",
      isClosable: true,
      position: "top",
    });
  };

  const validateName = (value: string) => {
    if (value.length <= 0) {
      return "Nimi ei voi olla tyhjä";
    }
    if (students.some((it) => it.name === value)) {
      return "Kahdella oppilaalla ei voi olla sama nimi";
    }
    return undefined;
  };

  const validateNewStudentName = (value: string) => {
    if (students.some((it) => it.name === value)) {
      return "Kahdella oppilaalla ei voi olla sama nimi";
    }
    return undefined;
  };

  const handleNewStudentNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStudentName(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStudent();
    }
  };

  return (
    <Box {...rest}>
      {students.map((it) => (
        <Flex
          key={it.id}
          alignItems="center"
          justifyContent="space-between"
          mb="2"
        >
          <InputWithError
            type="text"
            value={it.name}
            validate={validateName}
            onBlur={(e, isValid) =>
              isValid && handleStudentNameChange(it, e.target.value)
            }
          />
          <DeleteButton
            onClick={() => setStudentInDelete(it)}
            mr="2"
            aria-label="Poista oppilas"
          />
        </Flex>
      ))}
      <Flex justifyContent="space-between" mb="2" mt="5">
        <InputWithError
          ref={nameInputRef}
          mr="2"
          placeholder="Uuden oppilaan nimi"
          value={newStudentName}
          isDisabled={addingStudent}
          debounced={false}
          validate={validateNewStudentName}
          onChange={handleNewStudentNameChange}
          onKeyDown={handleKeyDown}
        />
        {/* <Button onClick={addStudent}>Lisää</Button> */}
        <IconButton
          onClick={addStudent}
          colorScheme="green"
          variant="ghost"
          isLoading={addingStudent}
          isDisabled={newStudentName.length <= 0}
          aria-label="Lisää oppilas"
          size="lg"
          mr="1"
          mt="1"
          icon={<IoMdAddCircle />}
        />
      </Flex>
      <ConfirmationModal
        isOpen={!!studentInDelete}
        onClose={() => setStudentInDelete(undefined)}
        onAccept={() => deleteSelectedStudent()}
      >
        <Text>
          Oletko varma, että haluat poistaa oppilaan{" "}
          <Text as="span" fontStyle="italic">
            {studentInDelete?.name}
          </Text>
          ? Hänen kaikki tietonsa, mukaan lukien arvioinnit, poistuvat samalla.
        </Text>
      </ConfirmationModal>
    </Box>
  );
}
