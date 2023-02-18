"use client";

import {
  Box,
  Button,
  Flex,
  Input,
  List,
  ListItem,
  Text,
} from "@/components/chakra";
import FormField from "@/components/FormField";
import { graphql } from "@/gql";
import graphqlClient from "@/graphql-client";
import { BoxProps, Heading } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { GraphQLError } from "graphql";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type CreateClassFormProps = BoxProps & {
  onClassCreated?: (createdClass: string) => void;
};

const initialValues = {
  name: "",
};

const CreateClassForm_CreateClassMutation = graphql(`
  mutation CreateClass($name: String!, $teacherID: ID!) {
    classCreate(input: { name: $name, teacher: { link: $teacherID } }) {
      class {
        id
        name
      }
    }
  }
`);

const CreateClassForm_Query = graphql(`
  query CreateClassFormQuery($teacherEmail: Email!) {
    teacher(by: { email: $teacherEmail }) {
      email
      name
      passwordHash
      class(first: 10) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`);

export default function CreateClassForm({
  onClassCreated,
  ...rest
}: CreateClassFormProps) {
  const router = useRouter();
  const session = useSession();
  console.log(session);

  console.log(process.env.NEXT_PUBLIC_GRAFBASE_API_URL);
  const validateName = (value: string) => {
    let error;
    if (value.length === 0) error = "Nimi ei saa olla tyhjä";
    return error;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Submitting form with data: ", values);
    try {
      const { classCreate } = await graphqlClient.request(
        CreateClassForm_CreateClassMutation,
        {
          name: values.name,
          teacherID: "someID",
        }
      );
      router.push("/");
    } catch (error) {
      console.log("Error happened:", error);
    }
  };

  return (
    <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
      {() => (
        <Flex as={Form} flex="1" flexDirection="column" bg="white" {...rest}>
          <Text as="h1" textAlign="center">
            Uusi luokka
          </Text>
          <FormField name="name" label="Luokan nimi" validate={validateName} />
          <Button type="submit" marginTop="auto">
            Luo luokka
          </Button>
        </Flex>
      )}
    </Formik>
  );
}
