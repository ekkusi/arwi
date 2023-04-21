import { Button, Text, FormLabel } from "@chakra-ui/react";
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

  return (
    <PageWrapper display="flex" flexDirection="column">
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
                    setFieldValue(name, newValue?.code || null);
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
                    setFieldValue(name, newValue?.code || null);
                  }}
                />
              )}
            />
            <FormLabel>Oppilaat</FormLabel>
            <AddStudentsList
              onChanged={(newStudents) => setStudents(newStudents)}
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
