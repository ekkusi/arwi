import { Box, Button, Text } from "@chakra-ui/react";
import FormField from "@/components/general/FormField";
import { graphql } from "@/gql";
import graphqlClient from "@/graphql-client";
import { getErrorMessage } from "@/utils/errorUtils";
import { Form, Formik } from "formik";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import PageWrapper from "@/components/server-components/PageWrapper";
import NoPrefetchLink from "@/components/general/NoPrefetchLink";

const initialValues = {
  email: "",
  password: "",
  passwordConfirm: "",
};

const RegisterPage_Register_Mutation = graphql(`
  mutation RegisterPage_Register($input: CreateTeacherInput!) {
    register(data: $input) {
      id
      email
    }
  }
`);

export default function RegisterPage() {
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // TODO: Validate email to be email
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
    setLoading(true);
    const { passwordConfirm: _, ...data } = values;
    try {
      // Register teacher
      await graphqlClient.request(RegisterPage_Register_Mutation, {
        input: data,
      });
      // If register was ok -> sign in
      try {
        const response = await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: "/welcome",
          redirect: false,
        });
        if (response && response.status !== 200) {
          console.warn(response);
          setGeneralError(response.error);
          return;
        }
        const session = await getSession();
        if (!session) throw new Error("Unexpected error"); // Session should be available
        router.push(`/welcome`);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
      return;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      setLoading(false);

      setGeneralError(errorMessage);
    }
  };
  return (
    <PageWrapper>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
              // Set to empty func to disable default submitting prevention
              inputProps={{
                onKeyDown: () => {},
              }}
            />
            <FormField
              name="password"
              label="Salasana"
              type="password"
              validate={validateString}
              inputProps={{
                onKeyDown: () => {},
              }}
            />
            <FormField
              name="passwordConfirm"
              label="Salasana uudelleen"
              type="password"
              validate={(value) =>
                validatePasswordConfirm(values.password, value)
              }
              inputProps={{
                onKeyDown: () => {},
              }}
            />
            <Button type="submit" marginTop="auto" isLoading={loading}>
              Rekisteröidy
            </Button>
            <Box mt="2">
              <Text as="span" mr="1">
                Oletko jo käyttäjä?
              </Text>
              <Text as={NoPrefetchLink} href="/login">
                Kirjaudu tästä
              </Text>
            </Box>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
}
