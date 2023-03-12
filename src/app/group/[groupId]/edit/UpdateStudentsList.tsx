"use client";

import DeleteButton from "@/app/(server-components)/primitives/DeleteButton";
import { Box, Flex, Text } from "@/components/chakra";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import InputWithError from "@/components/general/InputWithError";
import { FragmentType, graphql, useFragment } from "@/gql";
import {
  CreateStudentInput,
  UpdateStudentsList_StudentFragment as StudentFragment,
} from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { FlexProps, useToast } from "@chakra-ui/react";
import { useState } from "react";

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

const UpdateStudentList_DeleteStudentMutation = graphql(`
  mutation UpdateStudentList_DeleteStudent($studentId: ID!) {
    deleteStudent(studentId: $studentId)
  }
`);

type UpdateStudentsListProps = FlexProps & {
  students: FragmentType<typeof UpdateStudentsList_StudentFragment>[];
  onChanged?(students: CreateStudentInput[]): void;
};

export default function UpdateStudentsList({
  onChanged,
  students: studentFragments,
  ...rest
}: UpdateStudentsListProps) {
  const toast = useToast();
  const initialStudents = useFragment(
    UpdateStudentsList_StudentFragment,
    studentFragments
  );
  const [studentInDelete, setStudentInDelete] = useState<
    StudentFragment | undefined
  >();
  const [students, setStudents] = useState<StudentFragment[]>(() => [
    ...initialStudents,
  ]);

  const deleteSelectedStudent = async () => {
    if (!studentInDelete) return;
    // Copy old array -> remove by index from copy -> set copy as new state
    const studentId = studentInDelete.id;
    const index = students.findIndex((it) => it.id === studentInDelete.id);
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
    if (onChanged) onChanged(newStudents);
    setStudentInDelete(undefined); // Close modal already before running backend delete
    await graphqlClient.request(UpdateStudentList_DeleteStudentMutation, {
      studentId,
    });
  };

  const handleStudentNameChange = async (
    student: StudentFragment,
    name: string
  ) => {
    const newStudents = students.map((it) => {
      if (it.id === student.id) {
        return { ...it, name };
      }
      return it;
    });
    setStudents(newStudents);
    if (onChanged) onChanged(newStudents);
    await graphqlClient.request(UpdateStudentList_UpdateStudentMutation, {
      input: { name },
      studentId: student.id,
    });

    toast({
      title: "Oppilaan nimi päivitetty.",
      description: `Oppilaan '${student.name}' nimi päivitetty onnistuneesti nimeen '${student.name}'`,
      status: "success",
      isClosable: true,
    });
  };

  const validateName = (value: string) => {
    if (value.length <= 0) {
      return "Nimi ei voi olla tyhjä";
    }
    return undefined;
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
            onChange={(e, isValid) =>
              isValid && handleStudentNameChange(it, e.target.value)
            }
          />
          <DeleteButton
            onClick={() => setStudentInDelete(it)}
            mr="6px"
            aria-label="Poista oppilas"
          />
        </Flex>
      ))}
      <ConfirmationModal
        isOpen={!!studentInDelete}
        onClose={() => setStudentInDelete(undefined)}
        onAccept={() => deleteSelectedStudent()}
      >
        <Text>
          Oletko varma, että haluat poistaa oppilaan {studentInDelete?.name}?
          Hänen kaikki tietonsa, mukaan lukien arvioinnit, poistuvat samalla.
        </Text>
      </ConfirmationModal>
    </Box>
  );
}
