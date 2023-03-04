"use client";

import BorderedCard from "@/app/(server-components)/primitives/BorderedCard";
import { Button, Text } from "@/components/chakra";
import FormField from "@/components/FormField";
import LinkToHome from "@/components/LinkToHome";
import { graphql } from "@/gql";
import { CreateStudentInput } from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { getSessionClient } from "@/utils/session/client";
import { BoxProps } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddStudentsList from "./AddStudentsList";

type CreateClassFormProps = BoxProps & {};

const initialValues = {
  name: "",
};

const CreateClassForm_CreateClassMutation = graphql(`
  mutation CreateClassForm_CreateClass($input: CreateClassInput!) {
    createClass(data: $input) {
      id
      name
    }
  }
`);

export default function CreateClassForm({ ...rest }: CreateClassFormProps) {
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
      await graphqlClient.request(CreateClassForm_CreateClassMutation, {
        input: {
          ...values,
          students,
          teacherId: session.user.id,
        },
      });
      setLoading(false);
      router.push(`/${session.user.id}`);
    } catch (error) {
      setLoading(false);
      console.error("Error happened:", error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <BorderedCard as={Form} display="flex" flexDirection="column" {...rest}>
          <Text as="h1" textAlign="center">
            Uusi arviointi
          </Text>
          <FormField name="name" label="Luokan nimi" validate={validateName} />
          <Text as="h2">Oppilaat</Text>
          <AddStudentsList
            onChanged={(newStudents) => setStudents(newStudents)}
          />
          <Button type="submit" marginTop="auto" isLoading={loading}>
            Luo luokka
          </Button>
          <LinkToHome
            color="gray.700"
            mt="3"
            textTransform="uppercase"
            textAlign="center"
          >
            Peruuta
          </LinkToHome>
        </BorderedCard>
      )}
    </Formik>
  );
}
