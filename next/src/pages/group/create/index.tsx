import { Button, Text, FormLabel, Textarea, Flex, Box } from "@chakra-ui/react";
import FormField from "@/components/general/FormField";
import { graphql } from "@/gql";
import { ClassYearCode, CreateStudentInput } from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { getSessionClient } from "@/utils/session/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import PageWrapper from "@/components/server-components/PageWrapper";
import Card from "@/components/server-components/primitives/Card";
import Link from "next/link";
import AddStudentsList from "@/components/functional/AddStudentsList";
import SubjectSelect from "@/components/functional/SubjectSelect";
import ClassYearSelect from "@/components/functional/ClassYearSelect";
import { isSingleOption } from "@/components/general/Select";
import ConfirmationModal from "@/components/general/ConfirmationModal";

const initialValues: {
  name: string;
  subjectCode: string;
  yearCode: ClassYearCode | null;
} = {
  name: "",
  subjectCode: "LI",
  yearCode: null,
};

const CreateGroupPage_CreateGroup_Mutation = graphql(`
  mutation CreateGroupPage_CreateGroup($input: CreateGroupInput!) {
    createGroup(data: $input) {
      id
      name
    }
  }
`);

export default function CreateGroupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<CreateStudentInput[]>([]);
  const [isImportStudentsModalOpen, setIsImportStudentsModalOpen] =
    useState(false);
  const [studentsListText, setStudentsListText] = useState("");

  const handleSubmit = async (values: typeof initialValues) => {
    const { yearCode, ...rest } = values;
    if (!yearCode) throw new Error("Unexpected error"); // Shouldn't ever be thrown because nulls are checked during validation

    const session = await getSessionClient();
    setLoading(true);
    try {
      await graphqlClient.request(CreateGroupPage_CreateGroup_Mutation, {
        input: {
          ...rest,
          yearCode,
          subjectCode: values.subjectCode,
          students,
          teacherId: session.user.id,
        },
      });
      setLoading(false);
      router.push(`/`);
    } catch (error) {
      setLoading(false);
      console.error("Error happened:", error);
    }
  };

  const addStudentsList = () => {
    const studentNames = studentsListText
      .split(/\r?\n/)
      .filter((it) => it.length > 0);
    setStudents(studentNames.map((it) => ({ name: it })));

    setStudentsListText("");
    setIsImportStudentsModalOpen(false);
  };

  return (
    <PageWrapper display="flex" flexDirection="column">
      <ConfirmationModal
        isOpen={isImportStudentsModalOpen}
        onAccept={addStudentsList}
        onClose={() => setIsImportStudentsModalOpen(false)}
        headerLabel="Tuo oppilaita listana"
        acceptLabel="Lisää"
        variant="regular"
      >
        <Text mb="3">
          Lisää useita oppilaita kerralla erottelemalla nimet riveittäin.
          Jokaisesta rivistä tulee uusi oppilas.
        </Text>
        <Box position="relative">
          <Textarea
            onChange={(event) => setStudentsListText(event.target.value)}
          />
          {/* This is a hack to get a "placeholder" with line breaks */}
          <Text
            visibility={studentsListText.length === 0 ? "visible" : "hidden"}
            position="absolute"
            top="9px"
            left="16px"
            color="gray.500"
          >
            Eetu E<br />
            Pinja P<br />
            Joona J
          </Text>
        </Box>
      </ConfirmationModal>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Card as={Form} display="flex" flexDirection="column" flex="1">
            <Text as="h1" textAlign="center">
              Uusi ryhmä
            </Text>
            <FormField
              name="name"
              label="Ryhmän nimi"
              placeholder="Ryhmän nimi"
              validate={(value) =>
                value.length === 0 ? "Nimi ei saa olla tyhjä" : ""
              }
            />
            <FormField
              label="Vuosiluokka"
              name="yearCode"
              validate={(value) =>
                !value ? "Vuosiluokka pitää olla valittu" : ""
              }
              render={({
                field: { name },
                form: { setFieldValue, setFieldTouched },
              }) => (
                <ClassYearSelect
                  onChange={(newValue) => {
                    setFieldTouched(name, true);
                    setFieldValue(
                      name,
                      isSingleOption(newValue) ? newValue.code : null
                    );
                  }}
                />
              )}
            />
            <FormField
              label="Aine"
              name="subjectCode"
              validate={(value) => (!value ? "Aine pitää olla valittu" : "")}
              render={({
                field: { name },
                form: { setFieldValue, setFieldTouched },
              }) => (
                <SubjectSelect
                  initialSubjectCode={initialValues.subjectCode}
                  onChange={(newValue) => {
                    setFieldTouched(name, true);
                    setFieldValue(
                      name,
                      isSingleOption(newValue) ? newValue.code : null
                    );
                  }}
                />
              )}
            />
            <Flex justifyContent="space-between" alignItems="center">
              <FormLabel>Oppilaat</FormLabel>
              <Button
                variant="link"
                onClick={() => setIsImportStudentsModalOpen(true)}
              >
                Tuo listana
              </Button>
            </Flex>
            <AddStudentsList
              initialStudents={students}
              onChanged={(newStudents) => setStudents(newStudents)}
              mb="5"
            />
            <Button type="submit" marginTop="auto" isLoading={loading}>
              Luo ryhmä
            </Button>
            <Text
              as={Link}
              href="/"
              color="gray.700"
              mt="3"
              textTransform="uppercase"
              textAlign="center"
            >
              Peruuta
            </Text>
          </Card>
        )}
      </Formik>
    </PageWrapper>
  );
}
