import { Button, Text, FormLabel } from "@chakra-ui/react";
import FormField from "@/components/general/FormField";
import { graphql } from "@/gql";
import { CreateStudentInput } from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { getSessionClient } from "@/utils/session/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import PageWrapper from "@/components/server-components/PageWrapper";
import Card from "@/components/server-components/primitives/Card";
import Link from "next/link";
import AddStudentsList from "@/components/functional/AddStudentsList";

const initialValues = {
  name: "",
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
  const validateName = (value: string) => {
    let error;
    if (value.length === 0) error = "Nimi ei saa olla tyhjä";
    return error;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const session = await getSessionClient();
    setLoading(true);
    try {
      await graphqlClient.request(CreateGroupPage_CreateGroup_Mutation, {
        input: {
          ...values,
          subjectCode: "LI", // TODO: Make this dynamic
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
              validate={validateName}
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
