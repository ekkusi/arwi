"use client";

import { Box, Button, NextLink, Text } from "@/components/chakra";
import FormField from "@/components/FormField";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

// TODO: Restore password or some other action, if credentials are forgotten
export default function LoginForm() {
  const router = useRouter();
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const validateString = (value: string) => {
    let error;
    if (value.length === 0) error = "Ei saa olla tyhjä";
    return error;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        ...values,
        callbackUrl: "/",
        redirect: false,
      });
      setLoading(false);
      if (response && response.status === 401) {
        setGeneralError("Väärä salasana tai käyttäjätunnus");
      } else {
        router.push("/");
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
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
          {generalError && (
            <Text color="error" mb="4" mt="-3">
              {generalError}
            </Text>
          )}
          <Button type="submit" marginTop="auto" isLoading={loading}>
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
