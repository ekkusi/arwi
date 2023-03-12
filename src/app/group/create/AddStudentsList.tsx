import DeleteButton from "@/app/(server-components)/primitives/DeleteButton";
import { Box, Flex, IconButton, Input, Text } from "@/components/chakra";
import { CreateStudentInput } from "@/gql/graphql";
import { FlexProps } from "@chakra-ui/react";
import { ChangeEvent, KeyboardEventHandler, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

type AddStudentsListProps = FlexProps & {
  onChanged?(students: CreateStudentInput[]): void;
};

export default function AddStudentsList({
  onChanged,
  ...rest
}: AddStudentsListProps) {
  const [students, setStudents] = useState<CreateStudentInput[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | undefined>();

  const removeStudent = (index: number) => {
    // Copy old array -> remove by index from copy -> set copy as new state
    const studentsCopy = [...students];
    studentsCopy.splice(index, 1);
    setStudents(studentsCopy);
    if (onChanged) onChanged(studentsCopy);
  };

  const addStudent = () => {
    if (name.length === 0) {
      setError("Oppilaan nimi ei voi olla tyhjä");
      return;
    }
    if (students.some((it) => it.name === name)) {
      setError("Kahdella oppilaalla ei voi olla sama nimi");
      return;
    }
    // Copy old array with the new element added
    const newStudents = [...students, { name }];
    setStudents(newStudents);
    setName("");
    if (onChanged) onChanged(newStudents);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(undefined);
    setName(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStudent();
    }
  };

  return (
    <Box {...rest}>
      {students.map((it, index) => (
        <Flex
          key={`${it.name}-${index}`}
          alignItems="center"
          justifyContent="space-between"
          mb="2"
        >
          <Text>{it.name}</Text>
          <DeleteButton
            onClick={() => removeStudent(index)}
            mr="6px"
            aria-label="Poista oppilas"
          />
        </Flex>
      ))}
      <Flex alignItems="center" justifyContent="space-between" mb="2">
        <Input
          mr="2"
          placeholder="Oppilaan nimi"
          value={name}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
        />
        {/* <Button onClick={addStudent}>Lisää</Button> */}
        <IconButton
          onClick={addStudent}
          colorScheme="green"
          variant="ghost"
          aria-label="Lisää oppilas"
          size="lg"
          icon={<IoMdAddCircle />}
        />
      </Flex>
      {error && <Text color="error">{error}</Text>}
    </Box>
  );
}
