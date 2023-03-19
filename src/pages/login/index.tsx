import PageWrapper from "@/components/server-components/PageWrapper";

import { Box, Button, Text } from "@chakra-ui/react";
import FormField from "@/components/general/FormField";
import { Form, Formik } from "formik";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

// TODO: Restore password or some other action, if credentials are forgotten
export default function LoginPage() {
  const router = useRouter();
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const validateString = (value: string) => {
    let error;
    if (value.length === 0) error = "Ei saa olla tyhjä";
    return error;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setGeneralError(undefined);
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
        return;
      }
      const session = await getSession();
      if (!session) throw new Error("Unexpected error"); // Session should be available
      router.push(`/`);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  return (
    <PageWrapper>
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
              <Link href="/register">Rekisteröidy tästä</Link>
            </Box>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
}
