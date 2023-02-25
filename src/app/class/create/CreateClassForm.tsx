"use client";

import { Button, Flex, Spinner, Text } from "@/components/chakra";
import FormField from "@/components/FormField";
import { graphql } from "@/gql";
import graphqlClient from "@/graphql-client";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function CreateClassForm() {
  const router = useRouter();
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const validateName = (value: string) => {
    let error;
    if (value.length === 0) error = "Nimi ei saa olla tyhjä";
    return error;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!data?.user) {
      throw new Error("Cant find session");
    }

    setLoading(true);

    try {
      await graphqlClient.request(CreateClassForm_CreateClassMutation, {
        input: {
          ...values,
          teacherId: data.user.id,
        },
      });
      setLoading(false);
      router.push("/");
    } catch (error) {
      setLoading(false);
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
          <Button type="submit" marginTop="auto" isLoading={loading}>
            Luo luokka
          </Button>
          <Text my="5">Tää alla on mun oma testi, älkää ihmetelkö</Text>
        </Flex>
      )}
    </Formik>
  ) : (
    <Text>
      Loading... <Spinner />
    </Text>
  );
}
