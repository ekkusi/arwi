"use client";

import { Button, Flex, Spinner, Text } from "@/components/chakra";
import FormField from "@/components/FormField";
import { graphql } from "@/gql";
import graphqlClient from "@/graphql-client";
import { BoxProps } from "@chakra-ui/react";
import { Form, Formik } from "formik";
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

export default function CreateClassForm({
  onClassCreated,
  ...rest
}: CreateClassFormProps) {
  const router = useRouter();
  const { data } = useSession();
  const validateName = (value: string) => {
    let error;
    if (value.length === 0) error = "Nimi ei saa olla tyhjä";
    return error;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!data?.user) {
      throw new Error("Cant find session");
    }
    try {
      await graphqlClient.request(CreateClassForm_CreateClassMutation, {
        name: values.name,
        teacherID: data.user.id,
      });
      router.push("/");
    } catch (error) {
      console.error("Error happened:", error);
    }
  };

  return data?.user ? (
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
  ) : (
    <Text>
      Loading... <Spinner />
    </Text>
  );
}
