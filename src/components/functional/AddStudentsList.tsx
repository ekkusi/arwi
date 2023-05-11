import {
  Box,
  Flex,
  IconButton,
  Input,
  Text,
  FlexProps,
} from "@chakra-ui/react";
import { CreateStudentInput } from "@/gql/graphql";
import {
  ChangeEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoMdAddCircle } from "react-icons/io";
import DeleteButton from "@/components/server-components/primitives/DeleteButton";

type AddStudentsListProps = FlexProps & {
  initialStudents?: CreateStudentInput[];
  onChanged?(students: CreateStudentInput[]): void;
};

export default function AddStudentsList({
  initialStudents,
  onChanged,
  ...rest
}: AddStudentsListProps) {
  const [students, setStudents] = useState<CreateStudentInput[]>(
    initialStudents || []
  );
  const [name, setName] = useState("");
  const [error, setError] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialStudents && students !== initialStudents) {
      setStudents(initialStudents);
    }
  }, [students, initialStudents]);

  const removeStudent = (index: number) => {
    // Copy old array -> remove by index from copy -> set copy as new state
    const studentsCopy = [...students];
    studentsCopy.splice(index, 1);
    setStudents(studentsCopy);
    if (onChanged) onChanged(studentsCopy);
  };

  const addStudent = () => {
    inputRef.current?.focus();
    if (name.length === 0) {
      setError("Oppilaan nimi ei voi olla tyhjä");
      return;
    }
    if (students.some((it) => it.name === name)) {
      setError("Kahdella oppilaalla ei voi olla sama nimi");
      return;
    }
    // Copy old array with the new element added
    const newStudents = [{ name }, ...students];
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
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb={students.length > 0 ? 4 : 0}
      >
        <Input
          mr="2"
          ref={inputRef}
          placeholder="Oppilaan nimi"
          value={name}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          isInvalid={!!error}
        />
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
    </Box>
  );
}
