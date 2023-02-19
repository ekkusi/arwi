"use client";

import { Box, Button, NextLink, Text } from "@/components/chakra";
import FormField from "@/components/FormField";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useState } from "react";

const initialValues = {
  email: "",
  name: "",
  password: "",
  passwordConfirm: "",
};

export default function RegisterForm() {
  const [generalError, setGeneralError] = useState<string | undefined>();
  const validateString = (value: string) => {
    let error;
    if (value.length === 0) error = "Ei saa olla tyhjä";
    return error;
  };

  const validatePasswordConfirm = (
    password: string,
    passwordConfirm: string
  ) => {
    let error;
    if (password !== passwordConfirm) error = "Salasanat eivät täsmää";
    return error;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setGeneralError(undefined);
    const { passwordConfirm, ...data } = values;
    try {
      // Register teacher
      const result = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
        },
      });
      // If register was ok -> sign in
      if (result.ok) {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: "/welcome",
        });
        return;
      }
      // If not -> show error messages
      const json = await result.json();
      if (json.message) {
        setGeneralError(json.message);
        return;
      }
      throw new Error(); // Unknown error -> throw error to catch it below and show generic unexpected error message
    } catch (error) {
      console.error(error);
      setGeneralError(
        "Jotakin jännää tapahtui. Ota yhteyttä järjestelmän kehittäjiin pls."
      );
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      // validateOnChange={false}
      // validateOnBlur={false}
    >
      {({ values }) => (
        <Form>
          <Text as="h1" textAlign="center" mb="5">
            Rekisteröidy
          </Text>
          {generalError && (
            <Text color="error" mb="2">
              {generalError}
            </Text>
          )}
          <FormField
            name="email"
            label="Sähköposti"
            validate={validateString}
          />
          <FormField name="name" label="Nimi" validate={validateString} />
          <FormField
            name="password"
            label="Salasana"
            type="password"
            validate={validateString}
          />
          <FormField
            name="passwordConfirm"
            label="Salasana uudelleen"
            type="password"
            validate={(value) =>
              validatePasswordConfirm(values.password, value)
            }
          />
          <Button type="submit" marginTop="auto">
            Rekisteröidy
          </Button>
          <Box mt="2">
            <Text as="span" mr="1">
              Oletko jo käyttäjä?
            </Text>
            <NextLink href="/auth/login">Kirjaudu tästä</NextLink>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
