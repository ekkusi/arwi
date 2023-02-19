"use client";

import { Box, Button, NextLink, Text } from "@/components/chakra";
import FormField from "@/components/FormField";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";

const initialValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const validateString = (value: string) => {
    let error;
    if (value.length === 0) error = "Ei saa olla tyhjä";
    return error;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await signIn("credentials", {
        ...values,
        callbackUrl: "/",
      });
      if (response) {
        console.warn(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Text as="h1" textAlign="center" mb="5">
            Kirjaudu sisään
          </Text>
          <FormField
            name="email"
            label="Sähköposti"
            validate={validateString}
          />
          <FormField
            name="password"
            label="Salasana"
            type="password"
            validate={validateString}
          />
          <Button type="submit" marginTop="auto">
            Kirjaudu sisään
          </Button>
          <Box mt="2">
            <Text as="span" mr="1">
              Ei vielä käyttäjää?
            </Text>
            <NextLink href="/auth/register">Rekisteröidy tästä</NextLink>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
